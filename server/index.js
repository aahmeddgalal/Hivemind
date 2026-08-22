import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';
import cors from 'cors';
import jwt from 'jsonwebtoken';
import stateManager from './stateManager.js';
import engine from './engine.js';

const app = express();
app.use(cors());
app.use(express.json()); // Built-in body parser for JSON POST requests

const httpServer = createServer(app);

const io = new Server(httpServer, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"]
  }
});

const JWT_SECRET = 'hivemind-secret-key-do-not-expose'; // In prod, use environment variable

// 1. Admin Authentication Endpoint
app.post('/api/admin/login', (req, res) => {
  const { code } = req.body;
  if (code === 'admin') { // Simulated password check
    const token = jwt.sign({ role: 'admin' }, JWT_SECRET, { expiresIn: '1h' });
    return res.json({ token });
  }
  return res.status(401).json({ error: 'Unauthorized' });
});

// Middleware to protect admin routes
const requireAdmin = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) return res.status(401).json({ error: 'Missing token' });
  
  const token = authHeader.split(' ')[1];
  try {
    jwt.verify(token, JWT_SECRET);
    next();
  } catch (err) {
    res.status(401).json({ error: 'Invalid token' });
  }
};

// Example Protected Route
app.get('/api/admin/metrics', requireAdmin, (req, res) => {
  const activeCount = stateManager.getAllUsers().length;
  res.json({ activeUsers: activeCount, status: 'NOMINAL' });
});

// Input Validation & Sanitization
const sanitizeState = (rawState) => {
  if (!rawState || typeof rawState !== 'object') return {};
  
  // Only pick expected fields and enforce string lengths to prevent bloat
  const cleanState = {};
  const allowedKeys = ['activity', 'emotion', 'context', 'thought', 'environment'];
  
  for (const key of allowedKeys) {
    if (typeof rawState[key] === 'string') {
      cleanState[key] = rawState[key].substring(0, 200).trim(); // Truncate to 200 chars max
    }
  }
  return cleanState;
};

io.on('connection', (socket) => {
  console.log(`[SYS] Connection established: ${socket.id}`);
  
  // Notify others (anonymized)
  socket.broadcast.emit('USER_CONNECTED', { subjectId: socket.id.substring(0, 8) });

  socket.on('STATE_UPDATED', (newState) => {
    // Privacy/Security: Rate limit state updates
    if (stateManager.isRateLimited(socket.id)) {
      socket.emit('ERROR', { message: 'Rate limit exceeded. Please wait.' });
      return;
    }

    // Privacy/Security: Input Validation
    const cleanState = sanitizeState(newState);
    if (Object.keys(cleanState).length === 0) return;

    stateManager.updateUserState(socket.id, cleanState);
    console.log(`[SYS] State updated for ${socket.id}`);

    // Trigger matching engine
    const allUsers = stateManager.getAllUsers();
    const matches = engine.findMatchesForUser(socket.id, allUsers);

    if (matches.length > 0) {
      socket.emit('SYNCHRONIZATION_DETECTED', matches);
      
      matches.forEach(match => {
        const targetUser = allUsers.find(u => u.id.startsWith(match.subjectId));
        if (targetUser) {
           io.to(targetUser.id).emit('SYNCHRONIZATION_DETECTED', [{
             subjectId: socket.id.substring(0, 8),
             syncScore: match.syncScore,
             state: {
               activity: cleanState.activity,
               emotion: cleanState.emotion,
               context: cleanState.context
               // thought intentionally omitted for privacy
             }
           }]);
        }
      });
    }
  });

  // Privacy/Security: Data Deletion
  socket.on('PURGE_DATA', () => {
    stateManager.removeUser(socket.id);
    socket.emit('PURGE_COMPLETE');
  });

  socket.on('OPT_OUT', () => {
    stateManager.removeUser(socket.id);
    socket.disconnect();
  });

  socket.on('disconnect', () => {
    console.log(`[SYS] Connection lost: ${socket.id}`);
    stateManager.removeUser(socket.id);
    io.emit('USER_DISCONNECTED', { subjectId: socket.id.substring(0, 8) });
  });
});

const PORT = 3001;
httpServer.listen(PORT, () => {
  console.log(`HIVEMIND Observatory Backend running on port ${PORT}`);
});

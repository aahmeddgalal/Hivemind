const activeUsers = new Map();
const rateLimits = new Map();

const addUser = (socketId, state) => {
  activeUsers.set(socketId, {
    id: socketId,
    state,
    connectedAt: Date.now()
  });
};

const removeUser = (socketId) => {
  activeUsers.delete(socketId);
  rateLimits.delete(socketId);
};

const getUser = (socketId) => {
  return activeUsers.get(socketId);
};

const getAllUsers = () => {
  return Array.from(activeUsers.values());
};

const updateUserState = (socketId, newState) => {
  const user = activeUsers.get(socketId);
  if (user) {
    user.state = { ...user.state, ...newState };
    activeUsers.set(socketId, user);
  } else {
    addUser(socketId, newState);
  }
};

const isRateLimited = (socketId) => {
  const now = Date.now();
  const lastUpdate = rateLimits.get(socketId) || 0;
  if (now - lastUpdate < 1000) { // 1 state update per second max
    return true;
  }
  rateLimits.set(socketId, now);
  return false;
};

export default {
  addUser,
  removeUser,
  getUser,
  getAllUsers,
  updateUserState,
  isRateLimited
};

import { create } from 'zustand';
import { io } from 'socket.io-client';

const socket = io('http://localhost:3001', {
  autoConnect: false // Connect manually when needed
});

export const useStore = create((set, get) => ({
  // Legacy mock properties
  userIdentity: 'SUBJECT #40921',
  syncHistory: [],
  currentState: null,
  setCurrentState: (state) => {
    set({ currentState: state });
    if (get().socketConnected) {
      socket.emit('STATE_UPDATED', state);
    }
  },
  addSyncEvent: (event) => set((state) => ({ syncHistory: [...state.syncHistory, event] })),
  clearData: () => set({ syncHistory: [], currentState: null }),

  // Real-time properties
  socketConnected: false,
  networkEvents: [],
  realMatches: [],

  connectToHivemind: () => {
    if (!socket.connected) {
      socket.connect();
    }
  },

  disconnectFromHivemind: () => {
    if (socket.connected) {
      socket.disconnect();
    }
  }
}));

// Setup Socket listeners outside to update the store
socket.on('connect', () => {
  useStore.setState({ socketConnected: true });
});

socket.on('disconnect', () => {
  useStore.setState({ socketConnected: false });
});

socket.on('USER_CONNECTED', (data) => {
  const current = useStore.getState().networkEvents;
  useStore.setState({ 
    networkEvents: [{ id: Date.now(), msg: `SUBJECT #${data.subjectId} JOINED THE NETWORK` }, ...current].slice(0, 5) 
  });
});

socket.on('USER_DISCONNECTED', (data) => {
  const current = useStore.getState().networkEvents;
  useStore.setState({ 
    networkEvents: [{ id: Date.now(), msg: `SUBJECT #${data.subjectId} SIGNAL LOST` }, ...current].slice(0, 5) 
  });
});

socket.on('SYNCHRONIZATION_DETECTED', (matches) => {
  const currentMatches = useStore.getState().realMatches;
  // Merge and deduplicate by subjectId
  const newMap = new Map();
  currentMatches.forEach(m => newMap.set(m.subjectId, m));
  matches.forEach(m => newMap.set(m.subjectId, m));
  
  useStore.setState({ realMatches: Array.from(newMap.values()) });
});

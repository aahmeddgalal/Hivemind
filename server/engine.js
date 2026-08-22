const WEIGHTS = {
  activity: 0.30,
  emotion: 0.25,
  context: 0.20,
  thought: 0.15,
  time: 0.10
};

// Calculate similarity between two users based on their states
const calculateSimilarity = (stateA, stateB) => {
  if (!stateA || !stateB) return 0;
  
  let score = 0;
  
  // Basic exact match scoring for this prototype
  if (stateA.activity && stateA.activity === stateB.activity) score += WEIGHTS.activity;
  if (stateA.emotion && stateA.emotion === stateB.emotion) score += WEIGHTS.emotion;
  if (stateA.context && stateA.context === stateB.context) score += WEIGHTS.context;
  
  // Thought similarity: simplistic check for common words
  if (stateA.thought && stateB.thought) {
    const wordsA = new Set(stateA.thought.toLowerCase().split(' '));
    const wordsB = new Set(stateB.thought.toLowerCase().split(' '));
    const intersection = new Set([...wordsA].filter(x => wordsB.has(x)));
    if (intersection.size > 0) score += WEIGHTS.thought;
  }

  // Time similarity: assume active users are in the same time context, full score
  score += WEIGHTS.time;

  return (score * 100).toFixed(1);
};

const findMatchesForUser = (userId, allUsers) => {
  const currentUser = allUsers.find(u => u.id === userId);
  if (!currentUser || !currentUser.state) return [];

  const candidates = allUsers.filter(u => u.id !== userId && u.state);
  
  const matches = candidates.map(candidate => {
    const syncScore = calculateSimilarity(currentUser.state, candidate.state);
    return {
      subjectId: candidate.id.substring(0, 8), // anonymized ID
      syncScore: parseFloat(syncScore),
      state: {
        activity: candidate.state.activity,
        emotion: candidate.state.emotion,
        context: candidate.state.context
        // Note: raw thought is explicitly NOT returned to respect privacy
      }
    };
  });

  // Filter for strong matches only (e.g. >= 50%) and sort by strength
  return matches.filter(m => m.syncScore >= 50).sort((a, b) => b.syncScore - a.syncScore);
};

export default {
  calculateSimilarity,
  findMatchesForUser
};

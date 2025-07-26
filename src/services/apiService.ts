const API_BASE_URL = import.meta.env.MODE === 'production'
  ? 'https://randomplayables.com/api'
  : '/api';

const GAME_ID = import.meta.env.VITE_GAME_ID;

function getContextFromURL() {
  if (typeof window === 'undefined') {
    return { token: null, userId: null, username: null };
  }
  const urlParams = new URLSearchParams(window.location.search);
  const authToken = urlParams.get('authToken');
  const userId = urlParams.get('userId');
  const username = urlParams.get('username');
  return { token: authToken, userId, username };
}

export async function initGameSession() {
  try {
    const urlParams = new URLSearchParams(window.location.search);
    const surveyMode = urlParams.get('surveyMode') === 'true';
    const questionId = urlParams.get('questionId');
    const response = await fetch(`${API_BASE_URL}/game-session`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        gameId: GAME_ID,
        surveyMode: surveyMode,
        surveyQuestionId: questionId
      }),
    });
    if (!response.ok) throw new Error('Failed to initialize game session');
    const sessionData = await response.json();
    if (surveyMode && window.parent) {
      console.log('Game is in survey mode. Posting session data to parent window.');
      window.parent.postMessage({ type: 'GAME_SESSION_CREATED', payload: sessionData }, '*');
    }
    return sessionData;
  } catch (error) {
    console.error('Error initializing game session:', error);
    return { sessionId: 'local-session' };
  }
}

export async function saveGameData(sessionId: string, roundNumber: number, roundData: any) {
  try {
    if (!sessionId) {
      console.error('No session ID provided for saving game data');
      return;
    }
    const response = await fetch(`${API_BASE_URL}/game-data`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ sessionId, roundNumber, roundData }),
    });
    if (!response.ok) throw new Error('Failed to save game data');
    return response.json();
  } catch (error) {
    console.error('Error saving game data:', error);
    return null;
  }
}

export async function getGauntletChallenge(gauntletId: string): Promise<any> {
  try {
    const response = await fetch(`${API_BASE_URL}/gauntlet/challenges/${gauntletId}`);
    if (!response.ok) throw new Error('Failed to fetch challenge data');
    const data = await response.json();
    return data.challenge;
  } catch (error) {
    console.error('Error fetching gauntlet challenge data:', error);
    throw error;
  }
}

export async function resolveGauntletChallenge(gauntletId: string, winner: 'A' | 'B'): Promise<any> {
  try {
    const { token } = getContextFromURL();
    const headers: Record<string, string> = { 'Content-Type': 'application/json' };
    if (token) headers['Authorization'] = `Bearer ${token}`;
    const response = await fetch(`${API_BASE_URL}/gauntlet/challenges/${gauntletId}/resolve`, {
      method: 'POST',
      headers,
      body: JSON.stringify({ winner }),
    });
    if (!response.ok) throw new Error('Failed to resolve challenge');
    return response.json();
  } catch (error) {
    console.error('Error resolving gauntlet challenge:', error);
    throw error;
  }
}
export type GuessResult = 'high' | 'low' | 'correct';

export interface GuessEntry {
  guess: number;
  result: GuessResult;
}

export type GuessHistory = GuessEntry[];

export type GameMode = 'challenger' | 'opponent';

export interface GameSession {
  sessionId: string;
  [key: string]: any;
}

export interface GauntletCreationResponse {
  gauntletId: string;
  challengeUrl: string;
  [key: string]: any;
}

export interface GauntletChallenge {
  gauntletId: string;
  secretNumber: number;
  challengerId?: string;
  challengerUsername?: string;
  [key: string]: any;
}

export type GauntletWinner = 'A' | 'B';

export interface GauntletResolutionResponse {
  gauntletId: string;
  winner: GauntletWinner;
  [key: string]: any;
}
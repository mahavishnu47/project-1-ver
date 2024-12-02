import OpenAI from 'openai';

export const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
  dangerouslyAllowBrowser: true // Only for demo purposes
});

export type GameType = 'quiz' | 'matching' | 'flashcards' | 'puzzle';
export type Difficulty = 'beginner' | 'medium' | 'advanced';

export interface GameContent {
  title: string;
  description: string;
  estimatedTime: string;
  points: number;
  content: QuizContent | MatchingContent | FlashcardsContent | PuzzleContent;
}

interface QuizContent {
  questions: Array<{
    question: string;
    options: string[];
    correctAnswer: number;
    explanation: string;
  }>;
}

interface MatchingContent {
  pairs: Array<{
    term: string;
    definition: string;
  }>;
}

interface FlashcardsContent {
  cards: Array<{
    front: string;
    back: string;
  }>;
}

interface PuzzleContent {
  words: string[];
  clues: string[];
  grid?: string[][];
}
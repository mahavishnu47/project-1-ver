import { GameType, Difficulty } from './openai';

export function generateSystemPrompt(gameType: GameType, difficulty: Difficulty, grade: string) {
  return `You are an expert educational content creator specializing in creating engaging learning games. 
Your task is to create a ${difficulty} level ${gameType} game that effectively teaches the given concept for ${grade} level students.

Follow these guidelines:
1. Ensure content is accurate and educational
2. Match the difficulty level and grade appropriately
3. Include clear explanations using grade-appropriate language
4. Make the content engaging and interactive
5. Focus on key learning outcomes
6. Adapt vocabulary and complexity to the student's grade level

Output Format: Strictly follow the JSON structure based on the game type.`;
}

export function generateGamePrompt(concept: string, gameType: GameType, grade: string) {
  const prompts = {
    quiz: `Create a multiple choice quiz about "${concept}" appropriate for ${grade} level students with:
- 5 questions of increasing difficulty
- 4 options per question
- Clear, concise questions using grade-appropriate language
- One correct answer per question
- Brief explanation for each correct answer
Format as JSON with: questions[], options[], correctAnswer, explanation`,

    matching: `Create a matching game about "${concept}" appropriate for ${grade} level students with:
- 8 pairs of related terms and definitions
- Clear, concise terms using grade-appropriate vocabulary
- Accurate definitions
- Varying difficulty levels
Format as JSON with: pairs[] containing term and definition`,

    flashcards: `Create a set of flashcards about "${concept}" appropriate for ${grade} level students with:
- 10 cards with clear front/back content
- Progressive difficulty
- Key concepts and definitions using grade-appropriate language
- Examples where appropriate
Format as JSON with: cards[] containing front and back`,

    puzzle: `Create a word puzzle about "${concept}" appropriate for ${grade} level students with:
- 8-10 key terms related to the concept
- Clear clues using grade-appropriate vocabulary
- Varying word lengths
- Connected to core concepts
Format as JSON with: words[], clues[]`
  };

  return prompts[gameType];
}
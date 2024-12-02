import type { GameType } from './openai';

export function generateAnimationPrompt(concept: string, grade: string) {
  return `Create an educational animation to explain "${concept}" for ${grade} level students.
The animation should:
1. Break down the concept into key components
2. Show relationships between elements
3. Use appropriate vocabulary for the grade level
4. Include 3-5 key points or elements
5. Suggest positions for visual elements

Format as JSON with:
{
  "type": "conceptMap",
  "elements": [
    {
      "id": "string",
      "content": "string",
      "position": { "x": number, "y": number },
      "delay": number
    }
  ]
}`; // Added missing closing brace
}
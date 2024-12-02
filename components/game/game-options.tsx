"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface GameOptionsProps {
  gameType: string;
  setGameType: (value: string) => void;
  difficulty: string;
  setDifficulty: (value: string) => void;
  disabled?: boolean;
}

export function GameOptions({
  gameType,
  setGameType,
  difficulty,
  setDifficulty,
  disabled
}: GameOptionsProps) {
  return (
    <div className="grid grid-cols-2 gap-4">
      <div className="space-y-2">
        <label className="text-sm font-medium">Game Type</label>
        <Select
          value={gameType}
          onValueChange={setGameType}
          disabled={disabled}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select game type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="quiz">Multiple Choice Quiz</SelectItem>
            <SelectItem value="matching">Matching Game</SelectItem>
            <SelectItem value="flashcards">Flashcards</SelectItem>
            <SelectItem value="puzzle">Word Puzzle</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium">Difficulty Level</label>
        <Select
          value={difficulty}
          onValueChange={setDifficulty}
          disabled={disabled}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select difficulty" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="beginner">Beginner</SelectItem>
            <SelectItem value="medium">Intermediate</SelectItem>
            <SelectItem value="advanced">Advanced</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
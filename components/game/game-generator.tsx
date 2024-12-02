"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Loader2 } from "lucide-react";
import { GameOptions } from "./game-options";
import { GradeSelector } from "./grade-selector";
import { GamePreview } from "./game-preview";
import type { GameContent } from "@/lib/openai";
import { useToast } from "@/components/ui/use-toast";

export function GameGenerator() {
  const [concept, setConcept] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [gameType, setGameType] = useState<string>("quiz");
  const [difficulty, setDifficulty] = useState<string>("medium");
  const [grade, setGrade] = useState<string>("middle");
  const [gameContent, setGameContent] = useState<GameContent | null>(null);
  const { toast } = useToast();

  const handleGenerate = async () => {
    if (!concept) return;
    
    setIsGenerating(true);
    try {
      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          concept,
          gameType,
          difficulty,
          grade,
        }),
      });

      const data = await response.json();
      
      if (!data.success) {
        throw new Error(data.error || 'Failed to generate game');
      }

      setGameContent(data.data);
      toast({
        title: "Game Generated!",
        description: "Your learning game is ready to play.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to generate the game. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="space-y-6">
      <Card className="p-6 backdrop-blur-sm bg-card/90">
        <div className="space-y-4">
          <h2 className="text-2xl font-semibold text-center">Create Your Learning Game</h2>
          <div className="flex gap-2">
            <Input
              placeholder="Enter any concept or topic..."
              value={concept}
              onChange={(e) => setConcept(e.target.value)}
              className="text-lg"
              disabled={isGenerating}
            />
            <Button 
              size="lg" 
              className="w-32"
              onClick={handleGenerate}
              disabled={!concept || isGenerating}
            >
              {isGenerating ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                "Generate"
              )}
            </Button>
          </div>
          
          <div className="grid grid-cols-3 gap-4">
            <GameOptions
              gameType={gameType}
              setGameType={setGameType}
              difficulty={difficulty}
              setDifficulty={setDifficulty}
              disabled={isGenerating}
            />
            <GradeSelector
              grade={grade}
              setGrade={setGrade}
              disabled={isGenerating}
            />
          </div>
        </div>
      </Card>

      {gameContent && (
        <GamePreview
          concept={concept}
          gameType={gameType}
          difficulty={difficulty}
          content={gameContent}
        />
      )}
    </div>
  );
}
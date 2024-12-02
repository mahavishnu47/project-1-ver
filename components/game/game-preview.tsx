"use client";

import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Brain, Trophy, Timer } from "lucide-react";
import type { GameContent } from "@/lib/openai";

interface GamePreviewProps {
  concept: string;
  gameType: string;
  difficulty: string;
  content: GameContent;
}

export function GamePreview({ concept, gameType, difficulty, content }: GamePreviewProps) {
  return (
    <Card className="p-6 backdrop-blur-sm bg-card/90">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h3 className="text-2xl font-semibold">{content.title}</h3>
          <div className="flex gap-2">
            <Badge variant="secondary">{gameType}</Badge>
            <Badge variant="outline">{difficulty}</Badge>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <StatsCard
            icon={<Brain className="w-5 h-5" />}
            title="Concept"
            value={concept}
          />
          <StatsCard
            icon={<Trophy className="w-5 h-5" />}
            title="Points Available"
            value={content.points.toString()}
          />
          <StatsCard
            icon={<Timer className="w-5 h-5" />}
            title="Estimated Time"
            value={content.estimatedTime}
          />
        </div>

        <div className="bg-muted/50 rounded-lg p-4">
          <p className="text-muted-foreground">
            {content.description}
          </p>
        </div>

        <Button variant="default" size="lg" className="w-full">
          Start Learning
        </Button>
      </div>
    </Card>
  );
}

function StatsCard({ icon, title, value }: {
  icon: React.ReactNode;
  title: string;
  value: string;
}) {
  return (
    <div className="flex items-center space-x-3 p-4 rounded-lg bg-muted/30">
      <div className="text-primary">{icon}</div>
      <div>
        <p className="text-sm text-muted-foreground">{title}</p>
        <p className="font-medium">{value}</p>
      </div>
    </div>
  );
}

import { Button } from "@/components/ui/button";
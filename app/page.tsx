"use client";

import { Brain, Gamepad2, Users } from "lucide-react";
import { Card } from "@/components/ui/card";
import { GameGenerator } from "@/components/game/game-generator";

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-background to-secondary">
      <div className="container mx-auto px-4 py-16">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/80">
            AI-Powered Learning Games
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Transform any concept into an engaging learning experience. Powered by advanced AI, 
            designed for effective learning.
          </p>
        </div>

        {/* Game Generator Section */}
        <div className="max-w-2xl mx-auto mb-20">
          <GameGenerator />
        </div>

        {/* Features Section */}
        <div className="grid md:grid-cols-3 gap-8">
          <FeatureCard
            icon={<Brain className="w-12 h-12 text-primary" />}
            title="AI-Powered Learning"
            description="Advanced AI algorithms create personalized learning experiences tailored to your needs."
          />
          <FeatureCard
            icon={<Gamepad2 className="w-12 h-12 text-primary" />}
            title="Interactive Games"
            description="Engage with content through interactive games designed for maximum retention."
          />
          <FeatureCard
            icon={<Users className="w-12 h-12 text-primary" />}
            title="Community Learning"
            description="Join a community of learners, share resources, and learn together."
          />
        </div>
      </div>
    </main>
  );
}

function FeatureCard({ icon, title, description }: { 
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <Card className="p-6 text-center backdrop-blur-sm bg-card/90">
      <div className="flex justify-center mb-4">{icon}</div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-muted-foreground">{description}</p>
    </Card>
  );
}
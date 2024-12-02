"use client";

import { useEffect, useRef } from 'react';
import { Card } from "@/components/ui/card";
import { motion } from "framer-motion";

interface ConceptAnimationProps {
  concept: string;
  animation: AnimationData;
}

interface AnimationData {
  type: string;
  elements: AnimationElement[];
}

interface AnimationElement {
  id: string;
  content: string;
  position: { x: number; y: number };
  delay: number;
}

export function ConceptAnimation({ concept, animation }: ConceptAnimationProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <Card className="p-6 h-[300px] relative overflow-hidden">
      <h3 className="text-xl font-semibold mb-4">Visual Explanation</h3>
      <div ref={containerRef} className="relative h-full">
        {animation.elements.map((element) => (
          <motion.div
            key={element.id}
            className="absolute p-3 bg-primary/10 rounded-lg"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{
              opacity: 1,
              scale: 1,
              x: element.position.x,
              y: element.position.y,
            }}
            transition={{
              duration: 0.8,
              delay: element.delay,
              ease: "easeOut",
            }}
          >
            <p className="text-sm">{element.content}</p>
          </motion.div>
        ))}
      </div>
    </Card>
  );
}
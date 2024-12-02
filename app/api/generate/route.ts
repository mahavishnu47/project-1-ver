import { NextResponse } from 'next/server';
import { openai } from '@/lib/openai';
import { generateSystemPrompt, generateGamePrompt } from '@/lib/prompts';
import { generateAnimationPrompt } from '@/lib/animations';
import type { GameType, Difficulty, GameContent } from '@/lib/openai';


export async function POST(request: Request) {
  if (!process.env.OPENAI_API_KEY) {
    return NextResponse.json(
      { success: false, error: 'OpenAI API key is not configured' },
      { 
        status: 500,
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
          'Access-Control-Allow-Headers': 'Content-Type, Authorization',
        }
      }
    );
  }

  try {
    const { concept, gameType, difficulty, grade } = await request.json();

    const [gameCompletion, animationCompletion] = await Promise.all([
      openai.chat.completions.create({
        model: "gpt-4o-mini",
        messages: [
          {
            role: "system",
            content: generateSystemPrompt(gameType, difficulty, grade)
          },
          {
            role: "user",
            content: generateGamePrompt(concept, gameType, grade)
          }
        ],
        temperature: 0.7,
        response_format: { type: "json_object" }
      }),
      openai.chat.completions.create({
        model: "gpt-4o-mini",
        messages: [
          {
            role: "system",
            content: "You are an expert in creating educational visualizations."
          },
          {
            role: "user",
            content: generateAnimationPrompt(concept, grade)
          }
        ],
        temperature: 0.7,
        response_format: { type: "json_object" }
      })
    ]);

    const gameContent = JSON.parse(gameCompletion.choices[0].message.content || '{}');
    const animationContent = JSON.parse(animationCompletion.choices[0].message.content || '{}');

    return NextResponse.json({
      success: true,
      data: {
        ...gameContent,
        title: `${concept} ${gameType.charAt(0).toUpperCase() + gameType.slice(1)}`,
        estimatedTime: "10 mins",
        points: 100,
        animation: animationContent
      }
    }, {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization',
      }
    });
  } catch (error) {
    console.error('Game generation error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to generate game content' },
      { 
        status: 500,
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
          'Access-Control-Allow-Headers': 'Content-Type, Authorization',
        }
      }
    );
  }
}

// Handle OPTIONS request for CORS preflight
export async function OPTIONS(request: Request) {
  return NextResponse.json({}, {
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    },
  });
}
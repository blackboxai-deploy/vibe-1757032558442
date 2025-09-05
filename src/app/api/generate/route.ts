import { NextRequest, NextResponse } from 'next/server';
import { callReplicateAPI } from '@/lib/api';

// Set timeout to 5 minutes for image generation
export const maxDuration = 300;

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { prompt, dimensions, style } = body;

    // Validate input
    if (!prompt || typeof prompt !== 'string') {
      return NextResponse.json(
        { success: false, error: 'Prompt is required and must be a string' },
        { status: 400 }
      );
    }

    if (prompt.length > 1000) {
      return NextResponse.json(
        { success: false, error: 'Prompt must be less than 1000 characters' },
        { status: 400 }
      );
    }

    // Enhance prompt with additional details
    let enhancedPrompt = prompt.trim();
    
    // Add quality enhancers
    enhancedPrompt += ', high quality, detailed, professional photography';
    
    // Add dimension context if specified
    if (dimensions) {
      enhancedPrompt += `, ${dimensions} aspect ratio`;
    }

    console.log('Generating image with prompt:', enhancedPrompt);

    // Call Replicate API
    const imageUrl = await callReplicateAPI(enhancedPrompt);

    if (!imageUrl) {
      throw new Error('No image URL received from API');
    }

    return NextResponse.json({
      success: true,
      imageUrl: imageUrl,
      prompt: prompt,
      enhancedPrompt: enhancedPrompt,
      dimensions: dimensions || 'square',
      style: style || 'realistic'
    });

  } catch (error) {
    console.error('Image generation error:', error);
    
    // Return appropriate error message
    const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
    
    return NextResponse.json(
      { 
        success: false, 
        error: `Failed to generate image: ${errorMessage}` 
      },
      { status: 500 }
    );
  }
}

// Handle other HTTP methods
export async function GET() {
  return NextResponse.json(
    { error: 'Method not allowed. Use POST to generate images.' },
    { status: 405 }
  );
}
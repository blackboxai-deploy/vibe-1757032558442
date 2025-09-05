export interface GenerationRequest {
  prompt: string;
  dimensions?: string;
  style?: string;
}

export interface GenerationResponse {
  success: boolean;
  imageUrl?: string;
  error?: string;
}

const API_ENDPOINT = 'https://oi-server.onrender.com/chat/completions';
const API_HEADERS = {
  'customerId': 'cus_S16jfiBUH2cc7P',
  'Content-Type': 'application/json',
  'Authorization': 'Bearer xxx'
};

export async function generateImage(request: GenerationRequest): Promise<GenerationResponse> {
  try {
    const response = await fetch('/api/generate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(request),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error generating image:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error occurred'
    };
  }
}

export async function callReplicateAPI(prompt: string): Promise<string> {
  const response = await fetch(API_ENDPOINT, {
    method: 'POST',
    headers: API_HEADERS,
    body: JSON.stringify({
      model: 'replicate/black-forest-labs/flux-1.1-pro',
      messages: [
        {
          role: 'user',
          content: prompt
        }
      ]
    }),
  });

  if (!response.ok) {
    throw new Error(`API request failed: ${response.status}`);
  }

  const data = await response.json();
  
  // Extract image URL from response
  if (data.choices && data.choices[0] && data.choices[0].message) {
    return data.choices[0].message.content;
  }
  
  throw new Error('Invalid response format from API');
}

export const STYLE_PRESETS = {
  realistic: 'photorealistic, high quality, detailed',
  artistic: 'artistic, creative, expressive style',
  cartoon: 'cartoon style, animated, colorful',
  sketch: 'pencil sketch, hand-drawn, artistic',
  fantasy: 'fantasy art, magical, mystical',
  scifi: 'sci-fi, futuristic, high-tech',
  vintage: 'vintage style, retro, nostalgic',
  minimalist: 'minimalist, clean, simple design'
} as const;

export const DIMENSION_PRESETS = {
  square: '1024x1024',
  portrait: '832x1216',
  landscape: '1216x832',
  wide: '1344x768'
} as const;
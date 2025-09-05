'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { generateImage, STYLE_PRESETS, DIMENSION_PRESETS } from '@/lib/api';
import { useImageHistory } from '@/hooks/use-local-storage';
import { toast } from 'sonner';

interface ImageGeneratorProps {
  onImageGenerated?: (imageUrl: string) => void;
}

export function ImageGenerator({ onImageGenerated }: ImageGeneratorProps) {
  const [prompt, setPrompt] = useState('');
  const [style, setStyle] = useState<keyof typeof STYLE_PRESETS>('realistic');
  const [dimensions, setDimensions] = useState<keyof typeof DIMENSION_PRESETS>('square');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const { addImage } = useImageHistory();

  const handleGenerate = async () => {
    if (!prompt.trim()) {
      toast.error('Please enter a prompt');
      return;
    }

    if (prompt.length > 1000) {
      toast.error('Prompt must be less than 1000 characters');
      return;
    }

    setIsGenerating(true);
    setGeneratedImage(null);

    try {
      const enhancedPrompt = `${prompt}, ${STYLE_PRESETS[style]}`;
      
      const result = await generateImage({
        prompt: enhancedPrompt,
        dimensions: DIMENSION_PRESETS[dimensions],
        style
      });

      if (result.success && result.imageUrl) {
        setGeneratedImage(result.imageUrl);
        
        // Add to history
        addImage({
          prompt,
          imageUrl: result.imageUrl,
          dimensions: DIMENSION_PRESETS[dimensions],
          style
        });

        // Notify parent component
        onImageGenerated?.(result.imageUrl);
        
        toast.success('Image generated successfully!');
      } else {
        toast.error(result.error || 'Failed to generate image');
      }
    } catch (error) {
      console.error('Generation error:', error);
      toast.error('An unexpected error occurred');
    } finally {
      setIsGenerating(false);
    }
  };

  const handleDownload = () => {
    if (generatedImage) {
      const link = document.createElement('a');
      link.href = generatedImage;
      link.download = `ai-generated-${Date.now()}.jpg`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      toast.success('Image downloaded!');
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Generate AI Image</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Prompt Input */}
          <div className="space-y-2">
            <Label htmlFor="prompt">Describe your image</Label>
            <Textarea
              id="prompt"
              placeholder="A beautiful sunset over the mountains with vibrant colors..."
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              rows={4}
              maxLength={1000}
            />
            <div className="text-sm text-muted-foreground">
              {prompt.length}/1000 characters
            </div>
          </div>

          {/* Settings Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Style Selection */}
            <div className="space-y-2">
              <Label>Style</Label>
              <Select value={style} onValueChange={(value: keyof typeof STYLE_PRESETS) => setStyle(value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select a style" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="realistic">Realistic</SelectItem>
                  <SelectItem value="artistic">Artistic</SelectItem>
                  <SelectItem value="cartoon">Cartoon</SelectItem>
                  <SelectItem value="sketch">Sketch</SelectItem>
                  <SelectItem value="fantasy">Fantasy</SelectItem>
                  <SelectItem value="scifi">Sci-Fi</SelectItem>
                  <SelectItem value="vintage">Vintage</SelectItem>
                  <SelectItem value="minimalist">Minimalist</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Dimensions Selection */}
            <div className="space-y-2">
              <Label>Dimensions</Label>
              <Select value={dimensions} onValueChange={(value: keyof typeof DIMENSION_PRESETS) => setDimensions(value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select dimensions" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="square">Square (1024×1024)</SelectItem>
                  <SelectItem value="portrait">Portrait (832×1216)</SelectItem>
                  <SelectItem value="landscape">Landscape (1216×832)</SelectItem>
                  <SelectItem value="wide">Wide (1344×768)</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Generate Button */}
          <Button 
            onClick={handleGenerate} 
            disabled={isGenerating || !prompt.trim()}
            className="w-full"
            size="lg"
          >
            {isGenerating ? 'Generating Image...' : 'Generate Image'}
          </Button>
        </CardContent>
      </Card>

      {/* Generated Image Display */}
      {(isGenerating || generatedImage) && (
        <Card>
          <CardHeader>
            <CardTitle>Generated Image</CardTitle>
          </CardHeader>
          <CardContent>
            {isGenerating ? (
              <div className="flex flex-col items-center justify-center py-12 space-y-4">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
                <p className="text-sm text-muted-foreground">
                  Creating your image... This may take up to 5 minutes.
                </p>
              </div>
            ) : generatedImage ? (
              <div className="space-y-4">
                <div className="relative rounded-lg overflow-hidden">
                  <img
                    src={generatedImage}
                    alt={prompt}
                    className="w-full h-auto rounded-lg shadow-lg"
                  />
                </div>
                <div className="flex justify-between items-center">
                  <div className="text-sm text-muted-foreground">
                    Style: {style} • Dimensions: {DIMENSION_PRESETS[dimensions]}
                  </div>
                  <Button onClick={handleDownload} variant="outline">
                    Download
                  </Button>
                </div>
              </div>
            ) : null}
          </CardContent>
        </Card>
      )}
    </div>
  );
}
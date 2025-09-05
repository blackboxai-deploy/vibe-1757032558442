'use client';

import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useImageHistory } from '@/hooks/use-local-storage';
import { toast } from 'sonner';

interface GenerationHistoryProps {
  onPromptSelect?: (prompt: string, style: string, dimensions: string) => void;
}

export function GenerationHistory({ onPromptSelect }: GenerationHistoryProps) {
  const { images, clearHistory, searchImages } = useImageHistory();
  const [searchQuery, setSearchQuery] = useState('');

  const displayedImages = searchQuery ? searchImages(searchQuery) : images;

  const handleClearHistory = () => {
    if (images.length === 0) return;
    
    clearHistory();
    toast.success('Generation history cleared');
    setSearchQuery('');
  };

  const handlePromptReuse = (prompt: string, style: string, dimensions: string) => {
    onPromptSelect?.(prompt, style, dimensions);
    toast.success('Prompt loaded in generator');
  };

  const formatTimestamp = (timestamp: number) => {
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(new Date(timestamp));
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Generation History</CardTitle>
          <Button 
            variant="outline" 
            size="sm" 
            onClick={handleClearHistory}
            disabled={images.length === 0}
          >
            Clear All
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Search */}
        <div className="relative">
          <Input
            placeholder="Search prompts..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pr-8"
          />
          {searchQuery && (
            <Button
              variant="ghost"
              size="sm"
              className="absolute right-1 top-1 h-6 w-6 p-0"
              onClick={() => setSearchQuery('')}
            >
              ×
            </Button>
          )}
        </div>

        {/* History List */}
        {displayedImages.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-muted-foreground">
              {searchQuery ? 'No matching prompts found' : 'No generation history yet'}
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {displayedImages.slice(0, 20).map((image) => (
              <div
                key={image.id}
                className="flex items-start gap-3 p-3 border rounded-lg hover:bg-muted/50 transition-colors"
              >
                {/* Thumbnail */}
                <div className="flex-shrink-0">
                  <img
                    src={image.imageUrl}
                    alt={image.prompt}
                    className="w-12 h-12 rounded object-cover"
                  />
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0 space-y-2">
                  <p className="text-sm font-medium line-clamp-2">
                    {image.prompt}
                  </p>
                  
                  <div className="flex flex-wrap gap-1">
                    <Badge variant="outline" className="text-xs">
                      {image.style}
                    </Badge>
                    <Badge variant="outline" className="text-xs">
                      {image.dimensions}
                    </Badge>
                    <Badge variant="outline" className="text-xs">
                      {formatTimestamp(image.timestamp)}
                    </Badge>
                  </div>
                </div>

                {/* Actions */}
                {onPromptSelect && (
                  <div className="flex-shrink-0">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handlePromptReuse(image.prompt, image.style, image.dimensions)}
                    >
                      Reuse
                    </Button>
                  </div>
                )}
              </div>
            ))}
            
            {displayedImages.length > 20 && (
              <p className="text-xs text-muted-foreground text-center">
                Showing first 20 results
              </p>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
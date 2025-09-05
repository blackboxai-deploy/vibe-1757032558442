'use client';

import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { useImageHistory, GeneratedImage } from '@/hooks/use-local-storage';
import { toast } from 'sonner';

interface ImageGalleryProps {
  images?: GeneratedImage[];
  showActions?: boolean;
}

export function ImageGallery({ images: propImages, showActions = true }: ImageGalleryProps) {
  const { images: historyImages, removeImage } = useImageHistory();
  const [selectedImage, setSelectedImage] = useState<GeneratedImage | null>(null);
  
  // Use provided images or fall back to history
  const images = propImages || historyImages;

  const handleDownload = (image: GeneratedImage) => {
    const link = document.createElement('a');
    link.href = image.imageUrl;
    link.download = `ai-generated-${image.id}.jpg`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    toast.success('Image downloaded!');
  };

  const handleDelete = (image: GeneratedImage) => {
    removeImage(image.id);
    toast.success('Image removed from history');
    if (selectedImage?.id === image.id) {
      setSelectedImage(null);
    }
  };

  const formatTimestamp = (timestamp: number) => {
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(new Date(timestamp));
  };

  if (images.length === 0) {
    return (
      <Card>
        <CardContent className="flex flex-col items-center justify-center py-12">
          <div className="text-center space-y-2">
            <p className="text-lg font-medium text-muted-foreground">No images yet</p>
            <p className="text-sm text-muted-foreground">
              Generate your first AI image to see it here
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      {/* Gallery Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {images.map((image) => (
          <Card key={image.id} className="overflow-hidden group hover:shadow-lg transition-shadow">
            <CardContent className="p-0">
              <div className="relative">
                <Dialog>
                  <DialogTrigger asChild>
                    <div className="cursor-pointer">
                      <img
                        src={image.imageUrl}
                        alt={image.prompt}
                        className="w-full h-48 object-cover transition-transform group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors" />
                    </div>
                  </DialogTrigger>
                  <DialogContent className="max-w-4xl">
                    <DialogHeader>
                      <DialogTitle className="text-left">Generated Image</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4">
                      <img
                        src={image.imageUrl}
                        alt={image.prompt}
                        className="w-full h-auto rounded-lg"
                      />
                      <div className="space-y-2">
                        <p className="text-sm"><strong>Prompt:</strong> {image.prompt}</p>
                        <div className="flex flex-wrap gap-2">
                          <Badge variant="secondary">Style: {image.style}</Badge>
                          <Badge variant="secondary">Size: {image.dimensions}</Badge>
                          <Badge variant="secondary">
                            {formatTimestamp(image.timestamp)}
                          </Badge>
                        </div>
                      </div>
                      {showActions && (
                        <div className="flex gap-2">
                          <Button onClick={() => handleDownload(image)} variant="outline">
                            Download
                          </Button>
                          <Button 
                            onClick={() => handleDelete(image)} 
                            variant="outline" 
                            className="text-destructive hover:text-destructive"
                          >
                            Delete
                          </Button>
                        </div>
                      )}
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
              
              <div className="p-4 space-y-3">
                <div className="space-y-1">
                  <p className="text-sm font-medium line-clamp-2">
                    {image.prompt}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {formatTimestamp(image.timestamp)}
                  </p>
                </div>
                
                <div className="flex flex-wrap gap-1">
                  <Badge variant="outline" className="text-xs">
                    {image.style}
                  </Badge>
                  <Badge variant="outline" className="text-xs">
                    {image.dimensions}
                  </Badge>
                </div>

                {showActions && (
                  <div className="flex gap-2 pt-2">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleDownload(image)}
                      className="flex-1"
                    >
                      Download
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleDelete(image)}
                      className="text-destructive hover:text-destructive"
                    >
                      Delete
                    </Button>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
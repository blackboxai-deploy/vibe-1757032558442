'use client';

import { useState } from 'react';
import { Header } from '@/components/Header';
import { ImageGenerator } from '@/components/ImageGenerator';
import { ImageGallery } from '@/components/ImageGallery';
import { GenerationHistory } from '@/components/GenerationHistory';
import { SettingsPanel } from '@/components/SettingsPanel';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useImageHistory } from '@/hooks/use-local-storage';

export default function GeneratePage() {
  const [activeTab, setActiveTab] = useState('generate');
  const { images } = useImageHistory();

  const handleImageGenerated = (imageUrl: string) => {
    // Image has been generated and added to history automatically
    console.log('New image generated:', imageUrl);
  };

  const handlePromptSelect = (prompt: string, style: string, dimensions: string) => {
    // Switch to generate tab when prompt is selected
    setActiveTab('generate');
    // Note: In a real implementation, you'd pass these values to the ImageGenerator
    console.log('Selected prompt:', { prompt, style, dimensions });
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-6">
        <div className="space-y-6">
          {/* Page Header */}
          <div className="space-y-2">
            <h1 className="text-3xl font-bold">AI Image Generator</h1>
            <p className="text-muted-foreground">
              Create stunning images with AI. Describe what you want to see and watch it come to life.
            </p>
          </div>

          {/* Main Content */}
          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="generate">Generate</TabsTrigger>
              <TabsTrigger value="gallery">Gallery</TabsTrigger>
              <TabsTrigger value="history">History</TabsTrigger>
              <TabsTrigger value="settings">Settings</TabsTrigger>
            </TabsList>

            {/* Generate Tab */}
            <TabsContent value="generate" className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Main Generator */}
                <div className="lg:col-span-2">
                  <ImageGenerator onImageGenerated={handleImageGenerated} />
                </div>
                
                {/* Recent History Sidebar */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Recent Generations</h3>
                  {images.length > 0 ? (
                    <div className="space-y-3">
                      {images.slice(0, 5).map((image) => (
                        <div
                          key={image.id}
                          className="flex gap-3 p-3 border rounded-lg hover:bg-muted/50 transition-colors"
                        >
                          <img
                            src={image.imageUrl}
                            alt={image.prompt}
                            className="w-16 h-16 rounded object-cover"
                          />
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium line-clamp-2">
                              {image.prompt}
                            </p>
                            <p className="text-xs text-muted-foreground mt-1">
                              {new Intl.DateTimeFormat('en-US', {
                                month: 'short',
                                day: 'numeric',
                                hour: '2-digit',
                                minute: '2-digit'
                              }).format(new Date(image.timestamp))}
                            </p>
                          </div>
                        </div>
                      ))}
                      
                      {images.length > 5 && (
                        <p className="text-xs text-muted-foreground text-center">
                          {images.length - 5} more in gallery...
                        </p>
                      )}
                    </div>
                  ) : (
                    <div className="text-center py-8 text-muted-foreground">
                      <p>Your generated images will appear here</p>
                    </div>
                  )}
                </div>
              </div>
            </TabsContent>

            {/* Gallery Tab */}
            <TabsContent value="gallery">
              <ImageGallery />
            </TabsContent>

            {/* History Tab */}
            <TabsContent value="history">
              <GenerationHistory onPromptSelect={handlePromptSelect} />
            </TabsContent>

            {/* Settings Tab */}
            <TabsContent value="settings">
              <div className="max-w-2xl">
                <SettingsPanel />
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  );
}
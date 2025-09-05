'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { useLocalStorage } from '@/hooks/use-local-storage';
import { toast } from 'sonner';

const DEFAULT_SYSTEM_PROMPT = `You are an AI image generation system. Create high-quality, detailed images based on user prompts. Focus on:
- Visual clarity and composition
- Appropriate lighting and colors
- Realistic proportions and details
- Professional quality output

Enhance the user's prompt while staying true to their intent.`;

export function SettingsPanel() {
  const [systemPrompt, setSystemPrompt] = useLocalStorage('system-prompt', DEFAULT_SYSTEM_PROMPT);
  const [tempPrompt, setTempPrompt] = useState(systemPrompt);

  const handleSave = () => {
    setSystemPrompt(tempPrompt);
    toast.success('System prompt updated successfully!');
  };

  const handleReset = () => {
    setTempPrompt(DEFAULT_SYSTEM_PROMPT);
    setSystemPrompt(DEFAULT_SYSTEM_PROMPT);
    toast.success('System prompt reset to default');
  };

  const hasChanges = tempPrompt !== systemPrompt;

  return (
    <Card>
      <CardHeader>
        <CardTitle>AI Settings</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* System Prompt */}
        <div className="space-y-3">
          <Label htmlFor="system-prompt">System Prompt</Label>
          <p className="text-sm text-muted-foreground">
            Customize how the AI interprets and enhances your image prompts. This prompt guides the AI's behavior and style.
          </p>
          <Textarea
            id="system-prompt"
            value={tempPrompt}
            onChange={(e) => setTempPrompt(e.target.value)}
            rows={8}
            placeholder="Enter your system prompt..."
            className="resize-none"
          />
          <div className="text-sm text-muted-foreground">
            {tempPrompt.length} characters
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3">
          <Button
            onClick={handleSave}
            disabled={!hasChanges}
            className="flex-1"
          >
            Save Changes
          </Button>
          <Button
            onClick={handleReset}
            variant="outline"
          >
            Reset to Default
          </Button>
        </div>

        {/* Information Panel */}
        <div className="bg-muted/50 rounded-lg p-4 space-y-3">
          <h4 className="text-sm font-medium">How it works:</h4>
          <ul className="text-sm text-muted-foreground space-y-1">
            <li>• Your prompt is enhanced using this system prompt</li>
            <li>• Changes apply to all new image generations</li>
            <li>• Use specific instructions for consistent style</li>
            <li>• Reset anytime to return to defaults</li>
          </ul>
        </div>

        {/* Current Model Info */}
        <div className="border rounded-lg p-4 space-y-2">
          <h4 className="text-sm font-medium">Current Configuration:</h4>
          <div className="text-sm text-muted-foreground space-y-1">
            <p><strong>Model:</strong> FLUX-1.1-Pro</p>
            <p><strong>Provider:</strong> Replicate</p>
            <p><strong>Timeout:</strong> 5 minutes</p>
            <p><strong>Max Quality:</strong> High Resolution</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
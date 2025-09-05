import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Toaster } from '@/components/ui/sonner';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'AI Image Generator - Create Stunning Images with AI',
  description: 'Transform your ideas into beautiful, high-quality images using advanced AI technology. Fast, easy, and no setup required.',
  keywords: ['AI', 'image generation', 'artificial intelligence', 'FLUX', 'art', 'creativity'],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {children}
        <Toaster />
      </body>
    </html>
  );
}
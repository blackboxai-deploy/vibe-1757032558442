import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Header } from '@/components/Header';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-12">
        {/* Hero Section */}
        <section className="text-center space-y-8 py-12">
          <div className="space-y-4">
            <Badge variant="secondary" className="text-sm">
              Powered by FLUX-1.1-Pro
            </Badge>
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
              Create Stunning
              <span className="block text-primary">AI Images</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Transform your ideas into beautiful, high-quality images using advanced AI technology. 
              No experience required – just describe what you want to see.
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/generate">
              <Button size="lg" className="w-full sm:w-auto text-lg px-8 py-6">
                Start Creating
              </Button>
            </Link>
            <Button variant="outline" size="lg" className="w-full sm:w-auto text-lg px-8 py-6">
              View Examples
            </Button>
          </div>
        </section>

        {/* Sample Images Section */}
        <section className="py-12">
          <div className="text-center space-y-4 mb-8">
            <h2 className="text-3xl font-bold">See What's Possible</h2>
            <p className="text-muted-foreground">
              Examples of images created with our AI image generator
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {sampleImages.map((image, index) => (
              <Card key={index} className="overflow-hidden group hover:shadow-lg transition-shadow">
                <CardContent className="p-0">
                  <div className="relative">
                    <img
                      src={image.url}
                      alt={image.prompt}
                      className="w-full h-64 object-cover transition-transform group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    <div className="absolute bottom-4 left-4 right-4">
                      <p className="text-white text-sm font-medium line-clamp-2">
                        "{image.prompt}"
                      </p>
                      <Badge variant="secondary" className="mt-2">
                        {image.style}
                      </Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Features Section */}
        <section className="py-12">
          <div className="text-center space-y-4 mb-12">
            <h2 className="text-3xl font-bold">Why Choose Our AI Image Generator?</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Professional-grade AI image generation with powerful features and an intuitive interface
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="text-center">
                <CardContent className="p-6 space-y-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto">
                    <span className="text-2xl">{feature.icon}</span>
                  </div>
                  <h3 className="text-xl font-semibold">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-12 text-center">
          <Card className="max-w-2xl mx-auto">
            <CardContent className="p-8 space-y-6">
              <h2 className="text-2xl font-bold">Ready to Get Started?</h2>
              <p className="text-muted-foreground">
                Join thousands of creators using AI to bring their ideas to life. 
                Start generating amazing images in seconds.
              </p>
              <Link href="/generate">
                <Button size="lg" className="text-lg px-8 py-6">
                  Generate Your First Image
                </Button>
              </Link>
            </CardContent>
          </Card>
        </section>
      </main>
    </div>
  );
}

// Sample images data
const sampleImages = [
  {
    url: "https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/9e979678-6166-43ec-b984-fe8c84cdc252.png",
    prompt: "A majestic mountain landscape at golden hour with dramatic clouds",
    style: "Realistic"
  },
  {
    url: "https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/85868c0f-441b-456a-a719-9ee680145fd8.png",
    prompt: "A futuristic cityscape with neon lights and flying cars",
    style: "Sci-Fi"
  },
  {
    url: "https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/2938d898-1511-4be6-8563-5c7f33b732e1.png",
    prompt: "A whimsical fairy tale cottage in an enchanted forest",
    style: "Fantasy"
  },
  {
    url: "https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/9e7841fb-3420-447b-89e9-cc2799c9c317.png",
    prompt: "Abstract geometric art with vibrant colors and patterns",
    style: "Artistic"
  },
  {
    url: "https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/884536d2-a5c4-4482-8407-8fcd1fbd5aa4.png",
    prompt: "Cute cartoon animals having a tea party in a garden",
    style: "Cartoon"
  },
  {
    url: "https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/e99179e7-f40d-4654-a907-cb057bcc2d55.png",
    prompt: "A vintage steam train traveling through beautiful countryside",
    style: "Vintage"
  }
];

// Features data
const features = [
  {
    icon: "🎨",
    title: "Multiple Art Styles",
    description: "Choose from realistic, artistic, cartoon, fantasy, and more preset styles to match your vision."
  },
  {
    icon: "⚡",
    title: "Fast Generation",
    description: "High-quality images generated in minutes using state-of-the-art FLUX-1.1-Pro model."
  },
  {
    icon: "🔧",
    title: "Customizable Settings",
    description: "Adjust dimensions, styles, and system prompts to get exactly the results you want."
  },
  {
    icon: "💾",
    title: "History & Gallery",
    description: "Keep track of all your generations with built-in history and image gallery features."
  },
  {
    icon: "📱",
    title: "Responsive Design",
    description: "Works perfectly on desktop, tablet, and mobile devices with a clean, intuitive interface."
  },
  {
    icon: "🔒",
    title: "No Setup Required",
    description: "Start creating immediately - no API keys, accounts, or complex setup needed."
  }
];
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export function Header() {
  return (
    <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center space-x-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
            <span className="text-sm font-bold">AI</span>
          </div>
          <span className="text-xl font-bold">ImageGen</span>
        </Link>

        {/* Navigation */}
        <nav className="flex items-center space-x-4">
          <Link href="/">
            <Button variant="ghost">Home</Button>
          </Link>
          <Link href="/generate">
            <Button variant="ghost">Generate</Button>
          </Link>
        </nav>
      </div>
    </header>
  );
}
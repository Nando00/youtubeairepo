import Link from "next/link";
import { Youtube } from "lucide-react";
import { ThemeToggle } from "./theme-toggle";

export default function AuthNavbar() {
  return (
    <nav className="w-full border-b border-border bg-background py-2">
      <div className="container mx-auto px-4 flex justify-between items-center">
        <Link href="/" prefetch className="text-xl font-bold flex items-center">
          <Youtube className="w-6 h-6 text-red-600 mr-2" />
          <span>TranscriptAI</span>
        </Link>
        <div className="flex gap-4 items-center">
          <Link
            href="/sign-in"
            className="px-4 py-2 text-sm font-medium text-foreground hover:text-foreground/80"
          >
            Sign In
          </Link>
          <Link
            href="/sign-up"
            className="px-4 py-2 text-sm font-medium text-primary-foreground bg-primary rounded-md hover:bg-primary/90"
          >
            Sign Up
          </Link>
          <ThemeToggle />
        </div>
      </div>
    </nav>
  );
} 
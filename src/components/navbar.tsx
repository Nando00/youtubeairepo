'use client'

import Link from "next/link";
import { Button } from "./ui/button";
import { Youtube } from "lucide-react";
import UserProfile from "./user-profile";
import { ThemeToggle } from "./theme-toggle";
import { createClient } from "../../supabase/client";
import { useEffect, useState } from "react";
import { User } from "@supabase/supabase-js";

export default function Navbar() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const supabase = createClient();

  useEffect(() => {
    const initializeAuth = async () => {
      try {
        // Get initial session
        const { data: { session }, error } = await supabase.auth.getSession();
        
        if (error) {
          console.error('Error getting session:', error);
          return;
        }

        console.log('Initial session:', session);
        setUser(session?.user ?? null);
        setLoading(false);

        // Listen for auth changes
        const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
          console.log('Auth state changed:', _event, session);
          setUser(session?.user ?? null);
        });

        return () => subscription.unsubscribe();
      } catch (error) {
        console.error('Error in auth initialization:', error);
        setLoading(false);
      }
    };

    initializeAuth();
  }, []);

  if (loading) {
    return (
      <nav className="w-full border-b border-border bg-background py-2">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <Link href="/" prefetch className="text-xl font-bold flex items-center">
            <Youtube className="w-6 h-6 text-red-600 mr-2" />
            <span>TranscriptAI</span>
          </Link>
          <ThemeToggle />
        </div>
      </nav>
    );
  }

  return (
    <nav className="w-full border-b border-border bg-background py-2">
      <div className="container mx-auto px-4 flex justify-between items-center">
        <Link href="/" prefetch className="text-xl font-bold flex items-center">
          <Youtube className="w-6 h-6 text-red-600 mr-2" />
          <span>TranscriptAI</span>
        </Link>
        <div className="flex gap-4 items-center">
          {user ? (
            <>
              <Link
                href="/dashboard"
                className="px-4 py-2 text-sm font-medium text-foreground hover:text-foreground/80"
              >
                <Button>Dashboard</Button>
              </Link>
              <UserProfile user={user} />
            </>
          ) : (
            <>
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
            </>
          )}
          <ThemeToggle />
        </div>
      </div>
    </nav>
  );
}
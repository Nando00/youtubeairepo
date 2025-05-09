import { createClient } from "@/lib/supabase/server";
import { createServiceClient } from "@/lib/supabase/service";
import { NextResponse } from "next/server";
import { cookies } from 'next/headers'

export async function GET(request: Request) {
  const requestUrl = new URL(request.url);
  const code = requestUrl.searchParams.get("code");
  const next = requestUrl.searchParams.get("next") ?? "/";

  if (code) {
    const cookieStore = cookies();
    const supabase = createClient(cookieStore);
    const serviceClient = createServiceClient();

    try {
      // Log the full URL and parameters for debugging
      console.log("Callback URL:", requestUrl.toString());
      console.log("Code:", code);
      console.log("Next:", next);

      // Exchange the code for a session
      const { data: { session }, error: sessionError } = await supabase.auth.exchangeCodeForSession(code);
      
      if (sessionError) {
        console.error("Session error:", sessionError);
        return NextResponse.redirect(`${requestUrl.origin}/auth/sign-in?error=${encodeURIComponent(sessionError.message)}`);
      }

      if (!session?.user) {
        console.error("No session or user found");
        return NextResponse.redirect(`${requestUrl.origin}/auth/sign-in?error=No session found`);
      }

      try {
        // Delete existing user record if it exists
        const { error: deleteError } = await serviceClient
          .from("users")
          .delete()
          .eq("user_id", session.user.id);

        if (deleteError) {
          console.error("Failed to delete existing user:", deleteError);
          throw deleteError;
        }

        // Create new user record
        const { error: insertError } = await serviceClient
          .from("users")
          .insert({
            id: session.user.id,
            user_id: session.user.id,
            email: session.user.email,
            name: session.user.user_metadata?.name,
            full_name: session.user.user_metadata?.full_name,
            avatar_url: session.user.user_metadata?.avatar_url,
            token_identifier: session.user.email || session.user.id,
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString()
          });

        if (insertError) {
          console.error("Failed to insert new user:", insertError);
          throw insertError;
        }

        // Redirect to the specified URL
        return NextResponse.redirect(`${requestUrl.origin}${next}`);
      } catch (error) {
        console.error("Error managing user record:", error);
        throw error;
      }
    } catch (error) {
      console.error("Error in callback:", error);
      return NextResponse.redirect(`${requestUrl.origin}/auth/sign-in?error=${encodeURIComponent("Failed to process sign in")}`);
    }
  }

  // Return the user to an error page with some instructions
  return NextResponse.redirect(`${requestUrl.origin}/auth/sign-in?error=${encodeURIComponent("No code provided")}`);
}

import { createClient } from "../../../../../supabase/server";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  try {
    const requestUrl = new URL(request.url);
    const code = requestUrl.searchParams.get("code");
    const redirect_to = requestUrl.searchParams.get("redirect_to");

    if (!code) {
      console.error("No code provided in callback");
      return NextResponse.redirect(
        new URL("/sign-in?error=missing-code", requestUrl.origin)
      );
    }

    const supabase = await createClient();

    // Exchange the code for a session
    const { data, error } = await supabase.auth.exchangeCodeForSession(code);

    if (error) {
      console.error("Error exchanging code for session:", error);
      return NextResponse.redirect(
        new URL("/sign-in?error=auth-failed", requestUrl.origin)
      );
    }

    // Check if user was successfully authenticated and exists
    if (data?.user) {
      try {
        // Check if the user already exists in your custom users table
        const { data: existingUser, error: fetchError } = await supabase
          .from("users")
          .select("id")
          .eq("id", data.user.id)
          .single();

        // If user doesn't exist in your custom table, create a record
        if (!existingUser || fetchError?.code === "PGRST116") {
          const { error: insertError } = await supabase.from("users").insert({
            id: data.user.id,
            user_id: data.user.id,
            full_name:
              data.user.user_metadata?.full_name ||
              data.user.user_metadata?.name ||
              "",
            email: data.user.email,
            token_identifier: data.user.id,
            created_at: new Date().toISOString(),
          });

          if (insertError) {
            console.error("Error creating user record:", insertError);
            // If we can't create the user record, sign them out and redirect to sign in
            await supabase.auth.signOut();
            return NextResponse.redirect(
              new URL("/sign-in?error=user-creation-failed", requestUrl.origin)
            );
          }
        }
      } catch (error) {
        console.error("Error in user creation process:", error);
        // If there's an error, sign them out and redirect to sign in
        await supabase.auth.signOut();
        return NextResponse.redirect(
          new URL("/sign-in?error=user-creation-failed", requestUrl.origin)
        );
      }
    }

    // URL to redirect to after sign in process completes
    const redirectTo = redirect_to || "/dashboard";
    return NextResponse.redirect(new URL(redirectTo, requestUrl.origin));
  } catch (error) {
    console.error("Unexpected error in callback handler:", error);
    return NextResponse.redirect(
      new URL("/sign-in?error=unexpected", request.url)
    );
  }
}

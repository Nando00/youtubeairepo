import { createClient } from "../../../../../supabase/server";
import { createClient as createServiceClient } from "../../../../../supabase/service";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  try {
    const requestUrl = new URL(request.url);
    const code = requestUrl.searchParams.get("code");
    const error = requestUrl.searchParams.get("error");
    const error_description = requestUrl.searchParams.get("error_description");
    const redirect_to = requestUrl.searchParams.get("redirect_to");

    // Log the full URL and parameters for debugging
    console.log('Auth callback received:', {
      url: request.url,
      code: code ? 'present' : 'missing',
      error,
      error_description,
      redirect_to
    });

    // Handle OAuth errors
    if (error) {
      console.error('OAuth error:', { error, error_description });
      return NextResponse.redirect(
        new URL(`/sign-in?error=${encodeURIComponent(error_description || error)}`, requestUrl.origin)
      );
    }

    if (!code) {
      console.error("No code provided in callback. Full URL:", request.url);
      return NextResponse.redirect(
        new URL("/sign-in?error=missing-code", requestUrl.origin)
      );
    }

    const supabase = await createClient();
    const serviceClient = await createServiceClient();

    // Exchange the code for a session
    const { data, error: sessionError } = await supabase.auth.exchangeCodeForSession(code);

    if (sessionError) {
      console.error("Error exchanging code for session:", sessionError);
      return NextResponse.redirect(
        new URL(`/sign-in?error=${encodeURIComponent(sessionError.message)}`, requestUrl.origin)
      );
    }

    // Check if user was successfully authenticated and exists
    if (data?.user) {
      try {
        // Get the current user's ID as a string
        const userId = data.user.id.toString();

        // First, try to delete any existing user record (in case of manual deletion)
        const { error: deleteError } = await serviceClient
          .from("users")
          .delete()
          .eq("user_id", userId);

        if (deleteError) {
          console.error("Error deleting existing user record:", deleteError);
        }

        // Now create the new user record
        const userData = {
          id: data.user.id,
          user_id: userId,
          email: data.user.email,
          full_name: data.user.user_metadata?.full_name || data.user.user_metadata?.name || "",
          name: data.user.user_metadata?.name || "",
          avatar_url: data.user.user_metadata?.avatar_url || null,
          token_identifier: data.user.email || userId,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        };

        console.log("Creating new user record:", {
          ...userData,
          id: userData.id.substring(0, 8) + '...', // Log partial ID for security
          email: userData.email ? 'present' : 'missing'
        });

        // Insert the user record using service role client
        const { error: insertError } = await serviceClient
          .from("users")
          .insert(userData)
          .select()
          .single();

        if (insertError) {
          console.error("Error creating user record:", {
            code: insertError.code,
            message: insertError.message,
            details: insertError.details,
            hint: insertError.hint,
            userId
          });
          
          // If we can't create the user record, sign them out and redirect to sign in
          await supabase.auth.signOut();
          return NextResponse.redirect(
            new URL(`/sign-in?error=${encodeURIComponent(insertError.message)}`, requestUrl.origin)
          );
        }

        console.log("User created successfully");
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
    console.log('Redirecting to:', redirectTo);
    return NextResponse.redirect(new URL(redirectTo, requestUrl.origin));
  } catch (error) {
    console.error("Unexpected error in callback handler:", error);
    return NextResponse.redirect(
      new URL("/sign-in?error=unexpected", request.url)
    );
  }
}

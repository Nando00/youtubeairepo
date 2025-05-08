"use server";

import { encodedRedirect } from "@/utils/utils";
import { redirect } from "next/navigation";
import { createClient } from "../../supabase/server";

// New OAuth function
export const signInWithOAuthAction = async (formData: FormData) => {
  const provider = formData.get("provider")?.toString();

  if (!provider) {
    redirect("/sign-in?error=Provider is required");
  }

  const supabase = await createClient();

  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: provider as any,
    options: {
      redirectTo: `${process.env.NEXT_PUBLIC_APP_URL}/auth/callback`,
    },
  });

  if (error) {
    redirect(`/sign-in?error=${encodeURIComponent(error.message)}`);
  }

  if (data?.url) {
    redirect(data.url);
  }

  redirect("/sign-in?error=Could not initiate OAuth flow");
};

export const signUpAction = async (formData: FormData) => {
  const email = formData.get("email")?.toString();
  const password = formData.get("password")?.toString();
  const fullName = formData.get("full_name")?.toString() || "";
  const supabase = await createClient();

  if (!email || !password) {
    redirect("/sign-up?error=Email and password are required");
  }

  // Check if user already exists by attempting to sign in with email only
  const { data: existingUserData } = await supabase.auth.signInWithOtp({
    email,
    options: {
      shouldCreateUser: false,
    },
  });

  if (existingUserData?.user) {
    redirect("/sign-up?error=An account with this email already exists. Please sign in instead.");
  }

  const {
    data: { user },
    error,
  } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        full_name: fullName,
        email: email,
      },
    },
  });

  if (error) {
    redirect(`/sign-up?error=${encodeURIComponent(error.message)}`);
  }

  if (user) {
    try {
      // Check if user already exists in the users table
      const { data: existingUser, error: fetchError } = await supabase
        .from("users")
        .select("id")
        .eq("id", user.id)
        .single();

      if (fetchError && fetchError.code !== "PGRST116") {
        redirect("/sign-up?error=Error checking user. Please try again.");
      }

      // Only insert if user doesn't exist
      if (!existingUser) {
        const { error: updateError } = await supabase.from("users").insert({
          id: user.id,
          user_id: user.id,
          full_name: fullName,
          email: email,
          token_identifier: user.id,
          created_at: new Date().toISOString(),
        });

        if (updateError) {
          redirect("/sign-up?error=Error updating user profile. Please try again.");
        }
      }
    } catch (err) {
      redirect("/sign-up?error=An unexpected error occurred. Please try again.");
    }
  }

  redirect("/sign-up?success=Thanks for signing up! Please check your email for a verification link.");
};

export const signInAction = async (formData: FormData) => {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const supabase = await createClient();

  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    redirect(`/sign-in?error=${encodeURIComponent(error.message)}`);
  }

  redirect("/dashboard");
};

export const forgotPasswordAction = async (formData: FormData) => {
  const email = formData.get("email")?.toString();
  const supabase = await createClient();
  const callbackUrl = formData.get("callbackUrl")?.toString();

  if (!email) {
    redirect("/forgot-password?error=Email is required");
  }

  const { error } = await supabase.auth.resetPasswordForEmail(email, {});

  if (error) {
    redirect("/forgot-password?error=Could not reset password");
  }

  if (callbackUrl) {
    redirect(callbackUrl);
  }

  redirect("/forgot-password?success=Check your email for a link to reset your password.");
};

export const resetPasswordAction = async (formData: FormData) => {
  const supabase = await createClient();

  const password = formData.get("password") as string;
  const confirmPassword = formData.get("confirmPassword") as string;

  if (!password || !confirmPassword) {
    redirect("/protected/reset-password?error=Password and confirm password are required");
  }

  if (password !== confirmPassword) {
    redirect("/dashboard/reset-password?error=Passwords do not match");
  }

  const { error } = await supabase.auth.updateUser({
    password: password,
  });

  if (error) {
    redirect("/dashboard/reset-password?error=Password update failed");
  }

  redirect("/protected/reset-password?success=Password updated");
};

export const signOutAction = async () => {
  const supabase = await createClient();
  await supabase.auth.signOut();
  redirect("/sign-in");
};

export const checkUserSubscription = async (userId: string) => {
  const supabase = await createClient();

  const { data: subscription, error } = await supabase
    .from("subscriptions")
    .select("*")
    .eq("user_id", userId)
    .eq("status", "active")
    .single();

  if (error) {
    return false;
  }

  return !!subscription;
};

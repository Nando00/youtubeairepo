# Deployment Guide for TranscriptAI

## Prerequisites

- A Vercel account (recommended for Next.js apps)
- Your GitHub repository with the project code
- Supabase project (already set up)
- Stripe account (already set up)

## Step 1: Configure Environment Variables

Before deploying, make sure you have these environment variables ready:

- `NEXT_PUBLIC_SUPABASE_URL` - Your Supabase project URL
- `NEXT_PUBLIC_SUPABASE_ANON_KEY` - Your Supabase anonymous key
- `SUPABASE_SERVICE_KEY` - Your Supabase service role key
- `STRIPE_SECRET_KEY` - Your Stripe secret key
- `STRIPE_WEBHOOK_SECRET` - Your Stripe webhook secret

## Step 2: Deploy to Vercel

1. Go to [Vercel](https://vercel.com) and sign in
2. Click "Add New..." → "Project"
3. Import your GitHub repository
4. Configure the project:
   - Framework Preset: Next.js
   - Root Directory: ./
   - Build Command: next build
   - Output Directory: .next
5. Add all environment variables from Step 1
6. Click "Deploy"

## Step 3: Set Up Stripe Webhooks for Production

1. Go to [Stripe Dashboard](https://dashboard.stripe.com/webhooks)
2. Click "Add endpoint"
3. Enter your production webhook URL: `https://your-deployed-domain.com/api/payments/webhook`
4. Select these events to listen for:
   - `checkout.session.completed`
   - `customer.subscription.created`
   - `customer.subscription.updated`
   - `customer.subscription.deleted`
   - `invoice.payment_succeeded`
   - `invoice.payment_failed`
5. Get the webhook signing secret and update your `STRIPE_WEBHOOK_SECRET` environment variable in Vercel

## Step 4: Update Supabase Authentication Settings

1. Go to your [Supabase Dashboard](https://app.supabase.io)
2. Select your project
3. Go to Authentication → URL Configuration
4. Update the Site URL to your production URL
5. Add these redirect URLs:
   - `https://your-deployed-domain.com/auth/callback`
   - `https://your-deployed-domain.com/dashboard`

## Step 5: Deploy Supabase Edge Functions

1. Install Supabase CLI if you haven't already: `npm install -g supabase`
2. Login to Supabase: `supabase login`
3. Link your project: `supabase link --project-ref YOUR_PROJECT_ID`
4. Deploy the edge functions:
   ```
   supabase functions deploy get-plans
   supabase functions deploy create-checkout
   supabase functions deploy payments-webhook
   ```
5. Set secrets for the edge functions:
   ```
   supabase secrets set STRIPE_SECRET_KEY=your_stripe_secret_key
   supabase secrets set STRIPE_WEBHOOK_SECRET=your_stripe_webhook_secret
   ```

## Step 6: Verify Deployment

1. Visit your deployed site
2. Test user authentication (sign up, sign in)
3. Test the subscription flow
4. Check that webhook events are being processed correctly

## Troubleshooting

- **Authentication Issues**: Check Supabase URL configuration and redirect URLs
- **Stripe Payment Issues**: Verify Stripe webhook configuration and secrets
- **Edge Function Errors**: Check Supabase logs for function execution errors

## Ongoing Maintenance

- Monitor Vercel deployment logs
- Check Supabase database and edge function logs
- Monitor Stripe webhook events and payment processing

# Download Instructions for TranscriptAI Project

## Option 1: Clone from GitHub

1. Create a new repository on GitHub
2. In Tempo, connect your repository using the Git tab in the left panel
3. Push the code to your repository
4. Clone the repository to your local machine:
   ```bash
   git clone <your-repository-url>
   cd <repository-name>
   ```

## Option 2: Download ZIP

If you prefer not to use Git, you can download the project as a ZIP file:

1. In Tempo, click on the Git tab in the left panel
2. Look for the "Export as ZIP" or similar option
3. Download and extract the ZIP file to your local machine

## Setting Up Locally

1. Install dependencies:
   ```bash
   npm install
   ```

2. Set up environment variables:
   Create a `.env.local` file in the root directory with the following variables:
   ```
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   SUPABASE_URL=your_supabase_url
   SUPABASE_ANON_KEY=your_supabase_anon_key
   SUPABASE_SERVICE_KEY=your_supabase_service_key
   STRIPE_SECRET_KEY=your_stripe_secret_key
   STRIPE_WEBHOOK_SECRET=your_stripe_webhook_secret
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## Supabase Setup

This project uses Supabase for authentication and database. Make sure to:

1. Create a Supabase project
2. Set up the database tables as defined in the migrations
3. Configure authentication settings
4. Deploy the edge functions in the `supabase/functions` directory

## Stripe Setup

For payment functionality:

1. Create a Stripe account
2. Set up products and prices
3. Configure webhooks to point to your deployed application

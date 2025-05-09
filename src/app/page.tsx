import Hero from "@/components/hero";
import Navbar from "@/components/navbar";
import PricingCard from "@/components/pricing-card";
import Footer from "@/components/footer";
import { createClient } from '@/lib/supabase/server';
import {
  ArrowUpRight,
  FileText,
  Youtube,
  ListChecks,
  Clock,
  Download,
  Sparkles,
} from "lucide-react";
import Image from "next/image";

export default async function Home() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { data: plans, error } = await supabase.functions.invoke(
    "supabase-functions-get-plans",
  );

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <Hero />

      {/* How It Works Section */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">How It Works</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Transform YouTube content into actionable insights in three simple
              steps
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-12 max-w-5xl mx-auto">
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-6">
                <Youtube className="w-8 h-8 text-red-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3">
                1. Paste YouTube URLs
              </h3>
              <p className="text-muted-foreground">
                Enter one or multiple YouTube video URLs in our dashboard
              </p>
            </div>

            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-6">
                <Sparkles className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3">2. AI Processing</h3>
              <p className="text-muted-foreground">
                Our AI extracts transcripts and generates summaries and key
                points
              </p>
            </div>

            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-6">
                <Download className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3">3. Access Results</h3>
              <p className="text-muted-foreground">
                View, copy, or export your transcripts, summaries, and key
                points
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-secondary/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Powerful Features</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Our AI-powered platform helps you extract maximum value from
              YouTube content
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: <Youtube className="w-6 h-6" />,
                title: "Bulk Processing",
                description:
                  "Process multiple videos simultaneously to save time",
              },
              {
                icon: <FileText className="w-6 h-6" />,
                title: "Full Transcripts",
                description:
                  "Access complete text transcripts of any YouTube video",
              },
              {
                icon: <Sparkles className="w-6 h-6" />,
                title: "AI Summaries",
                description: "Get concise, accurate summaries of video content",
              },
              {
                icon: <ListChecks className="w-6 h-6" />,
                title: "Key Points",
                description:
                  "Extract the most important information automatically",
              },
              {
                icon: <Clock className="w-6 h-6" />,
                title: "Time Saving",
                description:
                  "Reduce hours of video watching to minutes of reading",
              },
              {
                icon: <Download className="w-6 h-6" />,
                title: "Export Options",
                description:
                  "Save as PDF or text for easy sharing and reference",
              },
            ].map((feature, index) => (
              <div
                key={index}
                className="p-6 bg-card text-card-foreground rounded-xl shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="text-red-600 mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Demo Section */}
      <section className="py-24 bg-background overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            <div className="lg:w-1/2">
              <h2 className="text-3xl font-bold mb-6">See It In Action</h2>
              <p className="text-muted-foreground mb-6">
                Our intuitive dashboard makes it easy to manage all your video
                content in one place. Upload URLs in bulk, track processing
                status, and access your generated content instantly.
              </p>
              <ul className="space-y-3 mb-8">
                {[
                  "Clean, user-friendly interface",
                  "Real-time processing status updates",
                  "Expandable sections for transcript, summary, and key points",
                  "One-click copy and export functionality",
                ].map((item, index) => (
                  <li key={index} className="flex items-start">
                    <div className="mr-3 mt-1">
                      <div className="w-5 h-5 rounded-full bg-green-100 flex items-center justify-center">
                        <div className="w-2 h-2 rounded-full bg-green-600"></div>
                      </div>
                    </div>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <a
                href="/dashboard"
                className="inline-flex items-center px-6 py-3 text-white bg-red-600 rounded-lg hover:bg-red-700 transition-colors"
              >
                Try It Now
                <ArrowUpRight className="ml-2 w-4 h-4" />
              </a>
            </div>
            <div className="lg:w-1/2 relative">
              <div className="bg-muted rounded-lg shadow-lg overflow-hidden">
                <div className="aspect-w-16 aspect-h-9 w-full">
                  <div className="w-full h-full bg-muted flex items-center justify-center">
                    <Image
                      src="https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?w=800&q=80"
                      alt="Dashboard Preview"
                      width={800}
                      height={450}
                      className="object-cover"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-red-600 text-white">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold mb-2">1000+</div>
              <div className="text-red-100">Videos Processed Daily</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">500+</div>
              <div className="text-red-100">Happy Users</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">10,000+</div>
              <div className="text-red-100">Hours Saved</div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-24 bg-background" id="pricing">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">
              Simple, Transparent Pricing
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Choose the perfect plan for your video processing needs. No hidden
              fees.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {plans?.map((item: any) => (
              <PricingCard key={item.id} item={item} user={user} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-secondary/30">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">
            Ready to Extract Value from YouTube Videos?
          </h2>
          <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
            Join hundreds of content creators, researchers, and businesses who
            save time with our AI-powered video processing.
          </p>
          <a
            href="/dashboard"
            className="inline-flex items-center px-6 py-3 text-white bg-red-600 rounded-lg hover:bg-red-700 transition-colors"
          >
            Start Processing Videos
            <ArrowUpRight className="ml-2 w-4 h-4" />
          </a>
        </div>
      </section>

      <Footer />
    </div>
  );
}

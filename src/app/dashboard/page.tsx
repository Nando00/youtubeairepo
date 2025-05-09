import { createClient } from '@/lib/supabase/server'
import { cookies } from 'next/headers'
import { InfoIcon, UserCircle } from "lucide-react"
import { redirect } from "next/navigation"
import SubscriptionCheck from "@/components/subscription-check"

export default async function Dashboard() {
  const cookieStore = cookies()
  const supabase = createClient(cookieStore)
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect('/sign-in')
  }

  return (
    <SubscriptionCheck>
      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-4 py-8">
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-3xl font-bold">Dashboard</h1>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <UserCircle className="w-6 h-6" />
                <span>{user.email}</span>
              </div>
            </div>
          </div>
          {/* Add your dashboard content here */}
        </div>
      </div>
    </SubscriptionCheck>
  )
}

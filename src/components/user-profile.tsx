'use client'
import { UserCircle } from 'lucide-react'
import { Button } from './ui/button'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from './ui/dropdown-menu'
import { createClient } from '../../supabase/client'
import { useRouter } from 'next/navigation'
import { User } from '@supabase/supabase-js'

interface UserProfileProps {
    user: User;
}

export default function UserProfile({ user }: UserProfileProps) {
    const supabase = createClient()
    const router = useRouter()

    const handleSignOut = async () => {
        try {
            const { error } = await supabase.auth.signOut()
            if (error) {
                console.error('Error signing out:', error)
                return
            }
            router.push("/")
            router.refresh()
        } catch (error) {
            console.error('Error in sign out:', error)
        }
    }

    if (!user) {
        console.log('No user provided to UserProfile')
        return null
    }

    console.log('UserProfile rendering with user:', user)

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon">
                    <UserCircle className="h-6 w-6" />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={handleSignOut}>
                    Sign out
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}
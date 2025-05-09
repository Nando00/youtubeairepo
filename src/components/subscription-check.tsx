import { redirect } from 'next/navigation';
import { checkUserSubscription } from '@/app/actions';
import { createClient } from '@/lib/supabase/server';
import { cookies } from 'next/headers';

interface SubscriptionCheckProps {
    children: React.ReactNode;
    redirectTo?: string;
}

export default async function SubscriptionCheck({
    children,
    redirectTo = '/pricing'
}: SubscriptionCheckProps) {
    const cookieStore = cookies();
    const supabase = createClient(cookieStore);
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
        redirect('/sign-in');
    }

    const { data: subscription } = await supabase
        .from('subscriptions')
        .select('*')
        .eq('user_id', user.id)
        .eq('status', 'active')
        .single();

    if (!subscription) {
        redirect(redirectTo);
    }

    return <>{children}</>;
}

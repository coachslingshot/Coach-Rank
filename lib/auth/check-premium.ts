import { createClient } from '@/lib/supabase/server';

export async function checkPremiumStatus(userId: string): Promise<boolean> {
    const supabase = createClient();

    const { data, error } = await supabase
        .from('subscriptions')
        .select('status, current_period_end')
        .eq('user_id', userId)
        .eq('status', 'active')
        .single();

    if (error || !data) {
        return false;
    }

    // Check if subscription is still valid
    if (data.current_period_end) {
        const endDate = new Date(data.current_period_end);
        const now = new Date();
        return endDate > now;
    }

    return data.status === 'active';
}

export async function requirePremium(userId: string): Promise<void> {
    const isPremium = await checkPremiumStatus(userId);

    if (!isPremium) {
        throw new Error('Premium subscription required');
    }
}

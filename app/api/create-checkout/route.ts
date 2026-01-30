import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { createCheckoutSession } from '@/lib/stripe/server';

export async function POST(request: NextRequest) {
    const supabase = createClient();

    // Check authentication
    const { data: { session } } = await supabase.auth.getSession();

    if (!session) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const userId = session.user.id;
    const body = await request.json();
    const { mode } = body; // 'subscription' or 'custom_report'

    try {
        // Check if user already has a customer ID
        const { data: subscription } = await supabase
            .from('subscriptions')
            .select('stripe_customer_id')
            .eq('user_id', userId)
            .single();

        const customerId = subscription?.stripe_customer_id;

        // Determine price ID based on mode
        const priceId = mode === 'subscription'
            ? process.env.STRIPE_PREMIUM_PRICE_ID!
            : process.env.STRIPE_CUSTOM_REPORT_PRICE_ID!;

        const successUrl = `${process.env.NEXT_PUBLIC_APP_URL}/payment/success?session_id={CHECKOUT_SESSION_ID}`;
        const cancelUrl = `${process.env.NEXT_PUBLIC_APP_URL}/subscribe`;

        const checkoutMode = mode === 'subscription' ? 'subscription' : 'payment';

        const session = await createCheckoutSession({
            priceId,
            customerId,
            userId,
            successUrl,
            cancelUrl,
            mode: checkoutMode,
        });

        return NextResponse.json({ sessionId: session.id, url: session.url });
    } catch (error: any) {
        return NextResponse.json(
            { error: error.message || 'Failed to create checkout session' },
            { status: 500 }
        );
    }
}

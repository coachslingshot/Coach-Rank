import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { constructWebhookEvent } from '@/lib/stripe/server';
import Stripe from 'stripe';

export async function POST(request: NextRequest) {
    const body = await request.text();
    const signature = request.headers.get('stripe-signature');

    if (!signature) {
        return NextResponse.json({ error: 'No signature' }, { status: 400 });
    }

    let event: Stripe.Event;

    try {
        event = await constructWebhookEvent(body, signature);
    } catch (err: any) {
        return NextResponse.json(
            { error: `Webhook Error: ${err.message}` },
            { status: 400 }
        );
    }

    const supabase = createClient();

    // Handle different event types
    switch (event.type) {
        case 'checkout.session.completed': {
            const session = event.data.object as Stripe.Checkout.Session;
            const userId = session.metadata?.userId;

            if (!userId) break;

            if (session.mode === 'subscription') {
                // Create or update subscription
                const { error } = await supabase.from('subscriptions').upsert({
                    user_id: userId,
                    stripe_customer_id: session.customer as string,
                    stripe_subscription_id: session.subscription as string,
                    status: 'active',
                    plan: 'premium',
                    current_period_end: new Date(
                        (session as any).current_period_end * 1000
                    ).toISOString(),
                });

                if (error) console.error('Error creating subscription:', error);
            } else if (session.mode === 'payment') {
                // Create custom report entry
                const { error } = await supabase.from('custom_reports').insert({
                    user_id: userId,
                    stripe_payment_id: session.payment_intent as string,
                    status: 'pending',
                });

                if (error) console.error('Error creating custom report:', error);
            }
            break;
        }

        case 'customer.subscription.updated': {
            const subscription = event.data.object as Stripe.Subscription;

            const { error } = await supabase
                .from('subscriptions')
                .update({
                    status: subscription.status,
                    current_period_end: new Date(
                        subscription.current_period_end * 1000
                    ).toISOString(),
                })
                .eq('stripe_subscription_id', subscription.id);

            if (error) console.error('Error updating subscription:', error);
            break;
        }

        case 'customer.subscription.deleted': {
            const subscription = event.data.object as Stripe.Subscription;

            const { error } = await supabase
                .from('subscriptions')
                .update({ status: 'canceled' })
                .eq('stripe_subscription_id', subscription.id);

            if (error) console.error('Error canceling subscription:', error);
            break;
        }
    }

    return NextResponse.json({ received: true });
}

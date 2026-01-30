import Stripe from 'stripe';

if (!process.env.STRIPE_SECRET_KEY) {
    throw new Error('Missing STRIPE_SECRET_KEY environment variable');
}

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
    apiVersion: '2023-10-16',
    typescript: true,
});

export async function createCheckoutSession(params: {
    priceId: string;
    customerId?: string;
    userId: string;
    successUrl: string;
    cancelUrl: string;
    mode: 'subscription' | 'payment';
}) {
    const { priceId, customerId, userId, successUrl, cancelUrl, mode } = params;

    const session = await stripe.checkout.sessions.create({
        mode,
        payment_method_types: ['card'],
        customer: customerId,
        line_items: [
            {
                price: priceId,
                quantity: 1,
            },
        ],
        success_url: successUrl,
        cancel_url: cancelUrl,
        metadata: {
            userId,
        },
    });

    return session;
}

export async function createCustomer(email: string, userId: string) {
    const customer = await stripe.customers.create({
        email,
        metadata: {
            userId,
        },
    });

    return customer;
}

export async function cancelSubscription(subscriptionId: string) {
    const subscription = await stripe.subscriptions.cancel(subscriptionId);
    return subscription;
}

export async function getSubscription(subscriptionId: string) {
    const subscription = await stripe.subscriptions.retrieve(subscriptionId);
    return subscription;
}

export async function constructWebhookEvent(
    payload: string | Buffer,
    signature: string
) {
    const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

    if (!webhookSecret) {
        throw new Error('Missing STRIPE_WEBHOOK_SECRET');
    }

    return stripe.webhooks.constructEvent(payload, signature, webhookSecret);
}

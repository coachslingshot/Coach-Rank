'use client';

import React, { useState } from 'react';
import { Check, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { getStripe } from '@/lib/stripe/client';

export default function SubscribePage() {
    const [loading, setLoading] = useState(false);

    const handleSubscribe = async () => {
        setLoading(true);

        try {
            const response = await fetch('/api/create-checkout', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ mode: 'subscription' }),
            });

            const { sessionId } = await response.json();

            const stripe = await getStripe();
            if (stripe) {
                await stripe.redirectToCheckout({ sessionId });
            }
        } catch (error) {
            console.error('Error:', error);
            alert('Failed to start checkout. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const features = [
        'Advanced analytics and trends',
        'Custom coach comparisons',
        'Historical data deep dives',
        'Recruiting efficiency metrics',
        'Early access to new features',
        'Ad-free experience',
        'Export data and reports',
        'Priority support',
    ];

    return (
        <div className="min-h-screen py-16 bg-gray-50">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12">
                    <div className="flex justify-center mb-6">
                        <div className="w-20 h-20 rounded-full bg-gold-gradient flex items-center justify-center glow-gold">
                            <Star className="w-10 h-10 text-white" />
                        </div>
                    </div>
                    <h1 className="font-headline text-6xl text-gray-900 mb-4">GO PREMIUM</h1>
                    <p className="text-xl text-gray-600">Unlock the complete Coach Rank experience</p>
                </div>

                <Card className="border-2 border-gold shadow-2xl">
                    <CardHeader className="bg-gold-gradient text-white text-center py-8">
                        <h2 className="font-headline text-4xl mb-2">PREMIUM ACCESS</h2>
                        <div className="flex items-baseline justify-center gap-2">
                            <span className="text-6xl font-bold">$19</span>
                            <span className="text-2xl">/month</span>
                        </div>
                        <p className="text-gold-light mt-2">Cancel anytime</p>
                    </CardHeader>

                    <CardContent className="py-12">
                        <div className="grid md:grid-cols-2 gap-4 mb-8">
                            {features.map((feature, index) => (
                                <div key={index} className="flex items-start gap-3">
                                    <div className="w-6 h-6 rounded-full bg-field-green flex items-center justify-center flex-shrink-0 mt-0.5">
                                        <Check className="w-4 h-4 text-white" />
                                    </div>
                                    <span className="text-gray-700 font-medium">{feature}</span>
                                </div>
                            ))}
                        </div>

                        <div className="text-center">
                            <Button
                                variant="premium"
                                size="lg"
                                onClick={handleSubscribe}
                                isLoading={loading}
                                className="w-full md:w-auto text-xl px-16"
                            >
                                Start Premium Today
                            </Button>
                            <p className="text-sm text-gray-500 mt-4">
                                Secure payment powered by Stripe
                            </p>
                        </div>
                    </CardContent>
                </Card>

                {/* Custom Report Option */}
                <div className="mt-12">
                    <Card>
                        <CardContent className="py-8 text-center">
                            <h3 className="text-2xl font-headline text-gray-900 mb-3">
                                Need a Custom Report?
                            </h3>
                            <p className="text-gray-600 mb-6">
                                Get a comprehensive, customized analysis comparing specific coaches
                            </p>
                            <div className="text-4xl font-bold text-field-green mb-6">$497</div>
                            <Button variant="primary" size="lg">
                                Request Custom Report
                            </Button>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}

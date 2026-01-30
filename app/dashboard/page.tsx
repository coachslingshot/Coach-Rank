import React from 'react';
import { redirect } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';
import { checkPremiumStatus } from '@/lib/auth/check-premium';
import { PremiumGate } from '@/components/premium-gate';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { TrendingUp, Users, BarChart3 } from 'lucide-react';

export const dynamic = 'force-dynamic';

export default async function DashboardPage() {
    const supabase = createClient();

    const { data: { session } } = await supabase.auth.getSession();

    if (!session) {
        redirect('/auth/login');
    }

    const isPremium = await checkPremiumStatus(session.user.id);

    if (!isPremium) {
        return (
            <div className="min-h-screen py-16 bg-gray-50">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    <PremiumGate />
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen py-12 bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="mb-12">
                    <h1 className="font-headline text-6xl text-gray-900 mb-4">PREMIUM DASHBOARD</h1>
                    <p className="text-xl text-gray-600">Advanced analytics and insights</p>
                </div>

                <div className="grid md:grid-cols-3 gap-8 mb-12">
                    <Card>
                        <CardHeader>
                            <div className="flex items-center gap-3">
                                <TrendingUp className="w-8 h-8 text-field-green" />
                                <h3 className="text-xl font-headline">Trending Coaches</h3>
                            </div>
                        </CardHeader>
                        <CardContent>
                            <p className="text-gray-600">Coaches with improving metrics this season</p>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <div className="flex items-center gap-3">
                                <Users className="w-8 h-8 text-field-green" />
                                <h3 className="text-xl font-headline">Custom Comparisons</h3>
                            </div>
                        </CardHeader>
                        <CardContent>
                            <p className="text-gray-600">Compare any coaches side-by-side</p>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <div className="flex items-center gap-3">
                                <BarChart3 className="w-8 h-8 text-field-green" />
                                <h3 className="text-xl font-headline">Deep Analytics</h3>
                            </div>
                        </CardHeader>
                        <CardContent>
                            <p className="text-gray-600">Historical trends and projections</p>
                        </CardContent>
                    </Card>
                </div>

                <Card>
                    <CardContent className="py-12 text-center">
                        <h2 className="text-3xl font-headline text-gray-900 mb-4">
                            Premium Features Coming Soon
                        </h2>
                        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                            We're building advanced analytics tools, custom comparison features, and deep insights exclusive to premium members.
                        </p>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}

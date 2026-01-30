'use client';

import React from 'react';
import Link from 'next/link';
import { Lock, Star, TrendingUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

interface PremiumGateProps {
    children?: React.ReactNode;
    blur?: boolean;
}

export function PremiumGate({ children, blur = true }: PremiumGateProps) {
    return (
        <div className="relative">
            {blur && children && (
                <div className="premium-blur">
                    {children}
                </div>
            )}

            <Card className="relative z-10 border-2 border-gold">
                <CardContent className="py-12 text-center">
                    <div className="flex justify-center mb-6">
                        <div className="w-20 h-20 rounded-full bg-gold-gradient flex items-center justify-center glow-gold">
                            <Lock className="w-10 h-10 text-white" />
                        </div>
                    </div>

                    <h3 className="text-3xl font-headline text-gray-900 mb-3">
                        Premium Access Required
                    </h3>
                    <p className="text-lg text-gray-600 mb-8 max-w-md mx-auto">
                        Unlock deep analytics, custom comparisons, and exclusive insights
                    </p>

                    <div className="grid md:grid-cols-3 gap-6 max-w-3xl mx-auto mb-8">
                        <div className="flex flex-col items-center">
                            <Star className="w-8 h-8 text-gold mb-2" />
                            <h4 className="font-semibold mb-1">Deep Analytics</h4>
                            <p className="text-sm text-gray-600">Advanced stats & trends</p>
                        </div>
                        <div className="flex flex-col items-center">
                            <TrendingUp className="w-8 h-8 text-gold mb-2" />
                            <h4 className="font-semibold mb-1">Custom Comparisons</h4>
                            <p className="text-sm text-gray-600">Compare any coaches</p>
                        </div>
                        <div className="flex flex-col items-center">
                            <Lock className="w-8 h-8 text-gold mb-2" />
                            <h4 className="font-semibold mb-1">Exclusive Access</h4>
                            <p className="text-sm text-gray-600">Premium-only insights</p>
                        </div>
                    </div>

                    <Link href="/subscribe">
                        <Button variant="premium" size="lg" className="text-xl px-12">
                            Unlock Premium - $19/mo
                        </Button>
                    </Link>
                </CardContent>
            </Card>
        </div>
    );
}

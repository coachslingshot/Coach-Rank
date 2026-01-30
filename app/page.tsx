import React from 'react';
import Link from 'next/link';
import { Trophy, TrendingUp, Target } from 'lucide-react';
import { createClient } from '@/lib/supabase/server';
import { CoachCard } from '@/components/coach-card';
import { Button } from '@/components/ui/button';

export const dynamic = 'force-dynamic';

export default async function HomePage() {
    const supabase = createClient();

    // Fetch top 25 coaches
    const { data: coaches } = await supabase
        .from('coaches')
        .select('*')
        .order('overall_score', { ascending: false })
        .limit(25);

    return (
        <div className="min-h-screen">
            {/* Hero Section */}
            <section className="relative bg-stadium-gradient field-pattern stadium-lights py-24 overflow-hidden">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <div className="text-center">
                        <div className="flex justify-center mb-6">
                            <div className="w-24 h-24 rounded-full bg-gold-gradient flex items-center justify-center glow-gold animate-scale-in">
                                <Trophy className="w-14 h-14 text-white" />
                            </div>
                        </div>
                        <h1 className="font-headline text-6xl md:text-7xl text-white mb-6 tracking-wide animate-fade-in">
                            D1 FOOTBALL COACH RANKINGS
                        </h1>
                        <p className="text-xl md:text-2xl text-gray-200 mb-8 max-w-3xl mx-auto animate-slide-up">
                            Data-driven rankings based on ATS performance, talent maximization, and player experience
                        </p>
                        <div className="flex flex-wrap justify-center gap-4 animate-slide-up">
                            <Link href="/coaches">
                                <Button variant="premium" size="lg">
                                    View All Coaches
                                </Button>
                            </Link>
                            <Link href="/subscribe">
                                <Button variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-field-green">
                                    Get Premium Access
                                </Button>
                            </Link>
                        </div>
                    </div>

                    {/* Stats Overview */}
                    <div className="grid md:grid-cols-3 gap-8 mt-16">
                        <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 text-center border border-white/20">
                            <Target className="w-10 h-10 text-gold mx-auto mb-3" />
                            <h3 className="font-headline text-3xl text-white mb-2">ATS Performance</h3>
                            <p className="text-gray-300">Against the spread success rate</p>
                        </div>
                        <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 text-center border border-white/20">
                            <TrendingUp className="w-10 h-10 text-gold mx-auto mb-3" />
                            <h3 className="font-headline text-3xl text-white mb-2">Talent Max</h3>
                            <p className="text-gray-300">NFL placements vs recruits</p>
                        </div>
                        <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 text-center border border-white/20">
                            <Trophy className="w-10 h-10 text-gold mx-auto mb-3" />
                            <h3 className="font-headline text-3xl text-white mb-2">Experience</h3>
                            <p className="text-gray-300">Retention & player ratings</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Top 25 Rankings */}
            <section className="py-16 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-12">
                        <h2 className="font-headline text-5xl text-gray-900 mb-4">TOP 25 COACHES</h2>
                        <p className="text-xl text-gray-600">The best of the best in Division I football</p>
                    </div>

                    {coaches && coaches.length > 0 ? (
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {coaches.map((coach, index) => (
                                <div key={coach.id} className="relative animate-slide-up" style={{ animationDelay: `${index * 0.05}s` }}>
                                    <div className="absolute -top-4 -left-4 w-12 h-12 rounded-full bg-gold-gradient flex items-center justify-center font-headline text-xl text-white shadow-lg z-10">
                                        #{index + 1}
                                    </div>
                                    <CoachCard coach={coach} />
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-16">
                            <p className="text-xl text-gray-500">No coaches ranked yet. Check back soon!</p>
                        </div>
                    )}

                    <div className="text-center mt-12">
                        <Link href="/coaches">
                            <Button variant="primary" size="lg">
                                View Complete Rankings
                            </Button>
                        </Link>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-20 bg-field-green text-white">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h2 className="font-headline text-5xl mb-6">READY TO GO DEEPER?</h2>
                    <p className="text-xl mb-8 text-gray-200">
                        Unlock premium analytics, custom coach comparisons, and exclusive insights for just $19/month
                    </p>
                    <Link href="/subscribe">
                        <Button variant="premium" size="lg" className="text-xl px-12">
                            Start Premium Today
                        </Button>
                    </Link>
                </div>
            </section>
        </div>
    );
}

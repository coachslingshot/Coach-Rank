import React from 'react';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import { createClient } from '@/lib/supabase/server';
import { ScoreBreakdown } from '@/components/score-breakdown';
import { RadarChartComponent } from '@/components/radar-chart';
import { ATSChart } from '@/components/ats-chart';
import { PremiumGate } from '@/components/premium-gate';
import { Card, CardContent } from '@/components/ui/card';
import { getGradeColor } from '@/lib/scoring/composite-calculator';
import { checkPremiumStatus } from '@/lib/auth/check-premium';

export const dynamic = 'force-dynamic';

export default async function CoachProfilePage({ params }: { params: { id: string } }) {
    const supabase = createClient();

    // Fetch coach data
    const response = await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/coaches/${params.id}`, {
        cache: 'no-store',
    });

    if (!response.ok) {
        notFound();
    }

    const coach = await response.json();

    // Check if user is premium
    const { data: { session } } = await supabase.auth.getSession();
    const isPremium = session ? await checkPremiumStatus(session.user.id) : false;

    const gradeColorClass = getGradeColor(coach.overall_grade || 'C');

    return (
        <div className="min-h-screen pb-16">
            {/* Hero Section */}
            <section className="relative bg-stadium-gradient field-pattern py-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex flex-col md:flex-row items-center gap-8">
                        {/* Coach Image */}
                        <div className="relative w-48 h-48 rounded-full overflow-hidden border-4 border-gold shadow-2xl">
                            {coach.image_url ? (
                                <Image
                                    src={coach.image_url}
                                    alt={coach.name}
                                    fill
                                    className="object-cover"
                                />
                            ) : (
                                <div className="absolute inset-0 bg-white/20 flex items-center justify-center">
                                    <span className="text-6xl font-headline text-white">
                                        {coach.name.split(' ').map((n: string) => n[0]).join('')}
                                    </span>
                                </div>
                            )}
                        </div>

                        {/* Coach Info */}
                        <div className="flex-1 text-center md:text-left">
                            <h1 className="font-headline text-5xl md:text-6xl text-white mb-3">
                                {coach.name}
                            </h1>
                            <p className="text-2xl text-gold mb-4">{coach.school}</p>
                            {coach.conference && (
                                <p className="text-lg text-gray-300">{coach.conference}</p>
                            )}
                        </div>

                        {/* Overall Grade */}
                        <div className="text-center">
                            <div className={`grade-badge ${gradeColorClass} !w-32 !h-32 !text-6xl shadow-2xl glow-gold`}>
                                {coach.overall_grade || 'N/A'}
                            </div>
                            <p className="text-white mt-3 text-lg font-semibold">Overall Grade</p>
                        </div>
                    </div>
                </div>
            </section>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12">
                <div className="grid lg:grid-cols-3 gap-8">
                    {/* Left Column - Score Breakdown */}
                    <div className="lg:col-span-1">
                        <ScoreBreakdown
                            atsScore={coach.ats_percentage || 0}
                            atsGrade={coach.ats_grade || 'C'}
                            talentScore={coach.talent_score || 0}
                            talentGrade={coach.talent_grade || 'C'}
                            experienceScore={coach.experience_score || 0}
                            experienceGrade={coach.experience_grade || 'C'}
                            overallScore={coach.overall_score || 0}
                            overallGrade={coach.overall_grade || 'C'}
                        />
                    </div>

                    {/* Right Column - Charts & Details */}
                    <div className="lg:col-span-2 space-y-8">
                        {/* Bio */}
                        {coach.bio && (
                            <Card>
                                <CardContent className="py-6">
                                    <h3 className="text-xl font-headline text-gray-900 mb-3">About</h3>
                                    <p className="text-gray-700 leading-relaxed">{coach.bio}</p>
                                </CardContent>
                            </Card>
                        )}

                        {/* Radar Chart */}
                        <RadarChartComponent
                            atsScore={coach.ats_percentage || 0}
                            talentScore={coach.talent_score || 0}
                            experienceScore={coach.experience_score || 0}
                            coachName={coach.name}
                        />

                        {/* ATS Chart */}
                        {coach.atsRecords && coach.atsRecords.length > 0 && (
                            <ATSChart records={coach.atsRecords} />
                        )}

                        {/* Key Stats */}
                        <Card>
                            <CardContent className="py-6">
                                <h3 className="text-xl font-headline text-gray-900 mb-4">Key Statistics</h3>
                                <div className="grid md:grid-cols-2 gap-6">
                                    <div>
                                        <p className="text-sm text-gray-500 mb-1">NFL Placements</p>
                                        <p className="text-3xl font-bold text-field-green">{coach.nfl_placements || 0}</p>
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-500 mb-1">Blue-Chip Recruits</p>
                                        <p className="text-3xl font-bold text-field-green">{coach.blue_chips || 0}</p>
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-500 mb-1">Retention Rate</p>
                                        <p className="text-3xl font-bold text-field-green">
                                            {coach.retention_percentage ? `${coach.retention_percentage.toFixed(1)}%` : 'N/A'}
                                        </p>
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-500 mb-1">Player Rating</p>
                                        <p className="text-3xl font-bold text-field-green">
                                            {coach.avg_player_rating ? `${coach.avg_player_rating.toFixed(1)}/10` : 'N/A'}
                                        </p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Premium Content */}
                        {!isPremium && (
                            <PremiumGate>
                                <Card>
                                    <CardContent className="py-12">
                                        <h3 className="text-2xl font-headline mb-4">Advanced Analytics</h3>
                                        <p className="text-gray-600">Detailed trend analysis, recruiting efficiency metrics, and more...</p>
                                    </CardContent>
                                </Card>
                            </PremiumGate>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

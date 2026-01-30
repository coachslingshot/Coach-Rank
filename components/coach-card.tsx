'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { type Coach } from '@/types/database';
import { getGradeColor } from '@/lib/scoring/composite-calculator';
import { formatScore } from '@/lib/utils/format';
import { Card } from '@/components/ui/card';

interface CoachCardProps {
    coach: Coach;
}

export function CoachCard({ coach }: CoachCardProps) {
    const gradeColorClass = getGradeColor(coach.overall_grade || 'C');

    return (
        <Link href={`/coaches/${coach.id}`}>
            <Card hover className="coach-card group">
                <div className="relative h-48 bg-gradient-to-br from-field-green-dark to-field-green">
                    {coach.image_url ? (
                        <Image
                            src={coach.image_url}
                            alt={coach.name}
                            fill
                            className="object-cover opacity-80 group-hover:opacity-100 transition-opacity"
                        />
                    ) : (
                        <div className="absolute inset-0 flex items-center justify-center">
                            <div className="w-24 h-24 rounded-full bg-white/20 flex items-center justify-center">
                                <span className="text-4xl font-headline text-white">
                                    {coach.name.split(' ').map(n => n[0]).join('')}
                                </span>
                            </div>
                        </div>
                    )}

                    {/* Grade Badge */}
                    <div className="absolute top-4 right-4">
                        <div className={`grade-badge ${gradeColorClass} shadow-lg`}>
                            {coach.overall_grade || 'N/A'}
                        </div>
                    </div>
                </div>

                <div className="p-6">
                    <h3 className="font-headline text-2xl text-gray-900 mb-1">
                        {coach.name}
                    </h3>
                    <p className="text-field-green font-semibold mb-4">
                        {coach.school}
                    </p>

                    <div className="grid grid-cols-3 gap-4 text-center">
                        <div>
                            <div className="text-2xl font-bold text-field-green">
                                {coach.ats_percentage ? `${coach.ats_percentage.toFixed(1)}%` : 'N/A'}
                            </div>
                            <div className="text-xs text-gray-500 uppercase">ATS</div>
                        </div>
                        <div>
                            <div className="text-2xl font-bold text-field-green">
                                {coach.talent_score ? formatScore(coach.talent_score) : 'N/A'}
                            </div>
                            <div className="text-xs text-gray-500 uppercase">Talent</div>
                        </div>
                        <div>
                            <div className="text-2xl font-bold text-field-green">
                                {coach.overall_score ? formatScore(coach.overall_score) : 'N/A'}
                            </div>
                            <div className="text-xs text-gray-500 uppercase">Overall</div>
                        </div>
                    </div>
                </div>
            </Card>
        </Link>
    );
}

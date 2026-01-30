'use client';

import React from 'react';
import { getGradeColor, getGradeHexColor } from '@/lib/scoring/composite-calculator';
import { formatScore } from '@/lib/utils/format';
import { Card, CardContent } from '@/components/ui/card';

interface ScoreBreakdownProps {
    atsScore: number;
    atsGrade: string;
    talentScore: number;
    talentGrade: string;
    experienceScore: number;
    experienceGrade: string;
    overallScore: number;
    overallGrade: string;
}

export function ScoreBreakdown({
    atsScore,
    atsGrade,
    talentScore,
    talentGrade,
    experienceScore,
    experienceGrade,
    overallScore,
    overallGrade,
}: ScoreBreakdownProps) {
    const metrics = [
        {
            name: 'ATS Performance',
            score: atsScore,
            grade: atsGrade,
            weight: '40%',
            description: 'Against the spread success rate',
        },
        {
            name: 'Talent Maximization',
            score: talentScore,
            grade: talentGrade,
            weight: '35%',
            description: 'NFL placements vs blue-chip recruits',
        },
        {
            name: 'Player Experience',
            score: experienceScore,
            grade: experienceGrade,
            weight: '25%',
            description: 'Retention rate & player ratings',
        },
    ];

    return (
        <div className="space-y-6">
            {/* Overall Score */}
            <Card>
                <CardContent className="py-8">
                    <div className="flex items-center justify-between">
                        <div>
                            <h3 className="text-lg font-semibold text-gray-600 mb-1">Overall Score</h3>
                            <div className="text-5xl font-headline text-field-green">{formatScore(overallScore)}</div>
                        </div>
                        <div className={`grade-badge ${getGradeColor(overallGrade)} !w-20 !h-20 !text-4xl shadow-xl`}>
                            {overallGrade}
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* Individual Metrics */}
            <div className="space-y-4">
                <h3 className="text-xl font-headline text-gray-900">Score Breakdown</h3>

                {metrics.map((metric) => (
                    <Card key={metric.name}>
                        <CardContent className="py-4">
                            <div className="flex items-center justify-between mb-3">
                                <div>
                                    <h4 className="font-semibold text-gray-900">{metric.name}</h4>
                                    <p className="text-sm text-gray-500">{metric.description}</p>
                                </div>
                                <div className="flex items-center gap-3">
                                    <span className="text-sm text-gray-500 font-medium">{metric.weight} weight</span>
                                    <div className={`grade-badge ${getGradeColor(metric.grade)} shadow-md`}>
                                        {metric.grade}
                                    </div>
                                </div>
                            </div>

                            {/* Progress Bar */}
                            <div className="relative w-full h-3 bg-gray-200 rounded-full overflow-hidden">
                                <div
                                    className="absolute inset-y-0 left-0 rounded-full transition-all duration-500"
                                    style={{
                                        width: `${metric.score}%`,
                                        backgroundColor: getGradeHexColor(metric.grade),
                                    }}
                                />
                            </div>

                            <div className="flex justify-between items-center mt-2">
                                <span className="text-sm text-gray-600">Score: {formatScore(metric.score)}/100</span>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    );
}

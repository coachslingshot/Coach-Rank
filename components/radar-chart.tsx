'use client';

import React from 'react';
import { RadarChart, PolarGrid, PolarAngleAxis, Radar, ResponsiveContainer, Legend } from 'recharts';
import { Card, CardContent, CardHeader } from '@/components/ui/card';

interface RadarChartComponentProps {
    atsScore: number;
    talentScore: number;
    experienceScore: number;
    coachName: string;
}

export function RadarChartComponent({
    atsScore,
    talentScore,
    experienceScore,
    coachName,
}: RadarChartComponentProps) {
    const data = [
        {
            metric: 'ATS',
            score: atsScore,
            fullMark: 100,
        },
        {
            metric: 'Talent',
            score: talentScore,
            fullMark: 100,
        },
        {
            metric: 'Experience',
            score: experienceScore,
            fullMark: 100,
        },
    ];

    return (
        <Card>
            <CardHeader>
                <h3 className="text-xl font-headline text-gray-900">Performance Radar</h3>
                <p className="text-sm text-gray-500">Multi-dimensional view of {coachName}'s strengths</p>
            </CardHeader>
            <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                    <RadarChart data={data}>
                        <PolarGrid stroke="#d1d5db" />
                        <PolarAngleAxis dataKey="metric" tick={{ fill: '#374151', fontSize: 14, fontWeight: 600 }} />
                        <Radar
                            name="Score"
                            dataKey="score"
                            stroke="#1a5f3a"
                            fill="#1a5f3a"
                            fillOpacity={0.6}
                            strokeWidth={2}
                        />
                        <Legend />
                    </RadarChart>
                </ResponsiveContainer>
            </CardContent>
        </Card>
    );
}

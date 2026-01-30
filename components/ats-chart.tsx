'use client';

import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { type ATSRecord } from '@/types/database';

interface ATSChartProps {
    records: ATSRecord[];
}

export function ATSChart({ records }: ATSChartProps) {
    const chartData = records
        .sort((a, b) => a.season.localeCompare(b.season))
        .map((record) => ({
            season: record.season,
            percentage: record.percentage || 0,
            covers: record.covers,
            games: record.games,
        }));

    return (
        <Card>
            <CardHeader>
                <h3 className="text-xl font-headline text-gray-900">ATS Performance History</h3>
                <p className="text-sm text-gray-500">Against the spread cover percentage by season</p>
            </CardHeader>
            <CardContent>
                {chartData.length > 0 ? (
                    <ResponsiveContainer width="100%" height={300}>
                        <LineChart data={chartData}>
                            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                            <XAxis dataKey="season" tick={{ fill: '#6b7280', fontSize: 12 }} />
                            <YAxis
                                tick={{ fill: '#6b7280', fontSize: 12 }}
                                domain={[0, 100]}
                                label={{ value: 'Cover %', angle: -90, position: 'insideLeft', fill: '#6b7280' }}
                            />
                            <Tooltip
                                contentStyle={{ backgroundColor: '#fff', border: '1px solid #d1d5db', borderRadius: '8px' }}
                                formatter={(value: number) => [`${value.toFixed(1)}%`, 'Cover Percentage']}
                            />
                            <Legend />
                            <Line
                                type="monotone"
                                dataKey="percentage"
                                stroke="#1a5f3a"
                                strokeWidth={3}
                                dot={{ fill: '#d4af37', r: 5 }}
                                activeDot={{ r: 7 }}
                                name="Cover %"
                            />
                        </LineChart>
                    </ResponsiveContainer>
                ) : (
                    <div className="h-64 flex items-center justify-center text-gray-500">
                        No ATS data available
                    </div>
                )}
            </CardContent>
        </Card>
    );
}

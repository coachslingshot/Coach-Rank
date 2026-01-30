'use client';

import React, { useState, useEffect } from 'react';
import { CoachCard } from '@/components/coach-card';
import { SearchBar } from '@/components/search-bar';
import { type Coach } from '@/types/database';
import { Filter } from 'lucide-react';

export default function CoachesPage() {
    const [coaches, setCoaches] = useState<Coach[]>([]);
    const [filteredCoaches, setFilteredCoaches] = useState<Coach[]>([]);
    const [loading, setLoading] = useState(true);
    const [selectedGrade, setSelectedGrade] = useState<string>('');

    useEffect(() => {
        fetchCoaches();
    }, []);

    const fetchCoaches = async () => {
        try {
            const response = await fetch('/api/coaches');
            const data = await response.json();
            setCoaches(data);
            setFilteredCoaches(data);
        } catch (error) {
            console.error('Error fetching coaches:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleSearch = (query: string) => {
        const lowercaseQuery = query.toLowerCase();
        let filtered = coaches.filter(
            (coach) =>
                coach.name.toLowerCase().includes(lowercaseQuery) ||
                coach.school.toLowerCase().includes(lowercaseQuery) ||
                coach.conference?.toLowerCase().includes(lowercaseQuery)
        );

        if (selectedGrade) {
            filtered = filtered.filter((coach) => coach.overall_grade === selectedGrade);
        }

        setFilteredCoaches(filtered);
    };

    const handleGradeFilter = (grade: string) => {
        setSelectedGrade(grade === selectedGrade ? '' : grade);

        let filtered = coaches;
        const targetGrade = grade === selectedGrade ? '' : grade;

        if (targetGrade) {
            filtered = filtered.filter((coach) => coach.overall_grade === targetGrade);
        }

        setFilteredCoaches(filtered);
    };

    const grades = ['A', 'B', 'C', 'D', 'F'];

    return (
        <div className="min-h-screen py-12 bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="text-center mb-12">
                    <h1 className="font-headline text-6xl text-gray-900 mb-4">ALL COACHES</h1>
                    <p className="text-xl text-gray-600">Complete database of Division I football coaches</p>
                </div>

                {/* Search & Filters */}
                <div className="mb-12 space-y-6">
                    <div className="flex justify-center">
                        <SearchBar onSearch={handleSearch} />
                    </div>

                    <div className="flex items-center justify-center gap-4 flex-wrap">
                        <div className="flex items-center gap-2 text-gray-700">
                            <Filter className="w-5 h-5" />
                            <span className="font-semibold">Filter by Grade:</span>
                        </div>
                        {grades.map((grade) => (
                            <button
                                key={grade}
                                onClick={() => handleGradeFilter(grade)}
                                className={`px-6 py-2 rounded-lg font-semibold transition-all ${selectedGrade === grade
                                        ? 'bg-field-green text-white shadow-lg'
                                        : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-300'
                                    }`}
                            >
                                Grade {grade}
                            </button>
                        ))}
                        {selectedGrade && (
                            <button
                                onClick={() => {
                                    setSelectedGrade('');
                                    setFilteredCoaches(coaches);
                                }}
                                className="px-4 py-2 text-sm text-red-600 hover:text-red-800 font-medium"
                            >
                                Clear Filter
                            </button>
                        )}
                    </div>
                </div>

                {/* Results Count */}
                <p className="text-center text-gray-600 mb-8">
                    Showing {filteredCoaches.length} of {coaches.length} coaches
                </p>

                {/* Coaches Grid */}
                {loading ? (
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {[...Array(9)].map((_, i) => (
                            <div key={i} className="skeleton h-96 rounded-xl" />
                        ))}
                    </div>
                ) : filteredCoaches.length > 0 ? (
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {filteredCoaches.map((coach) => (
                            <CoachCard key={coach.id} coach={coach} />
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-16">
                        <p className="text-xl text-gray-500">No coaches found matching your criteria</p>
                    </div>
                )}
            </div>
        </div>
    );
}

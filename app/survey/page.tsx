'use client';

import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { FileText, Star, AlertCircle, Lock, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { type Coach } from '@/types/database';
import { SURVEY_CATEGORIES, type SurveyQuestions } from '@/lib/survey-questions';

interface TokenValidation {
    valid: boolean;
    coach_id?: string;
    coach_name?: string;
    error?: string;
}

export default function SurveyPage() {
    const searchParams = useSearchParams();
    const token = searchParams.get('token');

    const [coaches, setCoaches] = useState<Coach[]>([]);
    const [selectedCoach, setSelectedCoach] = useState('');
    const [responses, setResponses] = useState<SurveyQuestions>({});
    const [feedback, setFeedback] = useState('');
    const [submitted, setSubmitted] = useState(false);
    const [loading, setLoading] = useState(false);
    const [tokenValidation, setTokenValidation] = useState<TokenValidation | null>(null);
    const [validatingToken, setValidatingToken] = useState(true);
    const [currentCategoryIndex, setCurrentCategoryIndex] = useState(0);

    useEffect(() => {
        validateToken();
        fetchCoaches();
    }, [token]);

    const validateToken = async () => {
        if (!token) {
            setTokenValidation({ valid: false, error: 'No invitation token provided' });
            setValidatingToken(false);
            return;
        }

        try {
            const response = await fetch(`/api/survey/validate-token?token=${token}`);
            const data = await response.json();

            setTokenValidation(data);

            if (data.valid && data.coach_id) {
                setSelectedCoach(data.coach_id);
            }
        } catch (error) {
            console.error('Error validating token:', error);
            setTokenValidation({ valid: false, error: 'Failed to validate invitation' });
        } finally {
            setValidatingToken(false);
        }
    };

    const fetchCoaches = async () => {
        try {
            const response = await fetch('/api/coaches');
            const data = await response.json();
            setCoaches(data.sort((a: Coach, b: Coach) => a.name.localeCompare(b.name)));
        } catch (error) {
            console.error('Error fetching coaches:', error);
        }
    };

    const handleSliderChange = (questionId: keyof SurveyQuestions, value: number) => {
        setResponses(prev => ({ ...prev, [questionId]: value }));
    };

    const getAnsweredCount = () => {
        return Object.values(responses).filter(v => v !== undefined && v !== null).length;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!selectedCoach) {
            alert('Please select a coach');
            return;
        }

        if (!token) {
            alert('Invalid invitation token');
            return;
        }

        // At least one question must be answered
        if (getAnsweredCount() === 0) {
            alert('Please answer at least one question');
            return;
        }

        setLoading(true);

        try {
            const response = await fetch('/api/ratings/submit', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    token,
                    coach_id: selectedCoach,
                    responses,
                    anonymous_feedback: feedback || null,
                }),
            });

            if (response.ok) {
                setSubmitted(true);
                setSelectedCoach('');
                setResponses({});
                setFeedback('');
            } else {
                const error = await response.json();
                alert(error.error || 'Failed to submit rating. Please try again.');
            }
        } catch (error) {
            console.error('Error submitting rating:', error);
            alert('Failed to submit rating. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const getSliderColor = (value: number | undefined) => {
        if (value === undefined || value === null) return 'bg-gray-300';
        if (value <= 3) return 'bg-red-500';
        if (value <= 6) return 'bg-yellow-500';
        return 'bg-green-500';
    };

    const getScoreColor = (value: number | undefined) => {
        if (value === undefined || value === null) return 'text-gray-400';
        if (value <= 3) return 'text-red-600';
        if (value <= 6) return 'text-yellow-600';
        return 'text-green-600';
    };

    // Show loading state while validating token
    if (validatingToken) {
        return (
            <div className="min-h-screen py-16 bg-gray-50 flex items-center justify-center">
                <Card className="w-full max-w-md">
                    <CardContent className="py-12 text-center">
                        <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center mx-auto mb-4 animate-pulse">
                            <FileText className="w-8 h-8 text-blue-600" />
                        </div>
                        <p className="text-gray-600">Validating invitation...</p>
                    </CardContent>
                </Card>
            </div>
        );
    }

    // Show error if token is invalid
    if (!tokenValidation?.valid) {
        return (
            <div className="min-h-screen py-16 bg-gray-50 flex items-center justify-center">
                <Card className="w-full max-w-md border-2 border-red-300">
                    <CardContent className="py-12 text-center">
                        <div className="w-16 h-16 rounded-full bg-red-100 flex items-center justify-center mx-auto mb-4">
                            <Lock className="w-8 h-8 text-red-600" />
                        </div>
                        <h2 className="text-2xl font-headline text-gray-900 mb-2">Access Denied</h2>
                        <p className="text-gray-600 mb-4">
                            {tokenValidation?.error || 'This survey requires a valid invitation link'}
                        </p>
                        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 text-left">
                            <p className="text-sm text-yellow-900">
                                <strong>Need access?</strong> This survey is invitation-only to ensure data integrity.
                                If you're a player who should have access, please contact the administrator.
                            </p>
                        </div>
                    </CardContent>
                </Card>
            </div>
        );
    }

    return (
        <div className="min-h-screen py-16 bg-gray-50">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12">
                    <div className="flex justify-center mb-6">
                        <div className="w-20 h-20 rounded-full bg-field-green flex items-center justify-center">
                            <FileText className="w-10 h-10 text-white" />
                        </div>
                    </div>
                    <h1 className="font-headline text-5xl md:text-6xl text-gray-900 mb-4">RATE YOUR COACH</h1>
                    <p className="text-xl text-gray-600 mb-2">
                        Anonymous player survey - Help us rank coaches accurately
                    </p>
                    {tokenValidation.coach_name && (
                        <p className="text-sm text-green-600 mt-2">
                            ✓ Invited to rate: {tokenValidation.coach_name}
                        </p>
                    )}
                    <p className="text-sm text-gray-500 mt-4">
                        {getAnsweredCount()} of 10 questions answered • All questions are optional
                    </p>
                </div>

                {submitted ? (
                    <Card className="border-2 border-green-500">
                        <CardContent className="py-12 text-center">
                            <div className="w-16 h-16 rounded-full bg-green-500 flex items-center justify-center mx-auto mb-4">
                                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                </svg>
                            </div>
                            <h2 className="text-2xl font-headline text-gray-900 mb-2">Thank You!</h2>
                            <p className="text-gray-600 mb-4">Your anonymous feedback has been submitted successfully.</p>
                            <p className="text-sm text-gray-500">This invitation link has been used and is no longer valid.</p>
                        </CardContent>
                    </Card>
                ) : (
                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Coach Selection */}
                        <Card>
                            <CardContent className="py-6">
                                <label className="block text-sm font-semibold text-gray-700 mb-2">
                                    Select Coach *
                                </label>
                                <select
                                    value={selectedCoach}
                                    onChange={(e) => setSelectedCoach(e.target.value)}
                                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-field-green focus:outline-none focus:ring-2 focus:ring-field-green/20"
                                    required
                                    disabled={!!tokenValidation.coach_id}
                                >
                                    <option value="">-- Choose a coach --</option>
                                    {coaches.map((coach) => (
                                        <option key={coach.id} value={coach.id}>
                                            {coach.name} - {coach.school}
                                        </option>
                                    ))}
                                </select>
                                {tokenValidation.coach_id && (
                                    <p className="text-xs text-gray-500 mt-1">
                                        This invitation is for rating {tokenValidation.coach_name}
                                    </p>
                                )}
                            </CardContent>
                        </Card>

                        {/* Survey Questions by Category */}
                        {SURVEY_CATEGORIES.map((category, categoryIndex) => (
                            <Card key={category.name} className="border-2 border-field-green/20">
                                <CardContent className="py-6">
                                    <div className="mb-6">
                                        <h3 className="text-2xl font-headline text-gray-900 mb-2">
                                            {category.name}
                                        </h3>
                                        <p className="text-sm text-gray-600">{category.description}</p>
                                    </div>

                                    <div className="space-y-8">
                                        {category.questions.map((question) => {
                                            const value = responses[question.id];
                                            return (
                                                <div key={question.id} className="space-y-3">
                                                    <label className="block text-base font-medium text-gray-900">
                                                        {question.text}
                                                    </label>

                                                    <div className="flex items-center gap-4">
                                                        <span className="text-sm text-gray-500 w-8">0</span>
                                                        <input
                                                            type="range"
                                                            min="0"
                                                            max="10"
                                                            value={value ?? 5}
                                                            onChange={(e) => handleSliderChange(question.id, parseInt(e.target.value))}
                                                            className="flex-1 h-3 rounded-lg appearance-none cursor-pointer slider"
                                                            style={{
                                                                background: value !== undefined
                                                                    ? `linear-gradient(to right, ${value <= 3 ? '#ef4444' : value <= 6 ? '#eab308' : '#22c55e'} 0%, ${value <= 3 ? '#ef4444' : value <= 6 ? '#eab308' : '#22c55e'} ${value * 10}%, #e5e7eb ${value * 10}%, #e5e7eb 100%)`
                                                                    : '#e5e7eb'
                                                            }}
                                                        />
                                                        <span className="text-sm text-gray-500 w-8">10</span>
                                                        <div className="w-20 text-center">
                                                            <div className={`text-3xl font-bold ${getScoreColor(value)}`}>
                                                                {value ?? '-'}
                                                            </div>
                                                            <div className="text-xs text-gray-500">/ 10</div>
                                                        </div>
                                                    </div>

                                                    {/* Star visualization */}
                                                    {value !== undefined && (
                                                        <div className="flex gap-1">
                                                            {[...Array(10)].map((_, i) => (
                                                                <Star
                                                                    key={i}
                                                                    className={`w-5 h-5 ${i < value ? 'fill-gold text-gold' : 'text-gray-300'
                                                                        }`}
                                                                />
                                                            ))}
                                                        </div>
                                                    )}
                                                </div>
                                            );
                                        })}
                                    </div>
                                </CardContent>
                            </Card>
                        ))}

                        {/* Optional Feedback */}
                        <Card>
                            <CardContent className="py-6">
                                <label className="block text-sm font-semibold text-gray-700 mb-2">
                                    Additional Anonymous Feedback (Optional)
                                </label>
                                <textarea
                                    value={feedback}
                                    onChange={(e) => setFeedback(e.target.value)}
                                    placeholder="Share any additional thoughts about your experience with this coach (optional). Your feedback is completely anonymous."
                                    rows={4}
                                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-field-green focus:outline-none focus:ring-2 focus:ring-field-green/20 resize-none"
                                />
                            </CardContent>
                        </Card>

                        {/* Privacy Notice */}
                        <div className="bg-blue-50 border-2 border-blue-200 rounded-lg p-4">
                            <p className="text-sm text-blue-900">
                                <strong>Your privacy is protected:</strong> This survey is completely anonymous.
                                We do not collect any identifying information. You may skip any question you're not comfortable answering.
                            </p>
                        </div>

                        <Button
                            type="submit"
                            variant="primary"
                            size="lg"
                            className="w-full"
                            isLoading={loading}
                        >
                            Submit Anonymous Feedback ({getAnsweredCount()} questions answered)
                        </Button>
                    </form>
                )}
            </div>
        </div>
    );
}

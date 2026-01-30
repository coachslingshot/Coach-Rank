'use client';

import React, { useState, useEffect } from 'react';
import { FileText, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { type Coach } from '@/types/database';

export default function SurveyPage() {
    const [coaches, setCoaches] = useState<Coach[]>([]);
    const [selectedCoach, setSelectedCoach] = useState('');
    const [rating, setRating] = useState(5);
    const [feedback, setFeedback] = useState('');
    const [submitted, setSubmitted] = useState(false);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        fetchCoaches();
    }, []);

    const fetchCoaches = async () => {
        try {
            const response = await fetch('/api/coaches');
            const data = await response.json();
            setCoaches(data.sort((a: Coach, b: Coach) => a.name.localeCompare(b.name)));
        } catch (error) {
            console.error('Error fetching coaches:', error);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!selectedCoach || rating < 1 || rating > 10) {
            alert('Please select a coach and provide a valid rating (1-10)');
            return;
        }

        setLoading(true);

        try {
            const response = await fetch('/api/ratings/submit', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    coach_id: selectedCoach,
                    rating,
                    anonymous_feedback: feedback || null,
                }),
            });

            if (response.ok) {
                setSubmitted(true);
                setSelectedCoach('');
                setRating(5);
                setFeedback('');
            } else {
                alert('Failed to submit rating. Please try again.');
            }
        } catch (error) {
            console.error('Error submitting rating:', error);
            alert('Failed to submit rating. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen py-16 bg-gray-50">
            <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12">
                    <div className="flex justify-center mb-6">
                        <div className="w-20 h-20 rounded-full bg-field-green flex items-center justify-center">
                            <FileText className="w-10 h-10 text-white" />
                        </div>
                    </div>
                    <h1 className="font-headline text-6xl text-gray-900 mb-4">RATE YOUR COACH</h1>
                    <p className="text-xl text-gray-600">
                        Anonymous player survey - Help us rank coaches accurately
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
                            <p className="text-gray-600 mb-6">Your anonymous rating has been submitted successfully.</p>
                            <Button onClick={() => setSubmitted(false)}>Submit Another Rating</Button>
                        </CardContent>
                    </Card>
                ) : (
                    <Card>
                        <CardContent className="py-8">
                            <form onSubmit={handleSubmit} className="space-y-6">
                                {/* Coach Selection */}
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                                        Select Coach *
                                    </label>
                                    <select
                                        value={selectedCoach}
                                        onChange={(e) => setSelectedCoach(e.target.value)}
                                        className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-field-green focus:outline-none focus:ring-2 focus:ring-field-green/20"
                                        required
                                    >
                                        <option value="">-- Choose a coach --</option>
                                        {coaches.map((coach) => (
                                            <option key={coach.id} value={coach.id}>
                                                {coach.name} - {coach.school}
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                {/* Rating */}
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                                        Overall Rating (1-10) *
                                    </label>
                                    <div className="flex items-center gap-4">
                                        <input
                                            type="range"
                                            min="1"
                                            max="10"
                                            value={rating}
                                            onChange={(e) => setRating(parseInt(e.target.value))}
                                            className="flex-1 h-3 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-field-green"
                                        />
                                        <div className="w-16 text-center">
                                            <div className="text-3xl font-bold text-field-green">{rating}</div>
                                            <div className="text-xs text-gray-500">/ 10</div>
                                        </div>
                                    </div>

                                    {/* Star visualization */}
                                    <div className="flex gap-1 mt-3">
                                        {[...Array(10)].map((_, i) => (
                                            <Star
                                                key={i}
                                                className={`w-6 h-6 ${i < rating ? 'fill-gold text-gold' : 'text-gray-300'
                                                    }`}
                                            />
                                        ))}
                                    </div>
                                </div>

                                {/* Optional Feedback */}
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                                        Anonymous Feedback (Optional)
                                    </label>
                                    <textarea
                                        value={feedback}
                                        onChange={(e) => setFeedback(e.target.value)}
                                        placeholder="Share your experience with this coach (optional). Your feedback is completely anonymous."
                                        rows={4}
                                        className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-field-green focus:outline-none focus:ring-2 focus:ring-field-green/20 resize-none"
                                    />
                                </div>

                                {/* Privacy Notice */}
                                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                                    <p className="text-sm text-blue-900">
                                        <strong>Your privacy is protected:</strong> This survey is completely anonymous.
                                        We do not collect any identifying information.
                                    </p>
                                </div>

                                <Button
                                    type="submit"
                                    variant="primary"
                                    size="lg"
                                    className="w-full"
                                    isLoading={loading}
                                >
                                    Submit Anonymous Rating
                                </Button>
                            </form>
                        </CardContent>
                    </Card>
                )}
            </div>
        </div>
    );
}

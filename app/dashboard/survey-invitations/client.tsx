'use client';

import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Copy, Mail, Check, AlertCircle } from 'lucide-react';
import { type Coach } from '@/types/database';

interface SurveyInvitation {
    id: string;
    token: string;
    player_email: string;
    coach_id: string;
    coach_name?: string;
    expires_at: string;
    used_at: string | null;
    created_at: string;
}

export default function SurveyInvitationsClient() {
    const [coaches, setCoaches] = useState<Coach[]>([]);
    const [invitations, setInvitations] = useState<SurveyInvitation[]>([]);
    const [playerEmail, setPlayerEmail] = useState('');
    const [selectedCoachId, setSelectedCoachId] = useState('');
    const [loading, setLoading] = useState(false);
    const [generatedLink, setGeneratedLink] = useState('');
    const [copied, setCopied] = useState(false);

    useEffect(() => {
        fetchCoaches();
        fetchInvitations();
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

    const fetchInvitations = async () => {
        try {
            const response = await fetch('/api/admin/survey-invitations');
            if (!response.ok) {
                console.error('Failed to fetch invitations');
                return;
            }
            const data = await response.json();
            setInvitations(data);
        } catch (error) {
            console.error('Error fetching invitations:', error);
        }
    };

    const handleGenerateLink = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!playerEmail || !selectedCoachId) {
            alert('Please enter player email and select a coach');
            return;
        }

        setLoading(true);

        try {
            const response = await fetch('/api/admin/survey-invitations/create', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    player_email: playerEmail,
                    coach_id: selectedCoachId,
                }),
            });

            if (response.ok) {
                const data = await response.json();
                setGeneratedLink(data.survey_link);
                setPlayerEmail('');
                setSelectedCoachId('');
                fetchInvitations(); // Refresh the list
            } else {
                const error = await response.json();
                alert(error.error || 'Failed to generate invitation. Please try again.');
            }
        } catch (error) {
            console.error('Error generating invitation:', error);
            alert('Failed to generate invitation. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const copyToClipboard = async (text: string) => {
        await navigator.clipboard.writeText(text);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="min-h-screen py-16 bg-gray-50">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="mb-8">
                    <h1 className="font-headline text-4xl text-gray-900 mb-2">Survey Invitations</h1>
                    <p className="text-gray-600">Generate secure survey links for players</p>
                </div>

                <div className="grid lg:grid-cols-2 gap-8">
                    {/* Generate New Invitation */}
                    <Card>
                        <CardContent className="py-6">
                            <h2 className="text-xl font-headline text-gray-900 mb-4">Generate New Invitation</h2>
                            <form onSubmit={handleGenerateLink} className="space-y-4">
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                                        Player Email *
                                    </label>
                                    <input
                                        type="email"
                                        value={playerEmail}
                                        onChange={(e) => setPlayerEmail(e.target.value)}
                                        placeholder="player@example.com"
                                        className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-field-green focus:outline-none"
                                        required
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                                        Coach to Rate *
                                    </label>
                                    <select
                                        value={selectedCoachId}
                                        onChange={(e) => setSelectedCoachId(e.target.value)}
                                        className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-field-green focus:outline-none"
                                        required
                                    >
                                        <option value="">-- Select Coach --</option>
                                        {coaches.map((coach) => (
                                            <option key={coach.id} value={coach.id}>
                                                {coach.name} - {coach.school}
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                <Button
                                    type="submit"
                                    variant="primary"
                                    className="w-full"
                                    isLoading={loading}
                                >
                                    Generate Secure Link
                                </Button>
                            </form>

                            {/* Generated Link Display */}
                            {generatedLink && (
                                <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-lg">
                                    <div className="flex items-center gap-2 mb-2">
                                        <Check className="w-5 h-5 text-green-600" />
                                        <h3 className="font-semibold text-green-900">Link Generated!</h3>
                                    </div>
                                    <div className="flex gap-2">
                                        <input
                                            type="text"
                                            value={generatedLink}
                                            readOnly
                                            className="flex-1 px-3 py-2 bg-white border border-green-300 rounded text-sm"
                                        />
                                        <Button
                                            onClick={() => copyToClipboard(generatedLink)}
                                            variant="outline"
                                            size="sm"
                                        >
                                            {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                                        </Button>
                                    </div>
                                    <p className="text-xs text-gray-600 mt-2">
                                        <Mail className="w-3 h-3 inline mr-1" />
                                        Send this link to {playerEmail}
                                    </p>
                                </div>
                            )}
                        </CardContent>
                    </Card>

                    {/* Recent Invitations */}
                    <Card>
                        <CardContent className="py-6">
                            <h2 className="text-xl font-headline text-gray-900 mb-4">Recent Invitations</h2>
                            <div className="space-y-3 max-h-[500px] overflow-y-auto">
                                {invitations.length === 0 ? (
                                    <div className="text-center py-8 text-gray-500">
                                        <AlertCircle className="w-12 h-12 mx-auto mb-2 text-gray-400" />
                                        <p>No invitations yet</p>
                                    </div>
                                ) : (
                                    invitations.map((invitation) => (
                                        <div
                                            key={invitation.id}
                                            className={`p-3 border rounded-lg ${invitation.used_at
                                                    ? 'bg-gray-50 border-gray-200'
                                                    : new Date(invitation.expires_at) < new Date()
                                                        ? 'bg-red-50 border-red-200'
                                                        : 'bg-blue-50 border-blue-200'
                                                }`}
                                        >
                                            <div className="flex justify-between items-start mb-1">
                                                <div>
                                                    <p className="font-semibold text-sm">{invitation.player_email}</p>
                                                    <p className="text-xs text-gray-600">{invitation.coach_name || 'Coach'}</p>
                                                </div>
                                                <span
                                                    className={`text-xs px-2 py-1 rounded-full ${invitation.used_at
                                                            ? 'bg-gray-200 text-gray-700'
                                                            : new Date(invitation.expires_at) < new Date()
                                                                ? 'bg-red-200 text-red-800'
                                                                : 'bg-green-200 text-green-800'
                                                        }`}
                                                >
                                                    {invitation.used_at
                                                        ? 'Used'
                                                        : new Date(invitation.expires_at) < new Date()
                                                            ? 'Expired'
                                                            : 'Active'}
                                                </span>
                                            </div>
                                            <p className="text-xs text-gray-500">
                                                {invitation.used_at
                                                    ? `Submitted ${new Date(invitation.used_at).toLocaleDateString()}`
                                                    : `Expires ${new Date(invitation.expires_at).toLocaleDateString()}`}
                                            </p>
                                        </div>
                                    ))
                                )}
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}

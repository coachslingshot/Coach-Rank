import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { randomBytes } from 'crypto';

export async function POST(request: Request) {
    try {
        const supabase = createClient();

        // Check authentication
        const { data: { session } } = await supabase.auth.getSession();
        if (!session) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const body = await request.json();
        const { player_email, coach_id } = body;

        if (!player_email || !coach_id) {
            return NextResponse.json(
                { error: 'Player email and coach ID are required' },
                { status: 400 }
            );
        }

        // Generate secure random token
        const tokenBytes = randomBytes(32);
        const token = `survey_${tokenBytes.toString('base64url')}`;

        // Set expiration to 30 days from now
        const expiresAt = new Date();
        expiresAt.setDate(expiresAt.getDate() + 30);

        // Create invitation record
        const { data: invitation, error } = await supabase
            .from('survey_invitations')
            .insert({
                token,
                player_email,
                coach_id,
                expires_at: expiresAt.toISOString(),
                created_by: session.user.id,
            })
            .select()
            .single();

        if (error) {
            console.error('Error creating invitation:', error);
            return NextResponse.json(
                { error: 'Failed to create invitation' },
                { status: 500 }
            );
        }

        // Generate survey link
        const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';
        const surveyLink = `${baseUrl}/survey?token=${token}`;

        return NextResponse.json({
            success: true,
            invitation_id: invitation.id,
            survey_link: surveyLink,
            expires_at: expiresAt.toISOString(),
        });
    } catch (error) {
        console.error('Error in create invitation endpoint:', error);
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    }
}

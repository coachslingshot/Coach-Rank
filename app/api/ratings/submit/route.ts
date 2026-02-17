import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { calculateOverallAverage, type SurveyQuestions } from '@/lib/survey-questions';

export async function POST(request: NextRequest) {
    const supabase = createClient();

    const body = await request.json();
    const { token, coach_id, responses, anonymous_feedback } = body;

    // Require token
    if (!token) {
        return NextResponse.json(
            { error: 'Survey invitation token is required' },
            { status: 401 }
        );
    }

    // Validate coach_id
    if (!coach_id) {
        return NextResponse.json(
            { error: 'Coach ID is required' },
            { status: 400 }
        );
    }

    // Validate that at least one question was answered
    const answeredCount = Object.values(responses || {}).filter((v) => v !== null && v !== undefined).length;
    if (answeredCount === 0) {
        return NextResponse.json(
            { error: 'Please answer at least one question' },
            { status: 400 }
        );
    }

    // Validate token and check if it's still valid
    const { data: invitation, error: tokenError } = await supabase
        .from('survey_invitations')
        .select('id, coach_id, expires_at, used_at')
        .eq('token', token)
        .single();

    if (tokenError || !invitation) {
        return NextResponse.json(
            { error: 'Invalid invitation token' },
            { status: 401 }
        );
    }

    // Check if already used
    if (invitation.used_at) {
        return NextResponse.json(
            { error: 'This invitation has already been used' },
            { status: 403 }
        );
    }

    // Check if expired
    const now = new Date();
    const expiresAt = new Date(invitation.expires_at);
    if (now > expiresAt) {
        return NextResponse.json(
            { error: 'This invitation has expired' },
            { status: 403 }
        );
    }

    // Verify coach_id matches invitation (if invitation specifies a coach)
    if (invitation.coach_id && invitation.coach_id !== coach_id) {
        return NextResponse.json(
            { error: 'This invitation is for a different coach' },
            { status: 403 }
        );
    }

    // Calculate overall rating from answered questions
    const rating = calculateOverallAverage(responses as SurveyQuestions);

    // Insert rating with all question responses
    const { data: ratingData, error: ratingError } = await supabase
        .from('player_ratings')
        .insert([
            {
                coach_id,
                rating: rating !== null ? Math.round(rating * 10) / 10 : null, // Round to 1 decimal
                anonymous_feedback: anonymous_feedback || null,
                // Individual question responses
                q1_belonging: responses.q1_belonging ?? null,
                q2_locker_room: responses.q2_locker_room ?? null,
                q3_trust: responses.q3_trust ?? null,
                q4_communication: responses.q4_communication ?? null,
                q5_player_development: responses.q5_player_development ?? null,
                q6_personal_growth: responses.q6_personal_growth ?? null,
                q7_daily_enjoyment: responses.q7_daily_enjoyment ?? null,
                q8_work_fun_balance: responses.q8_work_fun_balance ?? null,
                q9_overall_experience: responses.q9_overall_experience ?? null,
                q10_choose_again: responses.q10_choose_again ?? null,
            },
        ])
        .select()
        .single();

    if (ratingError) {
        console.error('Error inserting rating:', ratingError);
        return NextResponse.json({ error: ratingError.message }, { status: 500 });
    }

    // Mark invitation as used
    await supabase
        .from('survey_invitations')
        .update({ used_at: new Date().toISOString() })
        .eq('id', invitation.id);

    // Recalculate coach's average rating from all responses
    const { data: allRatings } = await supabase
        .from('player_ratings')
        .select('rating')
        .eq('coach_id', coach_id)
        .not('rating', 'is', null);

    if (allRatings && allRatings.length > 0) {
        const avgRating =
            allRatings.reduce((sum, r) => sum + (r.rating || 0), 0) / allRatings.length;

        // Update coach's avg_player_rating
        await supabase
            .from('coaches')
            .update({ avg_player_rating: Math.round(avgRating * 10) / 10 })
            .eq('id', coach_id);
    }

    return NextResponse.json(
        {
            success: true,
            message: 'Rating submitted successfully',
            questions_answered: answeredCount
        },
        { status: 201 }
    );
}

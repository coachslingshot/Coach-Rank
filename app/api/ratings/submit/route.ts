import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

export async function POST(request: NextRequest) {
    const supabase = createClient();

    const body = await request.json();
    const { coach_id, rating, anonymous_feedback } = body;

    // Validate rating
    if (!coach_id || !rating || rating < 1 || rating > 10) {
        return NextResponse.json(
            { error: 'Invalid data. Rating must be between 1-10.' },
            { status: 400 }
        );
    }

    // Insert rating
    const { data: ratingData, error: ratingError } = await supabase
        .from('player_ratings')
        .insert([
            {
                coach_id,
                rating,
                anonymous_feedback: anonymous_feedback || null,
            },
        ])
        .select()
        .single();

    if (ratingError) {
        return NextResponse.json({ error: ratingError.message }, { status: 500 });
    }

    // Recalculate coach's average rating
    const { data: allRatings } = await supabase
        .from('player_ratings')
        .select('rating')
        .eq('coach_id', coach_id);

    if (allRatings && allRatings.length > 0) {
        const avgRating =
            allRatings.reduce((sum, r) => sum + r.rating, 0) / allRatings.length;

        // Update coach's avg_player_rating
        await supabase
            .from('coaches')
            .update({ avg_player_rating: avgRating })
            .eq('id', coach_id);
    }

    return NextResponse.json(
        { success: true, message: 'Rating submitted successfully' },
        { status: 201 }
    );
}

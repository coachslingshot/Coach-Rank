import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

export async function GET() {
    try {
        const supabase = createClient();

        // Check authentication
        const { data: { session } } = await supabase.auth.getSession();
        if (!session) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        // Fetch all invitations with coach names
        const { data: invitations, error } = await supabase
            .from('survey_invitations')
            .select(`
                id,
                token,
                player_email,
                coach_id,
                coaches:coach_id (name),
                expires_at,
                used_at,
                created_at
            `)
            .order('created_at', { ascending: false })
            .limit(100);

        if (error) {
            console.error('Error fetching invitations:', error);
            return NextResponse.json(
                { error: 'Failed to fetch invitations' },
                { status: 500 }
            );
        }

        // Format response with coach names
        const formattedInvitations = invitations?.map((inv: any) => ({
            id: inv.id,
            token: inv.token,
            player_email: inv.player_email,
            coach_id: inv.coach_id,
            coach_name: inv.coaches?.name || 'Unknown Coach',
            expires_at: inv.expires_at,
            used_at: inv.used_at,
            created_at: inv.created_at,
        })) || [];

        return NextResponse.json(formattedInvitations);
    } catch (error) {
        console.error('Error in get invitations endpoint:', error);
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    }
}

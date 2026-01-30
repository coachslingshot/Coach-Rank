import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

export async function GET(request: NextRequest) {
    const supabase = createClient();
    const searchParams = request.nextUrl.searchParams;

    // Get query parameters
    const search = searchParams.get('search');
    const limit = searchParams.get('limit');
    const grade = searchParams.get('grade');
    const conference = searchParams.get('conference');

    let query = supabase
        .from('coaches')
        .select('*')
        .order('overall_score', { ascending: false });

    // Apply filters
    if (search) {
        query = query.or(`name.ilike.%${search}%,school.ilike.%${search}%`);
    }

    if (grade) {
        query = query.eq('overall_grade', grade);
    }

    if (conference) {
        query = query.eq('conference', conference);
    }

    if (limit) {
        query = query.limit(parseInt(limit, 10));
    }

    const { data, error } = await query;

    if (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json(data);
}

export async function POST(request: NextRequest) {
    const supabase = createClient();

    // Check authentication
    const { data: { session } } = await supabase.auth.getSession();

    if (!session) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();

    const { data, error } = await supabase
        .from('coaches')
        .insert([body])
        .select()
        .single();

    if (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json(data, { status: 201 });
}

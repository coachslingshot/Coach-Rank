import React from 'react';
import { redirect } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';
import SurveyInvitationsClient from './client';

export const dynamic = 'force-dynamic';

export default async function SurveyInvitationsPage() {
    const supabase = createClient();

    const { data: { session } } = await supabase.auth.getSession();

    if (!session) {
        redirect('/auth/login');
    }

    return <SurveyInvitationsClient />;
}

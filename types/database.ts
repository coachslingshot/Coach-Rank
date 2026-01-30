// Database type definitions
// These should match your Supabase schema

export type Json =
    | string
    | number
    | boolean
    | null
    | { [key: string]: Json | undefined }
    | Json[];

export interface Database {
    public: {
        Tables: {
            coaches: {
                Row: {
                    id: string;
                    name: string;
                    school: string;
                    conference: string | null;
                    years_experience: number | null;
                    image_url: string | null;
                    bio: string | null;
                    ats_percentage: number | null;
                    ats_grade: string | null;
                    nfl_placements: number | null;
                    blue_chips: number | null;
                    talent_score: number | null;
                    talent_grade: string | null;
                    retention_percentage: number | null;
                    avg_player_rating: number | null;
                    experience_score: number | null;
                    experience_grade: string | null;
                    overall_score: number | null;
                    overall_grade: string | null;
                    created_at: string;
                    updated_at: string;
                };
                Insert: {
                    id?: string;
                    name: string;
                    school: string;
                    conference?: string | null;
                    years_experience?: number | null;
                    image_url?: string | null;
                    bio?: string | null;
                    ats_percentage?: number | null;
                    ats_grade?: string | null;
                    nfl_placements?: number | null;
                    blue_chips?: number | null;
                    talent_score?: number | null;
                    talent_grade?: string | null;
                    retention_percentage?: number | null;
                    avg_player_rating?: number | null;
                    experience_score?: number | null;
                    experience_grade?: string | null;
                    overall_score?: number | null;
                    overall_grade?: string | null;
                    created_at?: string;
                    updated_at?: string;
                };
                Update: {
                    id?: string;
                    name?: string;
                    school?: string;
                    conference?: string | null;
                    years_experience?: number | null;
                    image_url?: string | null;
                    bio?: string | null;
                    ats_percentage?: number | null;
                    ats_grade?: string | null;
                    nfl_placements?: number | null;
                    blue_chips?: number | null;
                    talent_score?: number | null;
                    talent_grade?: string | null;
                    retention_percentage?: number | null;
                    avg_player_rating?: number | null;
                    experience_score?: number | null;
                    experience_grade?: string | null;
                    overall_score?: number | null;
                    overall_grade?: string | null;
                    created_at?: string;
                    updated_at?: string;
                };
            };
            ats_records: {
                Row: {
                    id: string;
                    coach_id: string;
                    season: string;
                    games: number;
                    covers: number;
                    percentage: number | null;
                    created_at: string;
                };
                Insert: {
                    id?: string;
                    coach_id: string;
                    season: string;
                    games: number;
                    covers: number;
                    percentage?: number | null;
                    created_at?: string;
                };
                Update: {
                    id?: string;
                    coach_id?: string;
                    season?: string;
                    games?: number;
                    covers?: number;
                    percentage?: number | null;
                    created_at?: string;
                };
            };
            player_ratings: {
                Row: {
                    id: string;
                    coach_id: string;
                    rating: number;
                    anonymous_feedback: string | null;
                    submitted_at: string;
                };
                Insert: {
                    id?: string;
                    coach_id: string;
                    rating: number;
                    anonymous_feedback?: string | null;
                    submitted_at?: string;
                };
                Update: {
                    id?: string;
                    coach_id?: string;
                    rating?: number;
                    anonymous_feedback?: string | null;
                    submitted_at?: string;
                };
            };
            subscriptions: {
                Row: {
                    id: string;
                    user_id: string;
                    stripe_customer_id: string | null;
                    stripe_subscription_id: string | null;
                    status: string;
                    plan: string;
                    current_period_end: string | null;
                    created_at: string;
                    updated_at: string;
                };
                Insert: {
                    id?: string;
                    user_id: string;
                    stripe_customer_id?: string | null;
                    stripe_subscription_id?: string | null;
                    status: string;
                    plan?: string;
                    current_period_end?: string | null;
                    created_at?: string;
                    updated_at?: string;
                };
                Update: {
                    id?: string;
                    user_id?: string;
                    stripe_customer_id?: string | null;
                    stripe_subscription_id?: string | null;
                    status?: string;
                    plan?: string;
                    current_period_end?: string | null;
                    created_at?: string;
                    updated_at?: string;
                };
            };
            custom_reports: {
                Row: {
                    id: string;
                    user_id: string;
                    stripe_payment_id: string | null;
                    coach_ids: Json | null;
                    parameters: Json | null;
                    status: string;
                    report_url: string | null;
                    created_at: string;
                    updated_at: string;
                };
                Insert: {
                    id?: string;
                    user_id: string;
                    stripe_payment_id?: string | null;
                    coach_ids?: Json | null;
                    parameters?: Json | null;
                    status?: string;
                    report_url?: string | null;
                    created_at?: string;
                    updated_at?: string;
                };
                Update: {
                    id?: string;
                    user_id?: string;
                    stripe_payment_id?: string | null;
                    coach_ids?: Json | null;
                    parameters?: Json | null;
                    status?: string;
                    report_url?: string | null;
                    created_at?: string;
                    updated_at?: string;
                };
            };
        };
    };
}

export type Coach = Database['public']['Tables']['coaches']['Row'];
export type ATSRecord = Database['public']['Tables']['ats_records']['Row'];
export type PlayerRating = Database['public']['Tables']['player_ratings']['Row'];
export type Subscription = Database['public']['Tables']['subscriptions']['Row'];
export type CustomReport = Database['public']['Tables']['custom_reports']['Row'];

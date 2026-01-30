-- Coach Rank Database Schema
-- Run this in your Supabase SQL editor

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Coaches table
CREATE TABLE coaches (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  school TEXT NOT NULL,
  conference TEXT,
  years_experience INTEGER DEFAULT 0,
  image_url TEXT,
  bio TEXT,
  
  -- ATS Metrics
  ats_percentage DECIMAL(5,2), -- Against the spread percentage
  ats_grade TEXT, -- A, B, C, D, F
  
  -- Talent Maximization Metrics
  nfl_placements INTEGER DEFAULT 0, -- Players who made NFL
  blue_chips INTEGER DEFAULT 0, -- 4/5 star recruits
  talent_score DECIMAL(5,2),
  talent_grade TEXT,
  
  -- Experience Metrics
  retention_percentage DECIMAL(5,2),
  avg_player_rating DECIMAL(3,2), -- Average 1-10 rating
  experience_score DECIMAL(5,2),
  experience_grade TEXT,
  
  -- Overall Score
  overall_score DECIMAL(5,2),
  overall_grade TEXT, -- Final composite grade
  
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ATS Records (historical data)
CREATE TABLE ats_records (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  coach_id UUID REFERENCES coaches(id) ON DELETE CASCADE,
  season TEXT NOT NULL, -- e.g., "2023-2024"
  games INTEGER NOT NULL,
  covers INTEGER NOT NULL,
  percentage DECIMAL(5,2),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Player Ratings (anonymous)
CREATE TABLE player_ratings (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  coach_id UUID REFERENCES coaches(id) ON DELETE CASCADE,
  rating INTEGER CHECK (rating >= 1 AND rating <= 10),
  anonymous_feedback TEXT,
  submitted_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Subscriptions
CREATE TABLE subscriptions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  stripe_customer_id TEXT UNIQUE,
  stripe_subscription_id TEXT UNIQUE,
  status TEXT NOT NULL, -- active, canceled, past_due, trialing
  plan TEXT NOT NULL DEFAULT 'premium', -- premium
  current_period_end TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Custom Reports
CREATE TABLE custom_reports (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  stripe_payment_id TEXT,
  coach_ids JSONB, -- Array of coach IDs to compare
  parameters JSONB, -- Custom comparison parameters
  status TEXT NOT NULL DEFAULT 'pending', -- pending, processing, completed, delivered
  report_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for performance
CREATE INDEX idx_coaches_overall_score ON coaches(overall_score DESC);
CREATE INDEX idx_coaches_school ON coaches(school);
CREATE INDEX idx_coaches_conference ON coaches(conference);
CREATE INDEX idx_ats_records_coach_id ON ats_records(coach_id);
CREATE INDEX idx_player_ratings_coach_id ON player_ratings(coach_id);
CREATE INDEX idx_subscriptions_user_id ON subscriptions(user_id);
CREATE INDEX idx_subscriptions_stripe_customer ON subscriptions(stripe_customer_id);

-- Row Level Security (RLS) Policies

-- Enable RLS
ALTER TABLE coaches ENABLE ROW LEVEL SECURITY;
ALTER TABLE ats_records ENABLE ROW LEVEL SECURITY;
ALTER TABLE player_ratings ENABLE ROW LEVEL SECURITY;
ALTER TABLE subscriptions ENABLE ROW LEVEL SECURITY;
ALTER TABLE custom_reports ENABLE ROW LEVEL SECURITY;

-- Coaches: Public read, authenticated write
CREATE POLICY "Coaches are viewable by everyone" ON coaches
  FOR SELECT USING (true);

CREATE POLICY "Authenticated users can insert coaches" ON coaches
  FOR INSERT WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can update coaches" ON coaches
  FOR UPDATE USING (auth.role() = 'authenticated');

-- ATS Records: Public read, authenticated write
CREATE POLICY "ATS records are viewable by everyone" ON ats_records
  FOR SELECT USING (true);

CREATE POLICY "Authenticated users can insert ATS records" ON ats_records
  FOR INSERT WITH CHECK (auth.role() = 'authenticated');

-- Player Ratings: Public insert (anonymous), no read
CREATE POLICY "Anyone can submit player ratings" ON player_ratings
  FOR INSERT WITH CHECK (true);

-- Subscriptions: Users can only see their own
CREATE POLICY "Users can view own subscriptions" ON subscriptions
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own subscriptions" ON subscriptions
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own subscriptions" ON subscriptions
  FOR UPDATE USING (auth.uid() = user_id);

-- Custom Reports: Users can only see their own
CREATE POLICY "Users can view own custom reports" ON custom_reports
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can create own custom reports" ON custom_reports
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Create triggers for updated_at
CREATE TRIGGER update_coaches_updated_at BEFORE UPDATE ON coaches
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_subscriptions_updated_at BEFORE UPDATE ON subscriptions
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_custom_reports_updated_at BEFORE UPDATE ON custom_reports
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

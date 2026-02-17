-- Add 10 detailed question columns to player_ratings table
-- Questions are grouped into 5 categories for coach profile display

-- Category 1: Culture & Belonging (Q1-Q2)
ALTER TABLE player_ratings
  ADD COLUMN IF NOT EXISTS q1_belonging INTEGER CHECK (q1_belonging IS NULL OR (q1_belonging >= 0 AND q1_belonging <= 10)),
  ADD COLUMN IF NOT EXISTS q2_locker_room INTEGER CHECK (q2_locker_room IS NULL OR (q2_locker_room >= 0 AND q2_locker_room <= 10));

-- Category 2: Trust & Relationships (Q3-Q4)
ALTER TABLE player_ratings
  ADD COLUMN IF NOT EXISTS q3_trust INTEGER CHECK (q3_trust IS NULL OR (q3_trust >= 0 AND q3_trust <= 10)),
  ADD COLUMN IF NOT EXISTS q4_communication INTEGER CHECK (q4_communication IS NULL OR (q4_communication >= 0 AND q4_communication <= 10));

-- Category 3: Development & Purpose (Q5-Q6)
ALTER TABLE player_ratings
  ADD COLUMN IF NOT EXISTS q5_player_development INTEGER CHECK (q5_player_development IS NULL OR (q5_player_development >= 0 AND q5_player_development <= 10)),
  ADD COLUMN IF NOT EXISTS q6_personal_growth INTEGER CHECK (q6_personal_growth IS NULL OR (q6_personal_growth >= 0 AND q6_personal_growth <= 10));

-- Category 4: Day-to-Day Experience (Q7-Q8)
ALTER TABLE player_ratings
  ADD COLUMN IF NOT EXISTS q7_daily_enjoyment INTEGER CHECK (q7_daily_enjoyment IS NULL OR (q7_daily_enjoyment >= 0 AND q7_daily_enjoyment <= 10)),
  ADD COLUMN IF NOT EXISTS q8_work_fun_balance INTEGER CHECK (q8_work_fun_balance IS NULL OR (q8_work_fun_balance >= 0 AND q8_work_fun_balance <= 10));

-- Category 5: Overall & Future Choice (Q9-Q10)
ALTER TABLE player_ratings
  ADD COLUMN IF NOT EXISTS q9_overall_experience INTEGER CHECK (q9_overall_experience IS NULL OR (q9_overall_experience >= 0 AND q9_overall_experience <= 10)),
  ADD COLUMN IF NOT EXISTS q10_choose_again INTEGER CHECK (q10_choose_again IS NULL OR (q10_choose_again >= 0 AND q10_choose_again <= 10));

-- Add comments explaining the category structure
COMMENT ON COLUMN player_ratings.q1_belonging IS 'Category: Culture & Belonging - How strongly did you feel like you truly belonged';
COMMENT ON COLUMN player_ratings.q2_locker_room IS 'Category: Culture & Belonging - Positive, respectful locker room environment';
COMMENT ON COLUMN player_ratings.q3_trust IS 'Category: Trust & Relationships - Trust in coach having best interests in mind';
COMMENT ON COLUMN player_ratings.q4_communication IS 'Category: Trust & Relationships - Comfort being honest about struggles';
COMMENT ON COLUMN player_ratings.q5_player_development IS 'Category: Development & Purpose - Growth as a player (technique, IQ)';
COMMENT ON COLUMN player_ratings.q6_personal_growth IS 'Category: Development & Purpose - Growth as a person (character, life skills)';
COMMENT ON COLUMN player_ratings.q7_daily_enjoyment IS 'Category: Day-to-Day Experience - Enjoyment coming to workouts and practice';
COMMENT ON COLUMN player_ratings.q8_work_fun_balance IS 'Category: Day-to-Day Experience - Balance of hard work and keeping football fun';
COMMENT ON COLUMN player_ratings.q9_overall_experience IS 'Category: Overall Experience - Overall experience (separate from record)';
COMMENT ON COLUMN player_ratings.q10_choose_again IS 'Category: Future Choice Signal - Likelihood to choose this coach again';

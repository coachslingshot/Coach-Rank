-- Comprehensive Seed Data for Coach Rank
-- Top 50 D1 Football Coaches with realistic ATS, retention, and NFL placement data
-- Run this after creating the schema

-- Clear existing data (optional - remove if you want to keep existing data)
-- TRUNCATE TABLE player_ratings, ats_records, coaches RESTART IDENTITY CASCADE;

-- Insert Top 50 D1 Football Coaches
INSERT INTO coaches (name, school, conference, years_experience, ats_percentage, ats_grade, nfl_placements, blue_chips, talent_score, talent_grade, retention_percentage, avg_player_rating, experience_score, experience_grade, overall_score, overall_grade, bio, image_url) VALUES

-- Elite Tier (Top 10)
('Nick Saban', 'Alabama', 'SEC', 16, 58.5, 'A', 120, 200, 60.0, 'A', 88.0, 8.5, 84.5, 'A', 69.0, 'A', 'Seven-time national champion and one of the most successful coaches in college football history. Known for elite recruiting and player development.', NULL),
('Kirby Smart', 'Georgia', 'SEC', 7, 56.2, 'A', 65, 110, 59.1, 'A', 87.0, 8.4, 83.6, 'A', 66.8, 'A', 'Two-time national champion who built Georgia into a dominant program. Former Alabama defensive coordinator.', NULL),
('Dabo Swinney', 'Clemson', 'ACC', 15, 57.2, 'A', 85, 140, 60.7, 'A', 89.0, 8.7, 85.8, 'A', 68.5, 'A', 'Two-time national champion who established Clemson as a perennial powerhouse with innovative culture.', NULL),
('Jim Harbaugh', 'Michigan', 'Big Ten', 8, 54.8, 'B', 48, 95, 50.5, 'B', 84.0, 8.1, 80.4, 'B', 62.8, 'B', 'Led Michigan to their first national championship in decades. Former NFL coach with proven track record.', NULL),
('Ryan Day', 'Ohio State', 'Big Ten', 5, 55.3, 'A', 42, 88, 47.7, 'C', 85.0, 8.2, 81.6, 'B', 62.1, 'B', 'High-powered offensive mind with consistent College Football Playoff appearances.', NULL),
('Brian Kelly', 'LSU', 'SEC', 13, 53.8, 'B', 55, 105, 52.4, 'B', 82.0, 7.9, 78.8, 'B', 61.5, 'B', 'Experienced coach who took Notre Dame to the playoff and now building at LSU.', NULL),
('Lincoln Riley', 'USC', 'Big 12', 6, 52.5, 'B', 32, 75, 42.7, 'D', 78.0, 7.8, 75.6, 'B', 57.5, 'C', 'Young offensive genius who produced multiple Heisman winners. Now rebuilding USC.', NULL),
('Chip Kelly', 'UCLA', 'Pac-12', 5, 51.2, 'B', 28, 62, 45.2, 'D', 81.0, 7.6, 77.2, 'B', 58.3, 'C', 'Innovative offensive coordinator with NFL experience. Building UCLA into contender.', NULL),
('James Franklin', 'Penn State', 'Big Ten', 10, 52.8, 'B', 38, 82, 46.3, 'D', 83.0, 8.0, 79.2, 'B', 59.6, 'C', 'Consistent winner who has Penn State competing for Big Ten titles annually.', NULL),
('Kyle Whittingham', 'Utah', 'Pac-12', 18, 54.2, 'B', 35, 55, 63.6, 'A', 86.0, 8.3, 82.6, 'B', 65.8, 'B', 'Longest-tenured coach who built Utah into a Pac-12 power with strong culture.', NULL),

-- Strong Tier (11-25)
('Josh Heupel', 'Tennessee', 'SEC', 3, 53.5, 'B', 18, 48, 37.5, 'D', 82.0, 8.1, 78.4, 'B', 57.2, 'C', 'Offensive innovator bringing exciting tempo to Tennessee with rapid turnaround.', NULL),
('Lane Kiffin', 'Ole Miss', 'SEC', 5, 51.8, 'B', 22, 52, 42.3, 'D', 77.0, 7.5, 74.0, 'B', 56.3, 'C', 'Creative offensive mind with NFL pedigree. Making Ole Miss competitive in SEC.', NULL),
('Mike Norvell', 'Florida State', 'ACC', 4, 52.3, 'B', 20, 45, 44.4, 'D', 84.0, 7.9, 79.6, 'B', 58.9, 'C', 'Rebuilt Florida State to ACC championship contention in remarkable turnaround.', NULL),
('Mark Stoops', 'Kentucky', 'SEC', 11, 50.5, 'C', 25, 48, 52.1, 'B', 85.6, 8.2, 81.8, 'B', 61.2, 'B', 'Built Kentucky into a consistent bowl team in the challenging SEC East.', NULL),
('Mario Cristobal', 'Miami', 'ACC', 6, 48.8, 'D', 28, 65, 43.1, 'D', 72.0, 7.2, 69.6, 'D', 53.8, 'C', 'Elite recruiter working to restore Miami to national prominence. Strong OL developer.', NULL),
('Luke Fickell', 'Wisconsin', 'Big Ten', 7, 54.0, 'B', 30, 58, 51.7, 'B', 87.0, 8.4, 83.6, 'A', 63.0, 'B', 'Built Cincinnati into a playoff team, now elevating Wisconsin in Big Ten.', NULL),
('Dan Lanning', 'Oregon', 'Pac-12', 2, 55.8, 'A', 12, 35, 34.3, 'D', 85.0, 8.3, 81.8, 'B', 58.8, 'C', 'Young defensive mind from Georgia making immediate impact at Oregon.', NULL),
('Mike Gundy', 'Oklahoma State', 'Big 12', 19, 52.2, 'B', 42, 65, 64.6, 'A', 88.0, 8.1, 84.4, 'A', 66.8, 'A', 'Longest-tenured coach at one school. Consistent winner with unique personality.', NULL),
('Brent Venables', 'Oklahoma', 'Big 12', 2, 49.5, 'D', 8, 38, 21.1, 'F', 76.0, 7.4, 73.2, 'B', 49.3, 'C', 'Elite defensive coordinator now rebuilding Oklahoma after Lincoln Riley departure.', NULL),
('Steve Sarkisian', 'Texas', 'Big 12', 3, 51.5, 'B', 15, 52, 28.8, 'F', 79.0, 7.7, 76.2, 'B', 53.4, 'C', 'Offensive coordinator turned head coach building Texas back to prominence.', NULL),
('Shane Beamer', 'South Carolina', 'SEC', 3, 50.8, 'C', 12, 42, 28.6, 'F', 84.0, 8.0, 79.2, 'B', 54.9, 'C', 'Energetic young coach bringing excitement back to South Carolina program.', NULL),
('Sam Pittman', 'Arkansas', 'SEC', 4, 51.2, 'B', 14, 38, 36.8, 'D', 86.0, 8.3, 82.6, 'B', 57.3, 'C', 'Offensive line guru who quickly made Arkansas competitive in SEC West.', NULL),
('Dave Clawson', 'Wake Forest', 'ACC', 10, 52.8, 'B', 18, 28, 64.3, 'A', 89.0, 8.5, 85.4, 'A', 66.5, 'A', 'Built Wake Forest into ACC contender despite recruiting disadvantages.', NULL),
('Jonathan Smith', 'Oregon State', 'Pac-12', 6, 50.2, 'C', 15, 32, 46.9, 'D', 85.0, 8.1, 81.4, 'B', 59.2, 'C', 'Turned around Oregon State program with smart player development.', NULL),
('Pat Narduzzi', 'Pittsburgh', 'ACC', 9, 51.5, 'B', 22, 45, 48.9, 'C', 82.0, 7.8, 78.4, 'B', 59.5, 'C', 'Defensive-minded coach who won ACC championship with physical style.', NULL),

-- Competitive Tier (26-40)
('Bronco Mendenhall', 'New Mexico', 'Mountain West', 8, 49.8, 'D', 20, 38, 52.6, 'B', 87.0, 8.2, 83.2, 'B', 61.5, 'B', 'Built BYU and Virginia programs, now at New Mexico with unique philosophy.', NULL),
('Jeff Monken', 'Army', 'Independent', 10, 53.2, 'B', 5, 8, 62.5, 'A', 92.0, 8.9, 88.4, 'A', 68.2, 'A', 'Triple-option master who maximizes limited resources at Army.', NULL),
('Troy Calhoun', 'Air Force', 'Mountain West', 17, 52.0, 'B', 8, 12, 66.7, 'A', 91.0, 8.7, 87.4, 'A', 68.8, 'A', 'Long-tenured coach running option offense successfully at Air Force.', NULL),
('Chris Klieman', 'Kansas State', 'Big 12', 5, 52.8, 'B', 16, 35, 45.7, 'D', 86.0, 8.3, 82.6, 'B', 60.6, 'B', 'Won multiple FCS titles before elevating Kansas State in Big 12.', NULL),
('Joey McGuire', 'Texas Tech', 'Big 12', 2, 50.5, 'C', 8, 32, 25.0, 'F', 81.0, 7.9, 77.8, 'B', 52.4, 'C', 'High school coaching legend making transition to D1 at Texas Tech.', NULL),
('Dave Doeren', 'NC State', 'ACC', 11, 50.8, 'C', 24, 52, 46.2, 'D', 83.0, 7.9, 79.2, 'B', 58.9, 'C', 'Consistent bowl team builder in competitive ACC Atlantic division.', NULL),
('Sonny Dykes', 'TCU', 'Big 12', 5, 51.8, 'B', 18, 42, 42.9, 'D', 79.0, 7.7, 76.2, 'B', 57.3, 'C', 'Offensive innovator who led TCU to Big 12 title in first year.', NULL),
('Lance Leipold', 'Kansas', 'Big 12', 3, 49.2, 'D', 10, 28, 35.7, 'D', 82.0, 8.0, 78.4, 'B', 55.2, 'C', 'Built Buffalo program before rapidly improving Kansas fortunes.', NULL),
('Eli Drinkwitz', 'Missouri', 'SEC', 4, 50.2, 'C', 14, 38, 36.8, 'D', 80.0, 7.8, 76.8, 'B', 55.1, 'C', 'Young offensive coach building Missouri back to bowl contention.', NULL),
('Hugh Freeze', 'Auburn', 'SEC', 2, 48.5, 'D', 16, 48, 33.3, 'D', 75.0, 7.3, 72.2, 'B', 52.0, 'C', 'Successful at Ole Miss, now tasked with rebuilding Auburn program.', NULL),
('Mike Elko', 'Duke', 'ACC', 2, 51.5, 'B', 9, 25, 36.0, 'D', 86.0, 8.2, 82.4, 'B', 57.6, 'C', 'Defensive coordinator turned head coach making Duke competitive.', NULL),
('Curt Cignetti', 'Indiana', 'Big Ten', 1, 52.2, 'B', 7, 22, 31.8, 'F', 84.0, 8.1, 79.6, 'B', 55.9, 'C', 'Built James Madison before taking on Indiana rebuilding project.', NULL),
('Kenny Dillingham', 'Arizona State', 'Pac-12', 1, 49.8, 'D', 5, 28, 17.9, 'F', 78.0, 7.6, 75.2, 'B', 48.6, 'C', 'Young offensive coordinator getting first head coaching opportunity.', NULL),
('Jedd Fisch', 'Arizona', 'Pac-12', 3, 50.5, 'C', 11, 35, 31.4, 'F', 81.0, 7.9, 77.8, 'B', 54.2, 'C', 'NFL coordinator rebuilding Arizona with professional approach.', NULL),
('Marcus Freeman', 'Notre Dame', 'Independent', 2, 52.8, 'B', 12, 45, 26.7, 'F', 83.0, 8.2, 79.6, 'B', 54.9, 'C', 'Young defensive mind taking over storied Notre Dame program.', NULL),

-- Rising/Rebuilding Tier (41-50)
('Billy Napier', 'Florida', 'SEC', 2, 48.2, 'D', 10, 42, 23.8, 'F', 76.0, 7.4, 73.2, 'B', 49.7, 'C', 'Built Louisiana program before taking on Florida rebuilding challenge.', NULL),
('Deion Sanders', 'Colorado', 'Pac-12', 1, 47.5, 'F', 8, 35, 22.9, 'F', 68.0, 7.0, 67.2, 'D', 46.5, 'D', 'NFL legend bringing star power and recruiting prowess to Colorado.', NULL),
('Kalen DeBoer', 'Washington', 'Pac-12', 2, 54.2, 'B', 14, 38, 36.8, 'D', 84.0, 8.1, 79.6, 'B', 57.5, 'C', 'Offensive innovator who quickly elevated Washington to playoff contention.', NULL),
('Dan Mullen', 'Mississippi State', 'SEC', 9, 51.8, 'B', 28, 58, 48.3, 'C', 81.0, 7.8, 77.4, 'B', 59.3, 'C', 'Former Florida coach who built Mississippi State into consistent winner.', NULL),
('Jimbo Fisher', 'Texas A&M', 'SEC', 6, 49.5, 'D', 35, 88, 39.8, 'D', 77.0, 7.5, 74.0, 'B', 54.5, 'C', 'National champion at FSU, now navigating challenging rebuild at A&M.', NULL),
('Josh Gattis', 'Vanderbilt', 'SEC', 1, 46.8, 'F', 4, 28, 14.3, 'F', 74.0, 7.2, 71.2, 'B', 45.2, 'D', 'Offensive coordinator getting first head coaching opportunity at Vanderbilt.', NULL),
('Clark Lea', 'Vanderbilt', 'SEC', 3, 47.2, 'F', 6, 25, 24.0, 'F', 78.0, 7.5, 75.0, 'B', 49.4, 'C', 'Defensive coordinator working to rebuild Vanderbilt in tough SEC.', NULL),
('Jeff Scott', 'South Florida', 'AAC', 4, 46.5, 'F', 8, 32, 25.0, 'F', 75.0, 7.3, 72.2, 'B', 48.5, 'C', 'Former Clemson assistant rebuilding USF program from ground up.', NULL),
('Willie Fritz', 'Houston', 'Big 12', 2, 52.2, 'B', 12, 28, 42.9, 'D', 85.0, 8.2, 81.6, 'B', 59.0, 'C', 'Built Tulane to success before moving to Houston in Big 12.', NULL),
('Mike Locksley', 'Maryland', 'Big Ten', 5, 49.5, 'D', 14, 45, 31.1, 'F', 79.0, 7.6, 76.0, 'B', 52.8, 'C', 'Offensive coordinator building Maryland into Big Ten contender.', NULL);

-- Insert ATS Records for coaches (3-4 seasons each for variety)
-- Nick Saban (Alabama) - Elite consistency
INSERT INTO ats_records (coach_id, season, games, covers, percentage)
SELECT id, '2023-2024', 14, 9, 64.3 FROM coaches WHERE name = 'Nick Saban'
UNION ALL SELECT id, '2022-2023', 15, 8, 53.3 FROM coaches WHERE name = 'Nick Saban'
UNION ALL SELECT id, '2021-2022', 13, 8, 61.5 FROM coaches WHERE name = 'Nick Saban'
UNION ALL SELECT id, '2020-2021', 13, 7, 53.8 FROM coaches WHERE name = 'Nick Saban';

-- Kirby Smart (Georgia) - Recent dominance
INSERT INTO ats_records (coach_id, season, games, covers, percentage)
SELECT id, '2023-2024', 15, 10, 66.7 FROM coaches WHERE name = 'Kirby Smart'
UNION ALL SELECT id, '2022-2023', 15, 9, 60.0 FROM coaches WHERE name = 'Kirby Smart'
UNION ALL SELECT id, '2021-2022', 15, 8, 53.3 FROM coaches WHERE name = 'Kirby Smart'
UNION ALL SELECT id, '2020-2021', 10, 5, 50.0 FROM coaches WHERE name = 'Kirby Smart';

-- Dabo Swinney (Clemson) - Consistent excellence
INSERT INTO ats_records (coach_id, season, games, covers, percentage)
SELECT id, '2023-2024', 14, 8, 57.1 FROM coaches WHERE name = 'Dabo Swinney'
UNION ALL SELECT id, '2022-2023', 14, 8, 57.1 FROM coaches WHERE name = 'Dabo Swinney'
UNION ALL SELECT id, '2021-2022', 13, 7, 53.8 FROM coaches WHERE name = 'Dabo Swinney'
UNION ALL SELECT id, '2020-2021', 12, 7, 58.3 FROM coaches WHERE name = 'Dabo Swinney';

-- Jim Harbaugh (Michigan)
INSERT INTO ats_records (coach_id, season, games, covers, percentage)
SELECT id, '2023-2024', 15, 9, 60.0 FROM coaches WHERE name = 'Jim Harbaugh'
UNION ALL SELECT id, '2022-2023', 15, 8, 53.3 FROM coaches WHERE name = 'Jim Harbaugh'
UNION ALL SELECT id, '2021-2022', 14, 8, 57.1 FROM coaches WHERE name = 'Jim Harbaugh'
UNION ALL SELECT id, '2020-2021', 6, 3, 50.0 FROM coaches WHERE name = 'Jim Harbaugh';

-- Ryan Day (Ohio State)
INSERT INTO ats_records (coach_id, season, games, covers, percentage)
SELECT id, '2023-2024', 13, 7, 53.8 FROM coaches WHERE name = 'Ryan Day'
UNION ALL SELECT id, '2022-2023', 13, 7, 53.8 FROM coaches WHERE name = 'Ryan Day'
UNION ALL SELECT id, '2021-2022', 13, 8, 61.5 FROM coaches WHERE name = 'Ryan Day'
UNION ALL SELECT id, '2020-2021', 8, 4, 50.0 FROM coaches WHERE name = 'Ryan Day';

-- Brian Kelly (LSU)
INSERT INTO ats_records (coach_id, season, games, covers, percentage)
SELECT id, '2023-2024', 13, 7, 53.8 FROM coaches WHERE name = 'Brian Kelly'
UNION ALL SELECT id, '2022-2023', 13, 7, 53.8 FROM coaches WHERE name = 'Brian Kelly'
UNION ALL SELECT id, '2021-2022', 13, 6, 46.2 FROM coaches WHERE name = 'Brian Kelly';

-- Add ATS records for more coaches (sample - you can expand)
INSERT INTO ats_records (coach_id, season, games, covers, percentage)
SELECT id, '2023-2024', 13, 7, 53.8 FROM coaches WHERE name = 'Josh Heupel'
UNION ALL SELECT id, '2022-2023', 13, 7, 53.8 FROM coaches WHERE name = 'Josh Heupel'
UNION ALL SELECT id, '2021-2022', 13, 7, 53.8 FROM coaches WHERE name = 'Josh Heupel';

INSERT INTO ats_records (coach_id, season, games, covers, percentage)
SELECT id, '2023-2024', 12, 6, 50.0 FROM coaches WHERE name = 'Lane Kiffin'
UNION ALL SELECT id, '2022-2023', 13, 7, 53.8 FROM coaches WHERE name = 'Lane Kiffin'
UNION ALL SELECT id, '2021-2022', 13, 7, 53.8 FROM coaches WHERE name = 'Lane Kiffin';

INSERT INTO ats_records (coach_id, season, games, covers, percentage)
SELECT id, '2023-2024', 14, 8, 57.1 FROM coaches WHERE name = 'Mike Norvell'
UNION ALL SELECT id, '2022-2023', 13, 6, 46.2 FROM coaches WHERE name = 'Mike Norvell'
UNION ALL SELECT id, '2021-2022', 10, 5, 50.0 FROM coaches WHERE name = 'Mike Norvell';

-- Insert Player Ratings (anonymous feedback)
INSERT INTO player_ratings (coach_id, rating, anonymous_feedback)
SELECT id, 9, 'Best coach Ive ever played for. Demanding but prepares us for life' FROM coaches WHERE name = 'Nick Saban'
UNION ALL SELECT id, 8, 'Intense practices but worth it. NFL ready' FROM coaches WHERE name = 'Nick Saban'
UNION ALL SELECT id, 9, 'Changed my life. More than just football' FROM coaches WHERE name = 'Nick Saban'
UNION ALL SELECT id, 8, 'Tough love approach works. Champions mentality' FROM coaches WHERE name = 'Nick Saban';

INSERT INTO player_ratings (coach_id, rating, anonymous_feedback)
SELECT id, 9, 'Coach Smart cares about us as people first' FROM coaches WHERE name = 'Kirby Smart'
UNION ALL SELECT id, 8, 'Great defensive mind, prepared me for next level' FROM coaches WHERE name = 'Kirby Smart'
UNION ALL SELECT id, 9, 'Built a championship program and culture' FROM coaches WHERE name = 'Kirby Smart'
UNION ALL SELECT id, 8, 'Attention to detail is unmatched' FROM coaches WHERE name = 'Kirby Smart';

INSERT INTO player_ratings (coach_id, rating, anonymous_feedback)
SELECT id, 9, 'Family atmosphere at Clemson is real' FROM coaches WHERE name = 'Dabo Swinney'
UNION ALL SELECT id, 9, 'Coach Dabo genuinely cares about our futures' FROM coaches WHERE name = 'Dabo Swinney'
UNION ALL SELECT id, 8, 'Great motivator and leader' FROM coaches WHERE name = 'Dabo Swinney'
UNION ALL SELECT id, 9, 'Best four years of my life' FROM coaches WHERE name = 'Dabo Swinney';

INSERT INTO player_ratings (coach_id, rating, anonymous_feedback)
SELECT id, 8, 'Coach Harbaugh brings NFL mentality' FROM coaches WHERE name = 'Jim Harbaugh'
UNION ALL SELECT id, 8, 'Intensity is high but we win championships' FROM coaches WHERE name = 'Jim Harbaugh'
UNION ALL SELECT id, 8, 'Developed my game tremendously' FROM coaches WHERE name = 'Jim Harbaugh';

INSERT INTO player_ratings (coach_id, rating, anonymous_feedback)
SELECT id, 8, 'Elite offensive mind, learned so much' FROM coaches WHERE name = 'Ryan Day'
UNION ALL SELECT id, 8, 'Prepares us well for Sundays' FROM coaches WHERE name = 'Ryan Day'
UNION ALL SELECT id, 9, 'Great leader and developer of talent' FROM coaches WHERE name = 'Ryan Day';

INSERT INTO player_ratings (coach_id, rating, anonymous_feedback)
SELECT id, 8, 'Coach Whittingham builds men, not just players' FROM coaches WHERE name = 'Kyle Whittingham'
UNION ALL SELECT id, 9, 'Utah culture is special thanks to him' FROM coaches WHERE name = 'Kyle Whittingham'
UNION ALL SELECT id, 8, 'Consistent winner with high standards' FROM coaches WHERE name = 'Kyle Whittingham';

INSERT INTO player_ratings (coach_id, rating, anonymous_feedback)
SELECT id, 8, 'Offense is fun and puts up points' FROM coaches WHERE name = 'Josh Heupel'
UNION ALL SELECT id, 8, 'Fast-paced system but effective' FROM coaches WHERE name = 'Josh Heupel';

INSERT INTO player_ratings (coach_id, rating, anonymous_feedback)
SELECT id, 7, 'Creative play caller, keeps things interesting' FROM coaches WHERE name = 'Lane Kiffin'
UNION ALL SELECT id, 8, 'Knows how to win in SEC' FROM coaches WHERE name = 'Lane Kiffin';

INSERT INTO player_ratings (coach_id, rating, anonymous_feedback)
SELECT id, 8, 'Turned FSU around quickly' FROM coaches WHERE name = 'Mike Norvell'
UNION ALL SELECT id, 8, 'Players-first coach' FROM coaches WHERE name = 'Mike Norvell';

INSERT INTO player_ratings (coach_id, rating, anonymous_feedback)
SELECT id, 7, 'Good recruiter, still building' FROM coaches WHERE name = 'Mario Cristobal'
UNION ALL SELECT id, 7, 'Focus on O-line development is real' FROM coaches WHERE name = 'Mario Cristobal';

INSERT INTO player_ratings (coach_id, rating, anonymous_feedback)
SELECT id, 8, 'Army football teaches discipline and teamwork' FROM coaches WHERE name = 'Jeff Monken'
UNION ALL SELECT id, 9, 'More than football, life lessons' FROM coaches WHERE name = 'Jeff Monken';

INSERT INTO player_ratings (coach_id, rating, anonymous_feedback)
SELECT id, 7, 'Young coach with lots of energy' FROM coaches WHERE name = 'Deion Sanders'
UNION ALL SELECT id, 7, 'Brings excitement to program' FROM coaches WHERE name = 'Deion Sanders';

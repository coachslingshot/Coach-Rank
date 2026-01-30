/**
 * Talent Maximization Calculator
 * 
 * Metric: NFL placements / Blue-chip recruits
 * Measures how well a coach develops talent
 * 
 * Weight: 35% of overall score
 */

export interface TalentData {
    nflPlacements: number;
    blueChips: number;
}

export function calculateTalentRatio(data: TalentData): number {
    if (data.blueChips === 0) return 0;
    return data.nflPlacements / data.blueChips;
}

export function getTalentScore(ratio: number): number {
    // Normalize ratio to 0-100 scale
    // Elite coaches get 50%+ of blue chips to NFL (0.5 ratio)
    // Good threshold: 0.3 ratio
    // Convert to 0-100 scale where 0.5+ ratio = 100

    if (ratio >= 0.5) return 100;
    if (ratio <= 0) return 0;

    // Linear scale: 0 to 0.5 maps to 0 to 100
    return (ratio / 0.5) * 100;
}

export function getTalentGrade(score: number): string {
    if (score >= 85) return 'A';
    if (score >= 70) return 'B';
    if (score >= 55) return 'C';
    if (score >= 40) return 'D';
    return 'F';
}

export function calculateTalentMetrics(data: TalentData): {
    ratio: number;
    score: number;
    grade: string;
} {
    const ratio = calculateTalentRatio(data);
    const score = getTalentScore(ratio);
    const grade = getTalentGrade(score);

    return { ratio, score, grade };
}

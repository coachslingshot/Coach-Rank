/**
 * Experience Score Calculator
 * 
 * Combines:
 * - Player retention % (60% weight)
 * - Anonymous player ratings 1-10 (40% weight)
 * 
 * Weight: 25% of overall score
 */

export interface ExperienceData {
    retentionPercentage: number; // 0-100
    avgPlayerRating: number; // 1-10 scale
}

export function calculateExperienceScore(data: ExperienceData): number {
    // Retention: convert 0-100% to 0-100 scale (already there)
    const retentionScore = data.retentionPercentage;

    // Player rating: convert 1-10 to 0-100 scale
    // 10 = 100, 1 = 0
    const ratingScore = ((data.avgPlayerRating - 1) / 9) * 100;

    // Weighted average: 60% retention, 40% rating
    return (retentionScore * 0.6) + (ratingScore * 0.4);
}

export function getExperienceGrade(score: number): string {
    if (score >= 85) return 'A';
    if (score >= 70) return 'B';
    if (score >= 55) return 'C';
    if (score >= 40) return 'D';
    return 'F';
}

export function calculateExperienceMetrics(data: ExperienceData): {
    score: number;
    grade: string;
} {
    const score = calculateExperienceScore(data);
    const grade = getExperienceGrade(score);

    return { score, grade };
}

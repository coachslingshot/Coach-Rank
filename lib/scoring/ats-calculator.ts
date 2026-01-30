/**
 * ATS (Against The Spread) Scoring Calculator
 * 
 * Grading Scale:
 * - A: 55%+ covers
 * - B: 52-54.9%
 * - C: 50-51.9%
 * - D: 48-49.9%
 * - F: <48%
 * 
 * Weight: 40% of overall score
 */

export interface ATSData {
    covers: number;
    games: number;
}

export function calculateATSPercentage(data: ATSData): number {
    if (data.games === 0) return 0;
    return (data.covers / data.games) * 100;
}

export function getATSGrade(percentage: number): string {
    if (percentage >= 55) return 'A';
    if (percentage >= 52) return 'B';
    if (percentage >= 50) return 'C';
    if (percentage >= 48) return 'D';
    return 'F';
}

export function getATSScore(percentage: number): number {
    // Convert percentage to 0-100 scale
    // 55%+ = 100, <48% = 0, linear scale between
    if (percentage >= 55) return 100;
    if (percentage <= 48) return 0;

    // Linear interpolation between 48-55%
    return ((percentage - 48) / (55 - 48)) * 100;
}

export function calculateATSFromRecords(records: ATSData[]): {
    percentage: number;
    grade: string;
    score: number;
} {
    const totalGames = records.reduce((sum, r) => sum + r.games, 0);
    const totalCovers = records.reduce((sum, r) => sum + r.covers, 0);

    const percentage = calculateATSPercentage({ covers: totalCovers, games: totalGames });
    const grade = getATSGrade(percentage);
    const score = getATSScore(percentage);

    return { percentage, grade, score };
}

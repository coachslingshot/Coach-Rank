/**
 * Composite Score Calculator
 * 
 * Combines all metrics with weights:
 * - ATS: 40%
 * - Talent: 35%
 * - Experience: 25%
 * 
 * Converts to final A-F grade
 */

import { calculateATSFromRecords, type ATSData } from './ats-calculator';
import { calculateTalentMetrics, type TalentData } from './talent-calculator';
import { calculateExperienceMetrics, type ExperienceData } from './experience-calculator';

export interface CoachMetrics {
    atsRecords: ATSData[];
    talentData: TalentData;
    experienceData: ExperienceData;
}

export interface CompositeScore {
    atsScore: number;
    atsGrade: string;
    atsPercentage: number;
    talentScore: number;
    talentGrade: string;
    experienceScore: number;
    experienceGrade: string;
    overallScore: number;
    overallGrade: string;
}

// Weights for each metric
const WEIGHTS = {
    ats: 0.40,      // 40%
    talent: 0.35,   // 35%
    experience: 0.25 // 25%
};

export function calculateCompositeScore(metrics: CoachMetrics): CompositeScore {
    // Calculate individual metrics
    const atsMetrics = calculateATSFromRecords(metrics.atsRecords);
    const talentMetrics = calculateTalentMetrics(metrics.talentData);
    const experienceMetrics = calculateExperienceMetrics(metrics.experienceData);

    // Calculate weighted overall score
    const overallScore =
        (atsMetrics.score * WEIGHTS.ats) +
        (talentMetrics.score * WEIGHTS.talent) +
        (experienceMetrics.score * WEIGHTS.experience);

    // Get overall grade
    const overallGrade = getOverallGrade(overallScore);

    return {
        atsScore: atsMetrics.score,
        atsGrade: atsMetrics.grade,
        atsPercentage: atsMetrics.percentage,
        talentScore: talentMetrics.score,
        talentGrade: talentMetrics.grade,
        experienceScore: experienceMetrics.score,
        experienceGrade: experienceMetrics.grade,
        overallScore,
        overallGrade,
    };
}

export function getOverallGrade(score: number): string {
    if (score >= 85) return 'A';
    if (score >= 70) return 'B';
    if (score >= 55) return 'C';
    if (score >= 40) return 'D';
    return 'F';
}

export function getGradeColor(grade: string): string {
    switch (grade) {
        case 'A': return 'grade-a';
        case 'B': return 'grade-b';
        case 'C': return 'grade-c';
        case 'D': return 'grade-d';
        case 'F': return 'grade-f';
        default: return 'grade-c';
    }
}

export function getGradeHexColor(grade: string): string {
    switch (grade) {
        case 'A': return '#22c55e';
        case 'B': return '#3b82f6';
        case 'C': return '#94a3b8';
        case 'D': return '#f97316';
        case 'F': return '#ef4444';
        default: return '#94a3b8';
    }
}

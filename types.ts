
export interface AnalysisResult {
  summary: string;
  findings: string[];
  recommendations: string[];
  disclaimer: string;
}

export interface RiskAssessmentData {
  age: number;
  smokingStatus: 'never' | 'former' | 'current';
  packYears: number;
  familyHistory: boolean;
  symptoms: string[];
  occupationalHazards: string[];
}

export type ViewType = 'home' | 'analyze' | 'risk' | 'info';

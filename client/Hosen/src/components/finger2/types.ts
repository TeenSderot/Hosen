export enum AppStep {
  INTRO_SC17 = 'INTRO_SC17',
  NORMALIZE_SC18 = 'NORMALIZE_SC18',
  PHYSICAL_SC19 = 'PHYSICAL_SC19',
  EMOTIONAL_SC20 = 'EMOTIONAL_SC20',
  COGNITIVE_SC21 = 'COGNITIVE_SC21',
  BEHAVIORAL_SC22 = 'BEHAVIORAL_SC22',
  DASHBOARD_SC23 = 'DASHBOARD_SC23',
  SCALES_SC24 = 'SCALES_SC24'
}

export interface UserSelections {
  physical: string[];
  emotional: string[];
  cognitive: string[];
  behavioral: string[];
}

export type SymptomCategory = 'physical' | 'emotional' | 'cognitive' | 'behavioral';

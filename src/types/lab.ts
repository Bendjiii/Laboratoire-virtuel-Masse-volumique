export type LiquidId = 'water' | 'alcohol' | 'dcm';

export interface LiquidConfig {
  id: LiquidId;
  name: string;
  formula: string;
  density: number; // Utilisé uniquement pour simuler la pesée sur la balance
  description: string;
  liquidColor: string;
  liquidTopColor: string;
  meniscusStroke: string;
  bottleTint: string;
}

export const LIQUIDS: Record<LiquidId, LiquidConfig> = {
  water: {
    id: 'water',
    name: 'Eau',
    formula: 'H₂O',
    density: 1.0,
    description: 'Liquide transparent et incolore.',
    liquidColor: '#3B9AE1',
    liquidTopColor: '#7CC0F2',
    meniscusStroke: '#1D74B8',
    bottleTint: '#DCEEFF',
  },
  alcohol: {
    id: 'alcohol',
    name: 'Alcool',
    formula: 'C₂H₆O',
    density: 0.789,
    description: "Liquide incolore, moins dense que l'eau.",
    liquidColor: '#88C8F2',
    liquidTopColor: '#BCE2FA',
    meniscusStroke: '#4D9CD6',
    bottleTint: '#E9F5FE',
  },
  dcm: {
    id: 'dcm',
    name: 'Dichlorométhane',
    formula: 'CH₂Cl₂',
    density: 1.33,
    description: "Liquide incolore, plus dense que l'eau.",
    liquidColor: '#69BFA9',
    liquidTopColor: '#A1DDD0',
    meniscusStroke: '#388E79',
    bottleTint: '#E3F5F0',
  },
};

export const EMPTY_CYLINDER_MASS = 42.5;
export const MIN_VOLUME = 10;
export const MAX_VOLUME = 100;
export const VOLUME_STEP = 10;

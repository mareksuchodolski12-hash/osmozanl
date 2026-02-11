// Wspólne typy dla wszystkich kalkulatorów

export interface SoftenerInput {
  numPeople: number
  waterHardness: number
  hasFloorHeating: boolean
  hasBoiler: boolean
  homeType?: 'apartment' | 'house'
  bathrooms?: number
}

export interface SoftenerResult {
  annualScaleCost: number
  annualSavings: number
  riskLevel: 'low' | 'medium' | 'high'
  systemType: string
  washCycles: number
}

export interface HeatingInput {
  squareMeters: number
  gasUsageM3: number
  installationAge: 'new' | 'medium' | 'old'
  insulation?: 'poor' | 'medium' | 'good'
  heatingType?: 'radiators' | 'floor'
  comfortTemp?: number
}

export interface HeatingResult {
  currentCost: number
  reductionPercent: number
  newCost: number
  annualSavings: number
  recommendations: string[]
  paybackMonths: number
}

export interface BottledWaterInput {
  litersPerWeek: number
  pricePerLiter: number
  numPeople?: number
  roServiceCost?: number
  roSystemCost?: number
}

export interface BottledWaterResult {
  annualBottledCost: number
  annualROCost: number
  annualSavings: number
  paybackMonths: number
  bottlesPerYear: number
  plasticBottles: number
}

export type ScenarioType = 'conservative' | 'realistic' | 'ambitious'

export interface ShareableResult {
  calculator: 'softener' | 'heating' | 'water'
  inputs: Record<string, string | number | boolean>
  results: Record<string, string | number>
  scenario?: ScenarioType
  timestamp: number
}

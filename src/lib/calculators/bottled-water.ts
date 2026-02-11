import type { BottledWaterInput, BottledWaterResult } from './types'
import { RO_SYSTEM_COST, RO_ANNUAL_MAINTENANCE, RO_LITER_COST } from './constants'

/**
 * Oblicza oszczędności systemu RO vs woda butelkowana
 */
export function calculateBottledWater(input: BottledWaterInput): BottledWaterResult {
  const {
    litersPerWeek,
    pricePerLiter,
    roServiceCost = RO_ANNUAL_MAINTENANCE,
    roSystemCost = RO_SYSTEM_COST,
  } = input

  // Roczne zużycie i koszt wody butelkowanej
  const litersPerYear = litersPerWeek * 52
  const annualBottledCost = Math.round(litersPerYear * pricePerLiter)

  // Roczny koszt systemu RO (woda + serwis)
  const roWaterCost = Math.round(litersPerYear * RO_LITER_COST)
  const annualROCost = roWaterCost + roServiceCost

  // Roczna oszczędność
  const annualSavings = annualBottledCost - annualROCost

  // Zwrot inwestycji w miesiącach
  const paybackMonths = Math.round((roSystemCost / Math.max(annualSavings, 1)) * 12)

  // Liczba butelek na rok (szacunek 1.5-2L na butelkę)
  const bottleSize = 1.5
  const bottlesPerYear = Math.ceil(litersPerYear / bottleSize)

  // Szacunkowy plastik (wagi approximate)
  const plasticBottles = bottlesPerYear

  return {
    annualBottledCost,
    annualROCost,
    annualSavings: Math.max(annualSavings, 0),
    paybackMonths: Math.max(paybackMonths, 1),
    bottlesPerYear,
    plasticBottles,
  }
}

/**
 * Generuje etapy zwrotu inwestycji
 */
export function getPaybackMilestones(paybackMonths: number) {
  const milestones = [
    { months: 0, label: 'Start' },
    { months: 6, label: '6 mies.' },
    { months: 12, label: '12 mies.' },
    { months: 18, label: '18 mies.' },
    { months: 24, label: '24 mies.' },
  ]

  return milestones.filter((m) => m.months <= paybackMonths + 6)
}

/**
 * Komunikat o plastiku
 */
export function getPlasticMessage(bottlesPerYear: number): string {
  const kg = Math.round((bottlesPerYear * 50) / 1000) // ~50g per bottle
  const trees = Math.round(kg / 20) // rough estimate
  return `Rocznie: ~${bottlesPerYear} butelek plastikowych (~${kg} kg), co zaoszczędzić możemy.`
}

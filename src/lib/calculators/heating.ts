import type { HeatingInput, HeatingResult, ScenarioType } from './types'
import { GAS_PRICE_EUR_PER_M3, HEATING_SCENARIOS } from './constants'

/**
 * Oblicza potencjalne oszczędności ogrzewania
 * Opiera się na zużyciu gazu, wieku instalacji, izolacji
 */
export function calculateHeating(
  input: HeatingInput,
  scenario: ScenarioType = 'realistic'
): HeatingResult {
  const {
    squareMeters,
    gasUsageM3,
    installationAge,
    insulation = 'medium',
  } = input

  // Aktualny koszt
  const currentCost = gasUsageM3 * GAS_PRICE_EUR_PER_M3

  // Współczynnik redukcji zależy od scenariusza
  const scenarioReduction = HEATING_SCENARIOS[scenario].reductionFactor
  const ageMultiplier = installationAge === 'old' ? 1.3 : installationAge === 'medium' ? 1.0 : 0.7

  const insulationMultiplier =
    insulation === 'poor' ? 1.4 : insulation === 'good' ? 0.6 : 1.0

  // Całkowita redukcja %
  const reductionPercent = Math.round(
    (scenarioReduction * ageMultiplier * insulationMultiplier) * 100
  )
  const clampedReduction = Math.min(reductionPercent, 45) // max 45% to realistyczne

  const newCost = Math.round(currentCost * ((100 - clampedReduction) / 100))
  const annualSavings = currentCost - newCost

  // Payback w miesiącach (szacunek: inwestycja ~3000€ dla modernizacji)
  const investmentCost = 3000
  const paybackMonths = Math.round((investmentCost / Math.max(annualSavings, 1)) * 12)

  // Rekomendacje (3 punkty)
  const recommendations = generateHeatingRecommendations(
    input,
    scenario,
    clampedReduction
  )

  return {
    currentCost: Math.round(currentCost),
    reductionPercent: clampedReduction,
    newCost,
    annualSavings: Math.round(annualSavings),
    recommendations,
    paybackMonths: Math.min(paybackMonths, 60), // max 5 lat
  }
}

function generateHeatingRecommendations(
  input: HeatingInput,
  scenario: ScenarioType,
  reduction: number
): string[] {
  const { installationAge, squareMeters, insulation } = input
  const recommendations: string[] = []

  // Rekomendacja 1: Wiek instalacji
  if (installationAge === 'old') {
    recommendations.push(
      'Wymiana na nowoczesny kocioł kondensacyjny (oszczędność 20-30%)'
    )
  } else if (installationAge === 'medium') {
    recommendations.push(
      'Regulacja i czyszczenie palnika, modernizacja systemu regulacji (oszczędność 10-15%)'
    )
  } else {
    recommendations.push(
      'Optymalizacja ustawień i monitorowanie (oszczędność 5-10%)'
    )
  }

  // Rekomendacja 2: Izolacja
  if (insulation === 'poor') {
    recommendations.push(
      'Termomodernizacja budynku – izolacja ścian/dachu (oszczędność długoterminowa znaczna)'
    )
  } else if (insulation === 'medium') {
    recommendations.push(
      'Wymiana okien i uszczelnienie pęknięć (oszczędność 5-10%)'
    )
  } else {
    recommendations.push(
      'Utrzymanie obecnego stanu z regulacją zaawansowaną (oszczędność 5%)'
    )
  }

  // Rekomendacja 3: Scenariusz
  if (scenario === 'ambitious') {
    recommendations.push(
      'Pompa ciepła powietrze-woda + kocioł hybrydowy (potencjał oszczędności do 45%)'
    )
  } else if (scenario === 'realistic') {
    recommendations.push(
      'Gaz + system solarny + termostat inteligentny (oszczędność 20-25%)'
    )
  } else {
    recommendations.push(
      'Serwis i regulacja istniejącego systemu (oszczędność 10-15%)'
    )
  }

  return recommendations
}

/**
 * Dane do wykresu porównania kosztów
 */
export function getHeatingChartData(current: number, optimized: number) {
  return [
    { name: 'Teraz', value: current, fill: '#dc2626' },
    { name: 'Po optymalizacji', value: optimized, fill: '#16a34a' },
  ]
}

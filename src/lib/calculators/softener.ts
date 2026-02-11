import type { SoftenerInput, SoftenerResult } from './types'

/**
 * Oblicza koszt osadu i szacunkowe oszczędności dla zmiękczacza
 * Logika: liczba osób × twardość wody × współczynniki = koszt osadu
 */
export function calculateSoftener(input: SoftenerInput): SoftenerResult {
  const {
    numPeople,
    waterHardness,
    hasFloorHeating,
    hasBoiler,
    bathrooms = numPeople,
  } = input

  // Współczynnik skali: liczba osób × (twardość wody / 10)
  const baseScale = numPeople * (waterHardness / 10)

  // Zużycie wody rośnie z podłogówką i bojlerem
  const floorHeatingFactor = hasFloorHeating ? 1.3 : 1
  const boilerFactor = hasBoiler ? 1.2 : 1

  const scaleFactor = baseScale * floorHeatingFactor * boilerFactor

  // Koszt osadu rocznie (szacunek €/rok)
  // Oparty na rzeczywistych kosztach napraw i zużycia energii
  const annualScaleCost = Math.round(scaleFactor * 120)

  // Potencjalna oszczędność (przy założeniu 60% redukcji kosztów osadu)
  const annualSavings = Math.round(annualScaleCost * 0.6)

  // Ryzyk uszkodzenia opiera się na twardości i liczbie osób
  const riskScore = (waterHardness / 10) * (numPeople / 2)
  let riskLevel: 'low' | 'medium' | 'high' = 'low'
  if (riskScore > 8) riskLevel = 'high'
  else if (riskScore > 4) riskLevel = 'medium'

  // Rekomendacja systemu
  let systemType = 'Kocioł wstępny + zmiękczacz 1-głowicowy'
  if (waterHardness > 25 && numPeople >= 4) {
    systemType = 'Zmiękczacz 2-głowicowy z kociołem wstępnym'
  } else if (waterHardness > 20) {
    systemType = 'Zmiękczacz 1-głowicowy z dużym zbiornikiem'
  }

  // Liczba cykli regeneracji na miesiąc
  const washCycles = Math.ceil(scaleFactor * 5)

  return {
    annualScaleCost: Math.max(annualScaleCost, 50), // min 50€
    annualSavings: Math.max(annualSavings, 30),
    riskLevel,
    systemType,
    washCycles,
  }
}

/**
 * Heurystyka: jaki jest powinien być parametr na podstawie innego
 * (do pracy z presetami i automatycznych sugestii)
 */
export function getRiskDescription(level: 'low' | 'medium' | 'high'): string {
  switch (level) {
    case 'low':
      return 'Niskie - woda stosunkowo łagodna'
    case 'medium':
      return 'Średnie - wymaga regularnego serwisu'
    case 'high':
      return 'Wysokie - konieczna mineralizacja i monitoring'
    default:
      return ''
  }
}

export function getSystemDescription(systemType: string, washCycles: number): string {
  const baseDesc = `Rekomendujemy ${systemType}.`
  const cycleInfo = `Szacunkowo ${washCycles} regeneracji na miesiąc.`
  return `${baseDesc} ${cycleInfo}`
}

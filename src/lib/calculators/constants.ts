// Stałe dla wszystkich kalkulatorów

export const WHATSAPP_LINK = process.env.NEXT_PUBLIC_WHATSAPP_LINK || 'https://wa.me/31625379014'
export const PHONE_NUMBER = process.env.NEXT_PUBLIC_PHONE_NUMBER || '+31 6 25379014'

// Stałe dla zmiękczacza
export const SOFTENER_PRESETS = {
  single: { numPeople: 1, label: '1 osoba' },
  couple: { numPeople: 2, label: 'Para' },
  family: { numPeople: 4, label: 'Rodzina 4 osób' },
  large: { numPeople: 6, label: 'Duża rodzina' },
}

export const WATER_HARDNESS_RANGES = {
  soft: { min: 5, max: 8, label: 'Miękka', risk: 'low' as const },
  medium: { min: 9, max: 18, label: 'Średnia', risk: 'medium' as const },
  hard: { min: 19, max: 30, label: 'Twarda', risk: 'high' as const },
}

// Stałe dla ogrzewania
export const HEATING_PRESETS = {
  small: { squareMeters: 80, label: 'Mały dom' },
  medium: { squareMeters: 120, label: 'Średni dom' },
  large: { squareMeters: 180, label: 'Duży dom' },
}

export const GAS_PRICE_EUR_PER_M3 = 1.2
export const HEATING_SCENARIOS = {
  conservative: { label: 'Konserwatywny', reductionFactor: 0.15 },
  realistic: { label: 'Realistyczny', reductionFactor: 0.25 },
  ambitious: { label: 'Ambitny', reductionFactor: 0.35 },
}

// Stałe dla wody butelkowanej
export const RO_SYSTEM_COST = 2500 // €
export const RO_ANNUAL_MAINTENANCE = 150 // €
export const RO_LITER_COST = 0.08 // € per liter

export const WATER_PRESETS = {
  light: { litersPerWeek: 10, label: 'Lekko (~10 L/tydz)' },
  medium: { litersPerWeek: 35, label: 'Średnio (~35 L/tydz)' },
  heavy: { litersPerWeek: 60, label: 'Dużo (~60 L/tydz)' },
}

// Format walut EU
export const currencyFormatter = new Intl.NumberFormat('nl-NL', {
  style: 'currency',
  currency: 'EUR',
  minimumFractionDigits: 0,
  maximumFractionDigits: 0,
})

export const currencyFormatterPrecise = new Intl.NumberFormat('nl-NL', {
  style: 'currency',
  currency: 'EUR',
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
})

export const numberFormatter = new Intl.NumberFormat('nl-NL', {
  minimumFractionDigits: 0,
  maximumFractionDigits: 0,
})

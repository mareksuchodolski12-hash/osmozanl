'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Droplet } from 'lucide-react'
import { calculateSoftener, getRiskDescription, getSystemDescription } from '@/lib/calculators/softener'
import type { SoftenerInput } from '@/lib/calculators/types'
import { SOFTENER_PRESETS, currencyFormatter } from '@/lib/calculators/constants'
import { KPICard } from './KPICard'
import { ExplainMath } from './ExplainMath'
import { SharePanel } from './SharePanel'
import { SectionHeader } from './SectionHeader'

export function SoftenerCalculator() {
  const [isAdvanced, setIsAdvanced] = useState(false)
  const [input, setInput] = useState<SoftenerInput>({
    numPeople: 4,
    waterHardness: 20,
    hasFloorHeating: false,
    hasBoiler: true,
    homeType: 'house',
    bathrooms: 2,
  })

  const results = calculateSoftener(input)

  // Handle presets
  const applyPreset = (people: number) => {
    setInput((prev) => ({ ...prev, numPeople: people }))
  }

  // WhatsApp message
  const whatsappMessage = `
Wynik kalkulatora zmiękczacza:
• Liczba osób: ${input.numPeople}
• Twardość wody: ${input.waterHardness}°dH
• Ryzyk uszkodzenia: ${getRiskDescription(results.riskLevel)}
• Rekomendacja: ${results.systemType}
• Roczna oszczędność: ${currencyFormatter.format(results.annualSavings)}

Chciałbym dowiedzieć się więcej o instalacji.
`.trim()

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
      className="bg-white rounded-2xl p-8 border border-gray-200 shadow-lg"
    >
      <SectionHeader
        title="Zmiękczacz wody"
        description="Oblicz koszt osadu i potencjalne oszczędności"
        icon={<Droplet size={32} className="text-blue-600" />}
      />

      {/* Layout: 2 columns na desktop, 1 na mobile */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Lewa kolumna: Inputs */}
        <div className="lg:col-span-2 space-y-6">
          {/* Presety */}
          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-2 uppercase tracking-wide">
              Szybkie presety
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {Object.entries(SOFTENER_PRESETS).map(([key, { label, numPeople }]) => (
                <motion.button
                  key={key}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => applyPreset(numPeople)}
                  className={`px-3 py-2 rounded-lg text-xs font-semibold transition-all ${
                    input.numPeople === numPeople
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {label}
                </motion.button>
              ))}
            </div>
          </div>

          {/* Liczba osób */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-3">
              Liczba osób: <span className="text-blue-600 text-base">{input.numPeople}</span>
            </label>
            <input
              type="range"
              min="1"
              max="10"
              value={input.numPeople}
              onChange={(e) =>
                setInput((prev) => ({ ...prev, numPeople: Number(e.target.value) }))
              }
              className="w-full h-2 bg-gray-200 rounded-lg accent-blue-600 cursor-pointer"
            />
          </div>

          {/* Twardość wody - Segmented Control w Basic, Slider w Advanced */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-3">
              Twardość wody: <span className="text-blue-600 text-base">{input.waterHardness}°dH</span>
            </label>
            {!isAdvanced ? (
              <div className="grid grid-cols-3 gap-2">
                {[
                  { label: 'Miękka (5–8)', value: 6 },
                  { label: 'Średnia (9–18)', value: 14 },
                  { label: 'Twarda (19+)', value: 25 },
                ].map(({ label, value }) => (
                  <motion.button
                    key={value}
                    whileTap={{ scale: 0.95 }}
                    onClick={() =>
                      setInput((prev) => ({ ...prev, waterHardness: value }))
                    }
                    className={`px-2 py-2 rounded-lg text-xs font-semibold transition-all ${
                      input.waterHardness === value || (input.waterHardness > value - 2 && input.waterHardness < value + 2)
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {label}
                  </motion.button>
                ))}
              </div>
            ) : (
              <input
                type="range"
                min="5"
                max="40"
                value={input.waterHardness}
                onChange={(e) =>
                  setInput((prev) => ({
                    ...prev,
                    waterHardness: Number(e.target.value),
                  }))
                }
                className="w-full h-2 bg-gray-200 rounded-lg accent-blue-600 cursor-pointer"
              />
            )}
          </div>

          {/* Checkboxes */}
          <div className="space-y-3">
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={input.hasFloorHeating}
                onChange={(e) =>
                  setInput((prev) => ({
                    ...prev,
                    hasFloorHeating: e.target.checked,
                  }))
                }
                className="w-5 h-5 text-blue-600 rounded"
              />
              <span className="text-gray-700 select-none">Mam ogrzewanie podłogowe</span>
            </label>

            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={input.hasBoiler}
                onChange={(e) =>
                  setInput((prev) => ({
                    ...prev,
                    hasBoiler: e.target.checked,
                  }))
                }
                className="w-5 h-5 text-blue-600 rounded"
              />
              <span className="text-gray-700 select-none">Mam bojler elektryczny</span>
            </label>
          </div>

          {/* Advanced toggle */}
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setIsAdvanced(!isAdvanced)}
            className="text-sm font-semibold text-blue-600 hover:text-blue-700 underline"
          >
            {isAdvanced ? '← Wróć' : 'Tryb zaawansowany →'}
          </motion.button>

          {/* Explain Math */}
          <ExplainMath
            content={
              <>
                <strong>Koszt osadu:</strong> Obliczamy na podstawie liczby osób ×
                twardości wody × współczynniki (podłogówka, bojler).
                <br />
                <strong>Oszczędności:</strong> Szacujemy 60% redukcji kosztów
                konserwacji i energii.
                <br />
                <strong>Ryzyko:</strong> Wysoka twardość = więcej awarii =
                wyższe koszty.
              </>
            }
          />
        </div>

        {/* Prawa kolumna: Sticky Results */}
        <div className="lg:col-span-1">
          <motion.div className="lg:sticky lg:top-24 space-y-6">
            {/* Hero number */}
            <motion.div
              key={results.annualScaleCost}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
              className="p-6 bg-gradient-to-br from-red-50 to-orange-50 rounded-xl border border-red-200"
            >
              <p className="text-sm text-gray-600 font-semibold mb-2">
                Koszt kamienia rocznie
              </p>
              <motion.p
                key={results.annualScaleCost}
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="text-4xl font-bold text-red-600"
              >
                {currencyFormatter.format(results.annualScaleCost)}
              </motion.p>
            </motion.div>

            {/* KPI Cards */}
            <div className="space-y-3">
              <KPICard
                label="Oszczędność rocznie"
                value={currencyFormatter.format(results.annualSavings)}
                color="green"
              />
              <KPICard
                label="Ryzyko uszkodzenia"
                value={getRiskDescription(results.riskLevel)}
                description={`(${input.waterHardness}°dH)`}
                color={
                  results.riskLevel === 'low'
                    ? 'green'
                    : results.riskLevel === 'medium'
                      ? 'orange'
                      : 'red'
                }
              />
              <KPICard
                label="Rekomendacja"
                value={results.systemType}
                description={`~${results.washCycles} cykli/mies.`}
              />
            </div>
          </motion.div>
        </div>
      </div>

      {/* Share Panel */}
      <SharePanel
        title="Wyślij wynik na WhatsApp"
        message={whatsappMessage}
      />
    </motion.section>
  )
}

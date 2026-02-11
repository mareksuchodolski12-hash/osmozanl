'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Droplets } from 'lucide-react'
import { calculateBottledWater, getPaybackMilestones, getPlasticMessage } from '@/lib/calculators/bottled-water'
import type { BottledWaterInput } from '@/lib/calculators/types'
import { WATER_PRESETS, RO_SYSTEM_COST, currencyFormatter } from '@/lib/calculators/constants'
import { KPICard } from './KPICard'
import { ExplainMath } from './ExplainMath'
import { SharePanel } from './SharePanel'
import { SectionHeader } from './SectionHeader'

export function BottledWaterCalculator() {
  const [isAdvanced, setIsAdvanced] = useState(false)
  const [input, setInput] = useState<BottledWaterInput>({
    litersPerWeek: 35,
    pricePerLiter: 0.5,
    numPeople: 4,
  })

  const results = calculateBottledWater(input)
  const milestones = getPaybackMilestones(results.paybackMonths)
  const plasticMsg = getPlasticMessage(results.bottlesPerYear)

  const whatsappMessage = `
Wynik kalkulatora wody:
• Zużycie: ${input.litersPerWeek} L/tydzień
• Cena za litr: ${currencyFormatter.format(input.pricePerLiter)}

Koszt wody butelkowanej: ${currencyFormatter.format(results.annualBottledCost)}/rok
Koszt systemu RO: ${currencyFormatter.format(results.annualROCost)}/rok
Roczna oszczędność: ${currencyFormatter.format(results.annualSavings)}
Zwrot inwestycji: ~${results.paybackMonths} miesięcy

${plasticMsg}

Zainteresowany(-a) systemem RO.
`.trim()

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      viewport={{ once: true }}
      className="bg-white rounded-2xl p-8 border border-gray-200 shadow-lg"
    >
      <SectionHeader
        title="Woda i system RO"
        description="Porównaj koszty wody butelkowanej vs system filtracji"
        icon={<Droplets size={32} className="text-cyan-600" />}
      />

      {/* Layout: 2 columns */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Lewa: Inputs */}
        <div className="space-y-6">
          {/* Presety */}
          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-2 uppercase tracking-wide">
              Szybkie presety
            </label>
            <div className="grid grid-cols-3 gap-2">
              {Object.entries(WATER_PRESETS).map(([key, { label, litersPerWeek }]) => (
                <motion.button
                  key={key}
                  whileTap={{ scale: 0.95 }}
                  onClick={() =>
                    setInput((prev) => ({
                      ...prev,
                      litersPerWeek,
                    }))
                  }
                  className={`px-3 py-2 rounded-lg text-xs font-semibold transition-all ${
                    input.litersPerWeek === litersPerWeek
                      ? 'bg-cyan-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {label}
                </motion.button>
              ))}
            </div>
          </div>

          {/* Litry na tydzień */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-3">
              Litry na tydzień: <span className="text-cyan-600 text-base">{input.litersPerWeek} L</span>
            </label>
            <input
              type="range"
              min="0"
              max="100"
              step="5"
              value={input.litersPerWeek}
              onChange={(e) =>
                setInput((prev) => ({
                  ...prev,
                  litersPerWeek: Number(e.target.value),
                }))
              }
              className="w-full h-2 bg-gray-200 rounded-lg accent-cyan-600 cursor-pointer"
            />
          </div>

          {/* Cena za litr */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-3">
              Sredni koszt za litr:
              <span className="text-cyan-600 text-base ml-2">
                {currencyFormatter.format(input.pricePerLiter)}
              </span>
            </label>
            <input
              type="number"
              min="0.1"
              max="2"
              step="0.1"
              value={input.pricePerLiter}
              onChange={(e) =>
                setInput((prev) => ({
                  ...prev,
                  pricePerLiter: Number(e.target.value),
                }))
              }
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 outline-none"
            />
          </div>

          {/* Number of people */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-3">
              Liczba osób: <span className="text-cyan-600 text-base">{input.numPeople}</span>
            </label>
            <input
              type="number"
              min="1"
              max="10"
              value={input.numPeople}
              onChange={(e) =>
                setInput((prev) => ({
                  ...prev,
                  numPeople: Number(e.target.value),
                }))
              }
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 outline-none"
            />
          </div>

          {/* Advanced toggle */}
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setIsAdvanced(!isAdvanced)}
            className="text-sm font-semibold text-cyan-600 hover:text-cyan-700 underline"
          >
            {isAdvanced ? '← Wróć' : 'Tryb zaawansowany →'}
          </motion.button>

          <ExplainMath
            content={
              <>
                <strong>Woda butelkowana:</strong> {input.litersPerWeek} L/tydzień ×
                {input.pricePerLiter.toFixed(2)}€/L × 52 tyg.
                <br />
                <strong>System RO:</strong> Inwestycja {currencyFormatter.format(RO_SYSTEM_COST)} +
                serwis ~150€/rok + materiały ~0,08€/L
                <br />
                <strong>Plastik:</strong> Każdy litr butelkowany to śmieci.
                System RO to czysta woda na kran.
              </>
            }
          />
        </div>

        {/* Prawa: Results */}
        <div className="space-y-6">
          {/* Hero: Roczny koszt wody */}
          <motion.div
            key={results.annualBottledCost}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
            className="p-6 bg-gradient-to-br from-cyan-50 to-blue-50 rounded-xl border border-cyan-200"
          >
            <p className="text-sm text-gray-600 font-semibold mb-2">
              Wydajesz na butelki rocznie
            </p>
            <motion.p
              key={results.annualBottledCost}
              initial={{ opacity: 0, y: -5 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="text-4xl font-bold text-cyan-600"
            >
              {currencyFormatter.format(results.annualBottledCost)}
            </motion.p>
          </motion.div>

          {/* KPI Cards */}
          <div className="grid grid-cols-2 gap-3">
            <KPICard
              label="Oszczędność rocznie"
              value={currencyFormatter.format(results.annualSavings)}
              color="green"
            />
            <KPICard
              label="Zwrot inwestycji"
              value={`~${results.paybackMonths}`}
              suffix="m-cy"
              color="blue"
            />
          </div>

          {/* Timeline zwrotu */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="p-4 bg-gradient-to-r from-cyan-50 to-emerald-50 rounded-lg border border-cyan-200"
          >
            <p className="text-sm font-semibold text-gray-900 mb-4">Zwrot inwestycji</p>
            <div className="flex items-center justify-between relative">
              {milestones.map((milestone, idx) => (
                <motion.div
                  key={milestone.months}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  viewport={{ once: true }}
                  className="flex flex-col items-center"
                >
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold text-xs transition-all ${
                      milestone.months <= results.paybackMonths
                        ? 'bg-green-600 text-white shadow-lg'
                        : 'bg-gray-300 text-gray-700'
                    }`}
                  >
                    {milestone.months === 0 ? '0' : milestone.months / 6}
                  </div>
                  <p className="text-xs text-gray-600 mt-2 text-center">{milestone.label}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Plastik */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
            className="p-4 bg-orange-50 rounded-lg border border-orange-200"
          >
            <p className="text-sm text-gray-900">
              <span className="font-semibold">Mniej śmieci:</span>
              <br />
              {plasticMsg}
            </p>
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

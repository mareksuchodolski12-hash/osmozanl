'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Flame } from 'lucide-react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip as RechartTooltip, Cell } from 'recharts'
import { calculateHeating, getHeatingChartData } from '@/lib/calculators/heating'
import type { HeatingInput, ScenarioType } from '@/lib/calculators/types'
import { currencyFormatter } from '@/lib/calculators/constants'
import { KPICard } from './KPICard'
import { ExplainMath } from './ExplainMath'
import { SharePanel } from './SharePanel'
import { SectionHeader } from './SectionHeader'
import { ScenarioTabs } from './ScenarioTabs'

export function HeatingCalculator() {
  const [scenario, setScenario] = useState<ScenarioType>('realistic')
  const [isAdvanced, setIsAdvanced] = useState(false)
  const [input, setInput] = useState<HeatingInput>({
    squareMeters: 120,
    gasUsageM3: 1500,
    installationAge: 'medium',
    insulation: 'medium',
    heatingType: 'radiators',
  })

  const results = calculateHeating(input, scenario)
  const chartData = getHeatingChartData(results.currentCost, results.newCost)

  const whatsappMessage = `
Wynik kalkulatora ogrzewania:
• Metraż: ${input.squareMeters} m²
• Roczne zużycie gazu: ${input.gasUsageM3} m³
• Wiek instalacji: ${input.installationAge === 'new' ? 'Nowa (0–5 lat)' : input.installationAge === 'medium' ? 'Średnia (6–15 lat)' : 'Stara (16+ lat)'}
• Scenariusz: ${scenario === 'conservative' ? 'Konserwatywny' : scenario === 'realistic' ? 'Realistyczny' : 'Ambitny'}

Oszczędność: ${currencyFormatter.format(results.annualSavings)}/rok (${results.reductionPercent}%)
Zwrot: ~${results.paybackMonths} miesięcy

Zainteresowany(-a) modernizacją.
`.trim()

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.1 }}
      viewport={{ once: true }}
      className="bg-white rounded-2xl p-8 border border-gray-200 shadow-lg"
    >
      <SectionHeader
        title="Ogrzewanie i gaz"
        description="Analiza potencjału oszczędności energii"
        icon={<Flame size={32} className="text-orange-600" />}
      />

      {/* Scenariusze */}
      <ScenarioTabs active={scenario} onChange={setScenario} />

      {/* Layout: karta + inputs + results + chart */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Lewa: Inputs */}
        <div className="space-y-6">
          {/* Metraż */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-3">
              Metraż domu: <span className="text-orange-600 text-base">{input.squareMeters} m²</span>
            </label>
            <input
              type="range"
              min="30"
              max="500"
              step="10"
              value={input.squareMeters}
              onChange={(e) =>
                setInput((prev) => ({
                  ...prev,
                  squareMeters: Number(e.target.value),
                }))
              }
              className="w-full h-2 bg-gray-200 rounded-lg accent-orange-600 cursor-pointer"
            />
            <div className="flex justify-between text-xs text-gray-600 mt-2">
              <span>Mieszkanie</span>
              <span>Dom duży</span>
            </div>
          </div>

          {/* Zużycie gazu */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-3">
              Roczne zużycie gazu:
              <span className="text-orange-600 text-base ml-2">{input.gasUsageM3} m³</span>
            </label>
            <input
              type="number"
              min="500"
              max="5000"
              step="100"
              value={input.gasUsageM3}
              onChange={(e) =>
                setInput((prev) => ({
                  ...prev,
                  gasUsageM3: Number(e.target.value),
                }))
              }
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 outline-none"
            />
          </div>

          {/* Wiek instalacji */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-3">
              Wiek instalacji
            </label>
            <div className="grid grid-cols-3 gap-2">
              {[
                { id: 'new', label: 'Nowa (0–5 lat)' },
                { id: 'medium', label: 'Średnia (6–15)' },
                { id: 'old', label: 'Stara (16+)' },
              ].map(({ id, label }) => (
                <motion.button
                  key={id}
                  whileTap={{ scale: 0.95 }}
                  onClick={() =>
                    setInput((prev) => ({
                      ...prev,
                      installationAge: id as 'new' | 'medium' | 'old',
                    }))
                  }
                  className={`px-3 py-2 rounded-lg text-xs font-semibold transition-all ${
                    input.installationAge === id
                      ? 'bg-orange-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {label}
                </motion.button>
              ))}
            </div>
          </div>

          {/* Advanced */}
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setIsAdvanced(!isAdvanced)}
            className="text-sm font-semibold text-orange-600 hover:text-orange-700 underline"
          >
            {isAdvanced ? '← Wróć' : 'Tryb zaawansowany →'}
          </motion.button>

          <ExplainMath
            content={
              <>
                <strong>Koszt gazu:</strong> {input.gasUsageM3} m³ × 1,20 €/m³
                <br />
                <strong>Redukcja:</strong> Zależy od scenariusza i wieku
                instalacji. Stara instalacja = większy potencjał oszczędności.
                <br />
                <strong>Payback:</strong> Inwestycja ~3000€ / roczne oszczędności
              </>
            }
          />
        </div>

        {/* Prawa: Results + Chart */}
        <div className="space-y-6">
          {/* Hero KPI */}
          <motion.div
            key={results.annualSavings}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
            className="p-6 bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl border border-green-200"
          >
            <p className="text-sm text-gray-600 font-semibold mb-2">
              Roczna oszczędność
            </p>
            <motion.p
              key={results.annualSavings}
              initial={{ opacity: 0, y: -5 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="text-4xl font-bold text-green-600"
            >
              {currencyFormatter.format(results.annualSavings)}
            </motion.p>
          </motion.div>

          {/* KPI Cards */}
          <div className="grid grid-cols-2 gap-3">
            <KPICard
              label="Redukcja zużycia"
              value={results.reductionPercent}
              suffix="%"
              color="orange"
            />
            <KPICard
              label="Nowy koszt"
              value={currencyFormatter.format(results.newCost)}
              color="blue"
            />
          </div>

          {/* Chart */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="p-4 bg-gray-50 rounded-lg border border-gray-200"
          >
            <p className="text-xs font-semibold text-gray-700 mb-3">
              Porównanie kosztów rocznych
            </p>
            <BarChart width={250} height={200} data={chartData} margin={{ bottom: 20 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="name" tick={{ fontSize: 12 }} />
              <YAxis tick={{ fontSize: 12 }} />
              <RechartTooltip contentStyle={{ backgroundColor: '#fff', border: '1px solid #ccc' }} />
              <Bar dataKey="value" radius={[8, 8, 0, 0]}>
                {chartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.fill} />
                ))}
              </Bar>
            </BarChart>
          </motion.div>

          {/* Recommendations */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
            className="p-4 bg-orange-50 rounded-lg border border-orange-200"
          >
            <p className="text-sm font-semibold text-gray-900 mb-3">
              Co robimy:
            </p>
            <ul className="space-y-2">
              {results.recommendations.map((rec, i) => (
                <li key={i} className="text-sm text-gray-700 flex gap-2">
                  <span className="text-orange-600 font-bold">→</span>
                  <span>{rec}</span>
                </li>
              ))}
            </ul>
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

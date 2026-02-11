'use client'

import { motion } from 'framer-motion'
import type { ScenarioType } from '@/lib/calculators/types'

interface ScenarioTabsProps {
  active: ScenarioType
  onChange: (scenario: ScenarioType) => void
}

const scenarios: { id: ScenarioType; label: string; description: string }[] = [
  {
    id: 'conservative',
    label: 'Konserwatywny',
    description: 'Serwis i regulacja',
  },
  {
    id: 'realistic',
    label: 'Realistyczny',
    description: 'Modernizacja systemu',
  },
  {
    id: 'ambitious',
    label: 'Ambitny',
    description: 'Wymiana i OZE',
  },
]

export function ScenarioTabs({ active, onChange }: ScenarioTabsProps) {
  return (
    <div className="grid grid-cols-3 gap-3 mb-6">
      {scenarios.map((scenario) => (
        <motion.button
          key={scenario.id}
          onClick={() => onChange(scenario.id)}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className={`relative p-3 rounded-lg border transition-all ${
            active === scenario.id
              ? 'bg-blue-600 text-white border-blue-600 shadow-lg'
              : 'bg-white text-gray-900 border-gray-200 hover:border-gray-300'
          }`}
        >
          <div className="text-sm font-semibold">{scenario.label}</div>
          <div className={`text-xs mt-1 ${active === scenario.id ? 'text-blue-100' : 'text-gray-600'}`}>
            {scenario.description}
          </div>
        </motion.button>
      ))}
    </div>
  )
}

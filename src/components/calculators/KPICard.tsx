'use client'

import { motion } from 'framer-motion'

interface KPICardProps {
  label: string
  value: string | number
  suffix?: string
  highlight?: boolean
  color?: 'blue' | 'green' | 'red' | 'orange'
  description?: string
}

export function KPICard({
  label,
  value,
  suffix = '',
  highlight = false,
  color = 'blue',
  description,
}: KPICardProps) {
  const colorClasses = {
    blue: 'text-blue-600',
    green: 'text-green-600',
    red: 'text-red-600',
    orange: 'text-orange-600',
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
      className={`p-4 rounded-lg border transition-all ${
        highlight
          ? 'bg-gradient-to-br from-blue-50 to-cyan-50 border-blue-200'
          : 'bg-gray-50 border-gray-200 hover:border-gray-300'
      }`}
    >
      <p className="text-xs md:text-sm font-semibold text-gray-600 mb-2">{label}</p>
      <motion.p
        key={value}
        initial={{ opacity: 0, y: -5 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className={`text-2xl md:text-3xl font-bold ${colorClasses[color]}`}
      >
        {value}
        {suffix && <span className="text-lg ml-1">{suffix}</span>}
      </motion.p>
      {description && <p className="text-xs text-gray-600 mt-2">{description}</p>}
    </motion.div>
  )
}

'use client'

import { motion } from 'framer-motion'

interface SectionHeaderProps {
  title: string
  description?: string
  icon?: React.ReactNode
}

export function SectionHeader({ title, description, icon }: SectionHeaderProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      viewport={{ once: true }}
      className="mb-8"
    >
      <div className="flex items-start gap-3">
        {icon && <div className="flex-shrink-0">{icon}</div>}
        <div>
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900">{title}</h2>
          {description && (
            <p className="text-gray-600 mt-2 text-base">{description}</p>
          )}
        </div>
      </div>
    </motion.div>
  )
}

'use client'

import { useState } from 'react'
import { ChevronDown } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

interface ExplainMathProps {
  title?: string
  content: React.ReactNode
}

export function ExplainMath({
  title = 'Jak liczymy?',
  content,
}: ExplainMathProps) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <motion.div className="mt-6 border-t border-gray-200 pt-4">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 text-sm font-semibold text-gray-700 hover:text-gray-900 transition-colors"
      >
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.2 }}
        >
          <ChevronDown size={18} />
        </motion.div>
        {title}
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="mt-3 p-3 bg-gray-50 rounded-lg text-xs md:text-sm text-gray-700 leading-relaxed"
          >
            {content}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

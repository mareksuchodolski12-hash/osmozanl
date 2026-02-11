'use client'

import { useState } from 'react'
import { MessageCircle, Copy, Check } from 'lucide-react'
import { motion } from 'framer-motion'
import { WHATSAPP_LINK } from '@/lib/calculators/constants'

interface SharePanelProps {
  title: string
  message: string
  shareUrl?: string
}

export function SharePanel({ title, message, shareUrl }: SharePanelProps) {
  const [copied, setCopied] = useState(false)

  const handleCopyLink = async () => {
    const urlToCopy = shareUrl || window.location.href
    await navigator.clipboard.writeText(urlToCopy)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const handleWhatsApp = () => {
    const encodedMsg = encodeURIComponent(message)
    window.open(`${WHATSAPP_LINK}?text=${encodedMsg}`, '_blank')
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="mt-8 p-6 bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-xl"
    >
      <h4 className="text-sm font-semibold text-gray-900 mb-4">{title}</h4>
      <div className="flex gap-3 flex-col sm:flex-row">
        <button
          onClick={handleWhatsApp}
          className="flex items-center justify-center gap-2 px-4 py-3 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-lg transition-all active:scale-95"
        >
          <MessageCircle size={18} />
          Wyślij na WhatsApp
        </button>

        <button
          onClick={handleCopyLink}
          className="flex items-center justify-center gap-2 px-4 py-3 bg-gray-200 hover:bg-gray-300 text-gray-900 font-semibold rounded-lg transition-all"
        >
          {copied ? (
            <>
              <Check size={18} className="text-green-600" />
              Skopiowano!
            </>
          ) : (
            <>
              <Copy size={18} />
              Kopiuj link
            </>
          )}
        </button>
      </div>
      <p className="text-xs text-gray-600 mt-3">
        Wynik to szacunek – dokładną wycenę potwierdzimy na miejscu.
      </p>
    </motion.div>
  )
}

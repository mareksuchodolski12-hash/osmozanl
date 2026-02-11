'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Send, AlertCircle } from 'lucide-react'

const WHATSAPP_LINK = 'https://wa.me/31625379014'

const CITIES = ['Roermond', 'Weert', 'Echt', 'Maasbracht', 'Reuver', 'Venlo', 'Eindhoven', 'Helmond', 'Nederweert']
const TOPICS = ['Hydraulika', 'Zmiękczacz', 'Odwrócona osmoza', 'Filtry', 'Serwis']
const URGENCIES = ['Dzisiaj', 'W tym tygodniu', 'Bez pośpiechu']

export default function WhatsAppQuickQuote() {
  const [city, setCity] = useState('')
  const [topic, setTopic] = useState('')
  const [urgency, setUrgency] = useState('')
  const [errors, setErrors] = useState<Record<string, string>>({})

  const validateForm = () => {
    const newErrors: Record<string, string> = {}
    if (!city) newErrors.city = 'Wybierz miasto'
    if (!topic) newErrors.topic = 'Wybierz temat'
    if (!urgency) newErrors.urgency = 'Wybierz pilność'
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!validateForm()) return

    // Tworzymy wiadomość
    const message = `Cześć! Jestem z ${city}. Temat: ${topic}. Pilność: ${urgency}. Proszę o wycenę.`
    const encodedMessage = encodeURIComponent(message)
    
    // Otwórz WhatsApp z pre-filled wiadomością
    window.open(`${WHATSAPP_LINK}?text=${encodedMessage}`, '_blank')
    
    // Reset formu
    setCity('')
    setTopic('')
    setUrgency('')
    setErrors({})
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ duration: 0.6, delay: 0.2 }}
      className="mt-12 p-6 md:p-8 bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl border border-green-200 shadow-lg hover:shadow-xl transition-shadow"
    >
      <div className="mb-6">
        <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-2">
          💬 Wyślij gotową wiadomość na WhatsApp
        </h3>
        <p className="text-sm text-gray-600">
          Szybka wycena bez czekania — my odpowiemy w ciągu 30 minut
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Miasto */}
          <div>
            <label htmlFor="city" className="block text-sm font-semibold text-gray-900 mb-2">
              Twoje miasto *
            </label>
            <select
              id="city"
              value={city}
              onChange={(e) => {
                setCity(e.target.value)
                if (errors.city) setErrors(prev => ({ ...prev, city: '' }))
              }}
              className={`w-full px-4 py-3 rounded-lg border-2 text-sm transition-colors ${
                errors.city
                  ? 'border-red-400 focus:border-red-500'
                  : 'border-gray-200 focus:border-green-500'
              } focus:outline-none bg-white`}
            >
              <option value="">-- Wybierz --</option>
              {CITIES.map(c => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
            {errors.city && (
              <p className="text-red-600 text-xs mt-1 flex items-center gap-1">
                <AlertCircle size={14} /> {errors.city}
              </p>
            )}
          </div>

          {/* Temat */}
          <div>
            <label htmlFor="topic" className="block text-sm font-semibold text-gray-900 mb-2">
              Temat usługi *
            </label>
            <select
              id="topic"
              value={topic}
              onChange={(e) => {
                setTopic(e.target.value)
                if (errors.topic) setErrors(prev => ({ ...prev, topic: '' }))
              }}
              className={`w-full px-4 py-3 rounded-lg border-2 text-sm transition-colors ${
                errors.topic
                  ? 'border-red-400 focus:border-red-500'
                  : 'border-gray-200 focus:border-green-500'
              } focus:outline-none bg-white`}
            >
              <option value="">-- Wybierz --</option>
              {TOPICS.map(t => (
                <option key={t} value={t}>{t}</option>
              ))}
            </select>
            {errors.topic && (
              <p className="text-red-600 text-xs mt-1 flex items-center gap-1">
                <AlertCircle size={14} /> {errors.topic}
              </p>
            )}
          </div>

          {/* Pilność */}
          <div>
            <label htmlFor="urgency" className="block text-sm font-semibold text-gray-900 mb-2">
              Pilność *
            </label>
            <select
              id="urgency"
              value={urgency}
              onChange={(e) => {
                setUrgency(e.target.value)
                if (errors.urgency) setErrors(prev => ({ ...prev, urgency: '' }))
              }}
              className={`w-full px-4 py-3 rounded-lg border-2 text-sm transition-colors ${
                errors.urgency
                  ? 'border-red-400 focus:border-red-500'
                  : 'border-gray-200 focus:border-green-500'
              } focus:outline-none bg-white`}
            >
              <option value="">-- Wybierz --</option>
              {URGENCIES.map(u => (
                <option key={u} value={u}>{u}</option>
              ))}
            </select>
            {errors.urgency && (
              <p className="text-red-600 text-xs mt-1 flex items-center gap-1">
                <AlertCircle size={14} /> {errors.urgency}
              </p>
            )}
          </div>
        </div>

        {/* Submit Button */}
        <motion.button
          type="submit"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="w-full mt-6 px-6 py-3 md:py-4 bg-green-500 hover:bg-green-600 active:bg-green-700 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2"
        >
          <Send size={20} />
          <span>Wyślij na WhatsApp</span>
        </motion.button>

        <p className="text-xs text-gray-600 text-center mt-4">
          Odpowiemy w ciągu 30 minut w godzinach pracy. 🚀
        </p>
      </form>
    </motion.div>
  )
}

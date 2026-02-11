'use client'

import { useState, useEffect } from 'react'
import { Phone, Calculator, Wrench, MessageCircle } from 'lucide-react'
import { motion } from 'framer-motion'

const PHONE_NUMBER = '+31 6 25379014'
const WHATSAPP_LINK = 'https://wa.me/31625379014'

const steps = [
  {
    number: 1,
    icon: Phone,
    title: 'Kontakt',
    description: 'Zadzwoń, napisz do nas na WhatsApp lub skorzystaj z formularza. Opowiadamy, na czym polegają nasze usługi i jak mogą Ci pomóc.',
    highlight: 'Odpowiadamy w ciągu 24 godzin',
  },
  {
    number: 2,
    icon: Calculator,
    title: 'Wycena',
    description: 'Przyjazdzamy na miejsce, przeprowadzamy diagnostykę instalacji i przygotowujemy szczegółowy kosztorys bez ukrytych opłat.',
    highlight: 'Bezpłatnie i bez zobowiązań',
  },
  {
    number: 3,
    icon: Wrench,
    title: 'Montaż i serwis',
    description: 'Wykonujemy pracę z dbałością o szczegóły. Po zakończeniu — test systemu, instrukcja obsługi oraz pięcioletnia gwarancja.',
    highlight: 'Profesjonalne wykonanie',
  },
]

const CountUpNumber = ({ target }: { target: number }) => {
  const [count, setCount] = useState(0)

  useEffect(() => {
    const duration = 0.8
    const steps = 30
    const stepDuration = (duration * 1000) / steps
    let current = 0

    const interval = setInterval(() => {
      current++
      setCount(Math.ceil((current / steps) * target))
      if (current >= steps) clearInterval(interval)
    }, stepDuration)

    return () => clearInterval(interval)
  }, [target])

  return <span>{count}</span>
}

export default function HowItWorks() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: [0.4, 0, 0.2, 1],
      },
    },
  }

  const numberVariants = {
    hidden: { scale: 0.3, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        duration: 0.5,
        delay: 0.2,
        type: 'spring',
        stiffness: 100,
      },
    },
  }

  return (
    <section
      id="jak-to-dziala"
      className="section-spacing bg-white scroll-mt-24 relative overflow-hidden"
    >
      {/* Radial gradient background */}
      <div className="absolute inset-0 -z-10 pointer-events-none">
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-blue-200/20 rounded-full blur-3xl"></div>
      </div>

      <div className="section-container">
        {/* Nagłówek */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true, amount: 0.3 }}
          className="text-center mb-16 space-y-4"
        >
          <h2 className="text-gray-900">Jak to działa?</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Trzy proste kroki od pierwszego kontaktu do gotowej instalacji.
          </p>
        </motion.div>

        {/* Timeline */}
        <motion.div
          className="relative"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {/* Horizontal line (desktop) */}
          <div className="hidden md:block absolute top-10 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-blue-300 to-transparent z-0"></div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
            {steps.map((step, idx) => {
              const Icon = step.icon
              return (
                <motion.div
                  key={idx}
                  variants={itemVariants}
                  className="relative"
                >
                  {/* Vertical line connector (mobile) */}
                  {idx < steps.length - 1 && (
                    <div className="md:hidden absolute top-28 left-1/2 transform -translate-x-1/2 w-0.5 h-12 bg-gradient-to-b from-blue-300 to-transparent"></div>
                  )}

                  {/* Card Container */}
                  <motion.div
                    whileHover={{ y: -8, scale: 1.02 }}
                    transition={{ duration: 0.3, type: 'spring', stiffness: 300 }}
                    className="flex flex-col items-center text-center h-full"
                  >
                    {/* Number circle with glow */}
                    <motion.div
                      variants={numberVariants}
                      className="relative mb-8"
                    >
                      {/* Glow effect */}
                      <div className="absolute inset-0 bg-blue-400/30 rounded-full blur-xl -z-10 scale-125"></div>

                      {/* Number circle */}
                      <div className="relative flex items-center justify-center w-24 h-24 rounded-full bg-gradient-to-br from-blue-600 to-cyan-500 text-white text-4xl font-bold shadow-lg">
                        <CountUpNumber target={step.number} />
                      </div>
                    </motion.div>

                    {/* Icon */}
                    <motion.div
                      whileHover={{ scale: 1.15 }}
                      transition={{ duration: 0.3, type: 'spring', stiffness: 300 }}
                      className="mb-6 p-4 bg-gradient-to-br from-blue-50 to-cyan-50 rounded-full border border-blue-100/50"
                    >
                      <Icon size={36} className="text-blue-600" />
                    </motion.div>

                    {/* Title */}
                    <h3 className="text-2xl font-bold text-gray-900 mb-4">
                      {step.title}
                    </h3>

                    {/* Description */}
                    <p className="text-gray-600 mb-6 leading-relaxed text-base">
                      {step.description}
                    </p>

                    {/* Highlight badge */}
                    <motion.div
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.4 }}
                      viewport={{ once: true }}
                      className="px-4 py-2 bg-gradient-to-r from-green-50 to-emerald-50 text-green-700 text-sm font-semibold rounded-full border border-green-200/50 shadow-sm"
                    >
                      ✓ {step.highlight}
                    </motion.div>
                  </motion.div>
                </motion.div>
              )
            })}
          </div>
        </motion.div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          viewport={{ once: true, amount: 0.3 }}
          className="mt-20 pt-16 border-t border-gray-200"
        >
          <div className="text-center space-y-8">
            <div>
              <p className="text-gray-600 text-sm tracking-wide uppercase font-semibold mb-2">
                Następny krok
              </p>
              <h3 className="text-3xl md:text-4xl font-bold text-gray-900">
                Gotowy na pierwszą rozmowę?
              </h3>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <a
                href={`tel:${PHONE_NUMBER}`}
                className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-lg transition-all duration-300 hover:shadow-lg active:scale-95"
                aria-label="Zadzwoń teraz"
              >
                <Phone size={20} />
                Zadzwoń teraz
              </a>
              <a
                href={WHATSAPP_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-green-600 hover:bg-green-700 text-white font-semibold text-lg transition-all duration-300 hover:shadow-lg active:scale-95"
                aria-label="WhatsApp"
              >
                <MessageCircle size={20} />
                Wyślij wiadomość
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

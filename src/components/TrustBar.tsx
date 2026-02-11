'use client'

import { Clock, Zap, Shield, MapPin } from 'lucide-react'
import { motion } from 'framer-motion'

const trustPoints = [
  {
    icon: Clock,
    title: 'Szybka reakcja',
    description:
      'Odpowiadamy w ciągu 24 godzin. Interwencje awaryjne możliwe nawet tego samego dnia.',
  },
  {
    icon: Zap,
    title: 'Realne oszczędności',
    description:
      'Optymalizujemy instalacje wodne i grzewcze tak, aby ograniczyć zużycie wody i energii. Nowoczesne rozwiązania to niższe rachunki.',
  },
  {
    icon: Shield,
    title: 'Gwarancja i bezpieczeństwo',
    description:
      'Do 5 lat gwarancji na wykonane instalacje. Przejrzyste wyceny i brak ukrytych kosztów.',
  },
  {
    icon: MapPin,
    title: 'Lokalny specjalista',
    description:
      'Działamy w Roermond, Weert, Eindhoven i Venlo. Szybki dojazd, znajomość lokalnych standardów instalacyjnych.',
  },
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
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
      duration: 0.4,
      ease: [0.4, 0, 0.2, 1],
    },
  },
}

export default function TrustBar() {
  return (
    <section className="py-16 md:py-24 bg-white border-y border-gray-100">
      <div className="section-container">
        {/* Nagłówek sekcji */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true, amount: 0.3 }}
          className="text-center mb-16"
        >
          <h2 className="text-gray-900 text-3xl md:text-4xl font-bold">
            Dlaczego klienci wybierają nas?
          </h2>
        </motion.div>

        {/* Trust cards */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {trustPoints.map((point, idx) => {
            const Icon = point.icon
            return (
              <motion.div
                key={idx}
                variants={itemVariants}
                className="group"
              >
                <motion.div
                  whileHover={{ y: -8, scale: 1.02 }}
                  transition={{ duration: 0.3, type: 'spring', stiffness: 300 }}
                  className="flex flex-col items-start gap-4 p-6 rounded-xl bg-gradient-to-br from-gray-50 to-gray-50/50 hover:shadow-lg transition-shadow"
                >
                  {/* Icon */}
                  <motion.div
                    whileHover={{ scale: 1.2, rotate: 5 }}
                    transition={{ duration: 0.3, type: 'spring', stiffness: 300 }}
                    className="p-4 bg-gradient-to-br from-blue-100 to-cyan-100 rounded-xl group-hover:shadow-md transition-shadow"
                  >
                    <Icon size={36} className="text-blue-600" />
                  </motion.div>

                  {/* Content */}
                  <div>
                    <h3 className="text-lg font-bold text-gray-900 mb-2">
                      {point.title}
                    </h3>
                    <p className="text-gray-600 text-sm leading-relaxed">
                      {point.description}
                    </p>
                  </div>
                </motion.div>
              </motion.div>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}

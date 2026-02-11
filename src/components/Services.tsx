'use client'

import { Droplet, BarChart3, Flame, Wind, Shield, Zap } from 'lucide-react'
import { motion } from 'framer-motion'

const services = [
  {
    icon: Droplet,
    title: 'Optymalizacja zużycia wody',
    description: 'Nowoczesne instalacje zmniejszają marnowanie wody i obniżają rachunki bez utraty komfortu.',
    benefits: [
      { value: 'Do 30%', label: 'oszczędności na wodzie' },
      { value: '5 lat', label: 'gwarancji' },
    ],
  },
  {
    icon: BarChart3,
    title: 'Zmiękczacze wody',
    description: 'Usunięcie wapnia i magnezu chroni urządzenia domowe, wydłuża ich żywotność i obniża koszty serwisu.',
    benefits: [
      { value: 'Do 40%', label: 'mniej usterek' },
      { value: 'Do 25%', label: 'mniej detergentów' },
    ],
  },
  {
    icon: Flame,
    title: 'Systemy grzewcze i modernizacja',
    description: 'Wymiana starego systemy grzewczego na nowoczesny to realna oszczędność na opale i wyższa wygoda.',
    benefits: [
      { value: 'Do 40%', label: 'mniej paliwa' },
      { value: '24h', label: 'serwis awaryjny' },
    ],
  },
  {
    icon: Wind,
    title: 'Ogrzewanie podłogowe',
    description: 'Równomierny rozkład ciepła, estetyka i oszczędność energii. Idealne dla nowych i istniejących domów.',
    benefits: [
      { value: 'Do 20%', label: 'oszczędności energii' },
      { value: '+10°', label: 'komfortu cieplnego' },
    ],
  },
  {
    icon: Shield,
    title: 'Serwis prewencyjny',
    description: 'Regularne przeglądy zapobiegają awariom i wydatkom. Program serwisowy dostosowany do Twoich potrzeb.',
    benefits: [
      { value: 'Do 70%', label: 'mniej awarii' },
      { value: 'Umowy', label: 'elastyczne' },
    ],
  },
  {
    icon: Zap,
    title: 'Modernizacja pod efektywność energetyczną',
    description: 'Dopasowanie instalacji do standardów energooszczędnych z dofinansowaniem z programów rządowych.',
    benefits: [
      { value: 'Do 35%', label: 'mniej CO₂' },
      { value: 'Doradztwo', label: 'dofinansowania' },
    ],
  },
]

const StatsBadge = ({ value, label }: { value: string; label: string }) => (
  <div className="flex flex-col items-center">
    <div className="text-lg font-bold text-blue-600">{value}</div>
    <div className="text-xs text-gray-600 text-center">{label}</div>
  </div>
)

export default function Services() {
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

  return (
    <section id="uslugi" className="section-spacing gradient-primary scroll-mt-24">
      <div className="section-container">
        {/* Nagłówek sekcji */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true, amount: 0.3 }}
          className="text-center mb-16 space-y-4"
        >
          <h2 className="text-gray-900 text-3xl md:text-4xl font-bold">
            <span className="text-blue-600">Oszczędność.</span>{' '}
            <span className="text-cyan-600">Efektywność.</span>{' '}
            <span className="text-gray-900">Spokój.</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Projektujemy instalacje wodne i grzewcze, które realnie obniżają rachunki i zwiększają komfort codziennego życia.
          </p>
        </motion.div>

        {/* Karty usług */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {services.map((service, idx) => {
            const Icon = service.icon
            return (
              <motion.div
                key={idx}
                variants={itemVariants}
                className="group"
              >
                <motion.div
                  whileHover={{ y: -12, scale: 1.02 }}
                  transition={{ duration: 0.3, type: 'spring', stiffness: 300 }}
                  className="h-full card flex flex-col hover:shadow-2xl"
                >
                  {/* Icon and Title */}
                  <div className="flex items-start gap-4 mb-6">
                    <motion.div
                      whileHover={{ scale: 1.15 }}
                      transition={{ duration: 0.3, type: 'spring', stiffness: 300 }}
                      className="flex-shrink-0 p-4 bg-gradient-to-br from-blue-100 to-cyan-100 rounded-xl group-hover:shadow-lg transition-shadow"
                    >
                      <Icon size={32} className="text-blue-600" />
                    </motion.div>
                  </div>

                  <h3 className="text-xl font-bold text-gray-900 mb-3">{service.title}</h3>
                  <p className="text-gray-600 mb-8 leading-relaxed flex-grow">{service.description}</p>

                  {/* Benefits Stats */}
                  <div className="grid grid-cols-2 gap-4 pt-6 border-t border-gray-100">
                    {service.benefits.map((benefit, bidx) => (
                      <motion.div
                        key={bidx}
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.2 + bidx * 0.1 }}
                        viewport={{ once: true }}
                      >
                        <StatsBadge value={benefit.value} label={benefit.label} />
                      </motion.div>
                    ))}
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

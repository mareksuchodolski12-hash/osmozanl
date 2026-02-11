'use client'

import { motion } from 'framer-motion'
import { CheckCircle, Zap, Droplets } from 'lucide-react'
import { useParams } from 'next/navigation'
import Link from 'next/link'
import { SoftenerCalculator } from '@/components/calculators/SoftenerCalculator'
import { HeatingCalculator } from '@/components/calculators/HeatingCalculator'
import { BottledWaterCalculator } from '@/components/calculators/BottledWaterCalculator'
import { WHATSAPP_LINK, PHONE_NUMBER } from '@/lib/calculators/constants'
import { getTranslations } from '@/lib/i18n'

export default function SavingsCalculator() {
  const params = useParams()
  const locale = params.locale as string
  const t = getTranslations(locale)

  const benefits = [
    {
      icon: CheckCircle,
      label: t.calculator.benefit1,
      description: t.calculator.benefit1Desc,
    },
    {
      icon: Zap,
      label: t.calculator.benefit2,
      description: t.calculator.benefit2Desc,
    },
    {
      icon: Droplets,
      label: t.calculator.benefit3,
      description: t.calculator.benefit3Desc,
    },
  ]

  return (
    <main className="min-h-screen bg-white">
      {/* Back Link */}
      <div className="section-container pt-6">
        <motion.div
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4 }}
        >
          <Link
            href={`/${locale}`}
            className="inline-flex items-center gap-2 text-gray-600 hover:text-blue-600 text-sm font-medium transition-colors hover:underline"
          >
            {t.calculator.backHome}
          </Link>
        </motion.div>
      </div>

      {/* Hero Section */}
      <section className="relative py-16 md:py-24 bg-gradient-to-br from-blue-600 via-blue-500 to-cyan-500 text-white overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-white/10 rounded-full blur-3xl" />
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-white/10 rounded-full blur-3xl" />
        </div>

        <div className="relative section-container space-y-10">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-6 text-center"
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
              {locale === 'pl'
                ? <>Kochamy liczby.<br />Lubimy, gdy rachunki są niższe.</>
                : <>We love numbers.<br />We love lower bills.</>
              }
            </h1>
            <p className="text-lg md:text-xl opacity-95 max-w-2xl mx-auto leading-relaxed">
              {locale === 'pl'
                ? 'Sprawdź realistyczne szacunki oszczędności dla Twojego domu w Roermond, Weert, Eindhoven lub Venlo. Wszystkie kalkulacje oparte na rzeczywistych czynnikach w Twoim domu.'
                : 'Check realistic savings estimates for your home in Roermond, Weert, Eindhoven, or Venlo. All calculations based on real factors in your home.'}
            </p>
          </motion.div>

          {/* Benefits Pills */}
          <div className="flex flex-wrap justify-center gap-4 pt-4">
            {benefits.map((benefit, idx) => {
              const Icon = benefit.icon
              return (
                <motion.div
                  key={benefit.label}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.1 + idx * 0.1 }}
                  className="bg-white/15 backdrop-blur border border-white/30 rounded-full px-5 py-3 flex items-center gap-2 hover:bg-white/20 transition-colors"
                >
                  <Icon size={18} className="flex-shrink-0" />
                  <span className="font-semibold text-sm">{benefit.label}</span>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Calculators Section */}
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="section-container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              {t.calculator.threeSections}
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              {t.calculator.eachCalc}
            </p>
          </motion.div>

          <div className="space-y-16">
            {/* Softener Calculator */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <div className="mb-6">
                <div className="inline-flex items-center gap-2 bg-red-100 text-red-700 px-4 py-2 rounded-full text-sm font-semibold">
                  <Droplets size={16} />
                  {t.calculator.softenerTag}
                </div>
              </div>
              <SoftenerCalculator />
            </motion.div>

            {/* Heating Calculator */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true }}
            >
              <div className="mb-6">
                <div className="inline-flex items-center gap-2 bg-orange-100 text-orange-700 px-4 py-2 rounded-full text-sm font-semibold">
                  <Zap size={16} />
                  {t.calculator.heatingTag}
                </div>
              </div>
              <HeatingCalculator />
            </motion.div>

            {/* Bottled Water Calculator */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <div className="mb-6">
                <div className="inline-flex items-center gap-2 bg-cyan-100 text-cyan-700 px-4 py-2 rounded-full text-sm font-semibold">
                  <Droplets size={16} />
                  {t.calculator.waterTag}
                </div>
              </div>
              <BottledWaterCalculator />
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24 bg-gradient-to-r from-blue-600 to-cyan-500 text-white">
        <div className="section-container text-center space-y-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="space-y-4 max-w-2xl mx-auto"
          >
            <h2 className="text-3xl md:text-4xl font-bold">
              {t.calculator.ctaHeading}
            </h2>
            <p className="text-lg opacity-95">
              {t.calculator.ctaSubheading}
            </p>
          </motion.div>

          <div className="flex flex-col sm:flex-row justify-center gap-4 pt-4">
            <motion.a
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              href={`tel:${PHONE_NUMBER}`}
              className="px-8 py-4 bg-white text-blue-600 font-semibold rounded-xl hover:bg-gray-100 transition-all hover:shadow-lg active:scale-95"
            >
              {PHONE_NUMBER}
            </motion.a>
            <motion.a
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true }}
              href={WHATSAPP_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-4 bg-white/20 hover:bg-white/30 border border-white/50 text-white font-semibold rounded-xl transition-all hover:shadow-lg active:scale-95"
            >
              {locale === 'pl' ? 'Napisz na WhatsApp' : 'Message on WhatsApp'}
            </motion.a>
          </div>
        </div>
      </section>
    </main>
  )
}

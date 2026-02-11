'use client'

import { Phone, MessageCircle, ArrowRight, TrendingDown, CheckCircle2 } from 'lucide-react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import { getTranslations } from '@/lib/i18n'

const PHONE_NUMBER = process.env.NEXT_PUBLIC_PHONE_NUMBER || '+31 6 25379014'
const WHATSAPP_LINK = process.env.NEXT_PUBLIC_WHATSAPP_LINK || 'https://wa.me/31625379014'

export default function Hero() {
  const params = useParams()
  const locale = (params.locale as string) || 'pl'
  const t = getTranslations(locale)

  const handlePhoneClick = () => {
    window.location.href = `tel:${PHONE_NUMBER.replace(/\s/g, '')}`
  }

  const handleWhatsAppClick = () => {
    window.open(WHATSAPP_LINK, '_blank')
  }

  // Animated gradient for "Sprawna instalacja" / "Smooth installation"
  const gradientVariants = {
    animate: {
      backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
      transition: {
        duration: 8,
        ease: 'easeInOut',
        repeat: Infinity,
      },
    },
  }

  // Pulse glow for calculator button
  const pulseVariants = {
    animate: {
      boxShadow: [
        '0 0 20px rgba(59, 130, 246, 0)',
        '0 0 40px rgba(59, 130, 246, 0.5)',
        '0 0 20px rgba(59, 130, 246, 0)',
      ],
      transition: {
        duration: 6,
        ease: 'easeInOut',
        repeat: Infinity,
      },
    },
  }

  // Stagger for trust icons
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.5,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4 },
    },
  }

  return (
    <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 via-blue-50 to-cyan-50 overflow-hidden">
      {/* Decorative background glow */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 bg-blue-300/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 left-10 w-80 h-80 bg-blue-200/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 right-10 w-80 h-80 bg-cyan-200/10 rounded-full blur-3xl"></div>
      </div>

      <div className="section-container text-center space-y-8 py-20">
        {/* "Nowość" Chip */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="inline-block"
        >
          <Link href={`/${locale}/kalkulator-oszczednosci`}>
            <button className="inline-flex items-center gap-2 px-4 py-2 bg-blue-100 hover:bg-blue-200 text-blue-700 font-semibold rounded-full text-sm transition-colors cursor-pointer group">
              <span className="w-2 h-2 bg-blue-600 rounded-full animate-pulse"></span>
              {locale === 'pl' ? 'Nowość: Kalkulator oszczędności' : 'New: Savings Calculator'}
              <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </Link>
        </motion.div>

        {/* Main Heading z Animated Gradient */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="space-y-6"
        >
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-gray-900 leading-tight tracking-tight">
            {locale === 'pl' ? (
              <>
                Niższe rachunki.
                <br />
                <motion.span
                  variants={gradientVariants}
                  animate="animate"
                  className="inline-block bg-gradient-to-r from-blue-600 via-cyan-500 to-blue-600 bg-size-200 bg-clip-text text-transparent"
                  style={{
                    backgroundSize: '200% 200%',
                  }}
                >
                  Sprawna instalacja.
                </motion.span>
                <br />
                Spokój na lata.
              </>
            ) : (
              <>
                Lower bills.
                <br />
                <motion.span
                  variants={gradientVariants}
                  animate="animate"
                  className="inline-block bg-gradient-to-r from-blue-600 via-cyan-500 to-blue-600 bg-size-200 bg-clip-text text-transparent"
                  style={{
                    backgroundSize: '200% 200%',
                  }}
                >
                  Smooth installation.
                </motion.span>
                <br />
                Peace of mind for years.
              </>
            )}
          </h1>

          <p className="text-lg md:text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed font-medium">
            {locale === 'pl'
              ? 'Zmiękczacze wody, odwrócona osmoza, modernizacja instalacji i systemy grzewcze. Odpowiadamy w 24 godziny • Do 5 lat gwarancji • Bezpłatna wycena na miejscu.'
              : 'Water softeners, reverse osmosis, plumbing modernization, and heating systems. We respond within 24 hours • Up to 5-year warranty • Free on-site quote.'}
          </p>
        </motion.div>

        {/* CTA Buttons - Responsive Layout */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-col sm:flex-row gap-4 justify-center pt-8 items-center sm:items-stretch"
        >
          {/* Calculator Button - PRIMARY with Pulse */}
          <Link href={`/${locale}/kalkulator-oszczednosci`} className="w-full sm:w-auto">
            <motion.button
              variants={pulseVariants}
              animate="animate"
              className="w-full sm:w-auto btn-primary flex items-center justify-center gap-2 text-lg hover:shadow-xl transition-all active:scale-95 relative"
              aria-label={locale === 'pl' ? 'Policz oszczędności' : 'Calculate Savings'}
            >
              <TrendingDown size={22} />
              {locale === 'pl' ? 'Policz oszczędności' : 'Calculate Savings'}
            </motion.button>
          </Link>

          {/* Free Quote Button - SECONDARY */}
          <button
            onClick={handlePhoneClick}
            className="w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-4 bg-gray-100 hover:bg-gray-200 text-gray-900 font-semibold rounded-lg transition-all active:scale-95 text-lg border border-gray-200"
            aria-label={locale === 'pl' ? 'Bezpłatna wycena' : 'Free Quote'}
          >
            <Phone size={22} />
            {locale === 'pl' ? 'Bezpłatna wycena' : 'Free Quote'}
          </button>

          {/* WhatsApp Button - SECONDARY */}
          <button
            onClick={handleWhatsAppClick}
            className="w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-4 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-lg shadow-md transition-all active:scale-95 text-lg"
            aria-label={locale === 'pl' ? 'Napisz na WhatsApp' : 'Message on WhatsApp'}
          >
            <MessageCircle size={22} />
            {locale === 'pl' ? 'WhatsApp' : 'WhatsApp'}
          </button>
        </motion.div>

        {/* Microcopy under buttons */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-sm text-gray-600 italic"
        >
          {locale === 'pl' ? 'Zajmie Ci to 30 sekund. Wynik zobaczysz od razu.' : "Takes 30 seconds. You'll see results instantly."}
        </motion.p>

        {/* Savings Banner with Bounce */}
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{
            duration: 0.6,
            delay: 0.35,
            type: 'spring',
            stiffness: 100,
            damping: 15,
          }}
          className="mt-12 pt-8 border-t border-gray-300/30"
        >
          <div className="inline-flex items-center gap-3 px-6 py-4 bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200/60 rounded-2xl shadow-lg backdrop-blur-sm">
            <TrendingDown className="text-green-600 flex-shrink-0" size={26} />
            <span className="text-gray-900 font-semibold text-base md:text-lg">
              {locale === 'pl' ? 'Średnia roczna oszczędność:' : 'Average annual savings:'}{' '}
              <span className="text-green-600 font-bold">400–1200 €</span>
            </span>
          </div>
        </motion.div>

        {/* Trust indicators with Stagger */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="flex flex-col sm:flex-row items-center justify-center gap-6 pt-8 text-sm text-gray-700"
        >
          <motion.div variants={itemVariants} className="flex items-center gap-2">
            <CheckCircle2 className="text-blue-600 flex-shrink-0" size={22} />
            <span>
              <strong>{locale === 'pl' ? '24h odpowiedź' : '24-hour response'}</strong>{' '}
              {locale === 'pl' ? 'na zgłoszenie' : 'to inquiries'}
            </span>
          </motion.div>
          <motion.div variants={itemVariants} className="flex items-center gap-2">
            <CheckCircle2 className="text-blue-600 flex-shrink-0" size={22} />
            <span>
              <strong>{locale === 'pl' ? '5 lat gwarancji' : '5-year warranty'}</strong>{' '}
              {locale === 'pl' ? 'na prace' : 'on labor'}
            </span>
          </motion.div>
          <motion.div variants={itemVariants} className="flex items-center gap-2">
            <CheckCircle2 className="text-blue-600 flex-shrink-0" size={22} />
            <span>
              <strong>{locale === 'pl' ? 'Bezpłatna wycena' : 'Free quote'}</strong>{' '}
              {locale === 'pl' ? 'na miejscu' : 'on-site'}
            </span>
          </motion.div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="pt-12 animate-bounce-subtle"
        >
          <div className="text-gray-600 text-sm font-medium">
            {locale === 'pl' ? 'Przewiń dla szczegółów ↓' : 'Scroll for details ↓'}
          </div>
        </motion.div>
      </div>
    </section>
  )
}

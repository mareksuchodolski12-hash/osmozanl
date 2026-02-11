'use client'

import { Phone, MessageCircle, MapPin, Clock } from 'lucide-react'
import { motion } from 'framer-motion'
import WhatsAppQuickQuote from './WhatsAppQuickQuote'

const PHONE_NUMBER = process.env.NEXT_PUBLIC_PHONE_NUMBER || '+31 6 25379014'
const WHATSAPP_LINK = process.env.NEXT_PUBLIC_WHATSAPP_LINK || 'https://wa.me/31625379014'
const EMAIL = 'kontakt@hydraulika-woda.nl'
const CITIES = ['Roermond', 'Weert', 'Echt', 'Maasbracht', 'Reuver', 'Venlo', 'Eindhoven', 'Helmond', 'Nederweert']

const ContactCard = ({ icon: Icon, title, description, content, color }: any) => (
  <motion.div
    whileHover={{ y: -8 }}
    transition={{ type: 'spring', stiffness: 300, damping: 20 }}
    className="p-6 md:p-8 bg-white rounded-2xl border border-gray-100 shadow-md hover:shadow-xl transition-shadow"
  >
    <div className="flex gap-4 mb-4">
      <motion.div
        whileHover={{ scale: 1.1 }}
        className={`flex-shrink-0 p-3 rounded-xl ${color}`}
      >
        <Icon size={28} className="text-white" />
      </motion.div>
      <div>
        <h3 className="text-lg font-bold text-gray-900">{title}</h3>
        <p className="text-xs md:text-sm text-gray-500">{description}</p>
      </div>
    </div>
    <div className="mt-4">{content}</div>
  </motion.div>
)

export default function Contact() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: 'easeOut' },
    },
  }

  return (
    <section id="kontakt" className="py-12 md:py-20 lg:py-24 bg-white scroll-mt-24">
      <div className="section-container">
        {/* Nagłówek */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16 space-y-4"
        >
          <h2 className="text-gray-900">Skontaktuj się z nami</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Pytania? Potrzebujesz wyceny? Napisz lub zadzwoń — czekamy na Ciebie!
          </p>
        </motion.div>

        {/* Main Grid: 2 kolumny desktop, 1 mobile */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 mb-12"
        >
          {/* Lewa kolumna: Kontakt */}
          <motion.div variants={itemVariants} className="space-y-6">
            <ContactCard
              icon={Phone}
              title="Telefon"
              description="Bezpośredni kontakt"
              color="bg-gradient-to-br from-blue-600 to-blue-500"
              content={
                <div className="space-y-3">
                  <a
                    href={`tel:${PHONE_NUMBER.replace(/\s/g, '')}`}
                    className="text-blue-600 hover:text-blue-700 font-semibold text-lg transition-colors"
                    aria-label={`Zadzwoń ${PHONE_NUMBER}`}
                  >
                    {PHONE_NUMBER}
                  </a>
                  <p className="text-sm text-gray-600">Pn–Pt: 8:00–17:00 | Aw.: 24/7</p>
                </div>
              }
            />

            <ContactCard
              icon={MessageCircle}
              title="WhatsApp"
              description="Szybka odpowiedź"
              color="bg-gradient-to-br from-green-500 to-emerald-500"
              content={
                <div className="space-y-3">
                  <a
                    href={WHATSAPP_LINK}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-green-600 hover:text-green-700 font-semibold text-lg transition-colors flex items-center gap-2"
                    aria-label="WhatsApp"
                  >
                    <span>Napisz wiadomość</span>
                    <span className="text-xs">↗</span>
                  </a>
                  <p className="text-sm text-gray-600">Odpowiadamy w ciągu 30 minut</p>
                </div>
              }
            />
          </motion.div>

          {/* Prawa kolumna: Zasięg + Godziny */}
          <motion.div variants={itemVariants} className="space-y-6">
            <ContactCard
              icon={MapPin}
              title="Zasięg działania"
              description="Roermond i okolice"
              color="bg-gradient-to-br from-orange-600 to-orange-500"
              content={
                <div className="space-y-4">
                  <p className="text-sm text-gray-700 font-semibold">
                    Działamy w Roermond i okolicach (do 30 minut dojazdu).
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-2 text-sm text-gray-700">
                    {CITIES.map(city => (
                      <motion.div
                        key={city}
                        whileHover={{ x: 4 }}
                        className="flex items-center gap-1"
                      >
                        <span className="text-orange-600 font-bold">•</span>
                        {city}
                      </motion.div>
                    ))}
                  </div>
                </div>
              }
            />

            <ContactCard
              icon={Clock}
              title="Godziny pracy"
              description="Zawsze dostępni"
              color="bg-gradient-to-br from-indigo-600 to-indigo-500"
              content={
                <div className="space-y-3 text-sm text-gray-700">
                  <div className="flex justify-between">
                    <span className="font-semibold">Poniedziałek–Piątek:</span>
                    <span>8:00 – 17:00</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-semibold">Sobota–Niedziela:</span>
                    <span>Po umówieniu</span>
                  </div>
                  <div className="flex justify-between pt-2 border-t border-gray-200">
                    <span className="font-semibold">Awarie 24/7:</span>
                    <span className="text-red-600 font-bold">Zawsze!</span>
                  </div>
                </div>
              }
            />
          </motion.div>
        </motion.div>

        {/* WhatsApp Quick Quote Widget */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.7, delay: 0.3 }}
        >
          <WhatsAppQuickQuote />
        </motion.div>
      </div>
    </section>
  )
}


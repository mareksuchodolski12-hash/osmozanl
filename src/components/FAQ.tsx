'use client'

import { useState } from 'react'
import { ChevronDown, Phone, MessageCircle } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

const PHONE_NUMBER = process.env.NEXT_PUBLIC_PHONE_NUMBER || '+31 6 25379014'
const WHATSAPP_LINK = process.env.NEXT_PUBLIC_WHATSAPP_LINK || 'https://wa.me/31625379014'

const faqs = [
  {
    question: 'Jaka jest różnica między zmięk­czaczem a odwróconą osmozą?',
    answer:
      'Zmiękczacz usuwa wapń i magnez (zmięczanie wody), ale zostawia minerały i sole. Odwrócona osmoza (RO) filtruje prawie wszystko — daje zarazem czystszą i „lżejszą" wodę. RO to bardziej zaawansowana technologia, ale i droższe utrzymanie. Wybór zależy od Twoich potrzeb.',
  },
  {
    question: 'Ile trwa montaż nowego systemu?',
    answer:
      'Zmiękczacz: ok. 4-6 godzin. Odwrócona osmoza: 6-8 godzin. Hydraulika całej domu: kilka dni, zależy od zakresu. Damy Ci konkretny harmonogram już przy wycenie.',
  },
  {
    question: 'Jak często trzeba wymieniać wkłady i żywicę?',
    answer:
      'Żywica w zmiękczu: 3-5 lat zależy od twardości wody i zużycia. Membrany w RO: 2-3 lata. Wkłady węglowe w filtrach: 6-12 miesięcy. Możemy Ci zrobić plan serwisowy dostosowany do Twojej instalacji.',
  },
  {
    question: 'Czy hydraulika i woda to rzeczywiście potrzebne mnie teraz?',
    answer:
      'Jeśli masz osady w czajniku, armatury z szarą nalotami, słabą wydajność prysznica lub oszczędzać chcesz na zmywarce — odpowiedź to TAK. Przyjdziemy, zdiagnozujemy, a potem Ty podejmiesz decyzję. Bez presji.',
  },
  {
    question: 'Jaka gwarancja na prace i materiały?',
    answer:
      '5 lat na wszystkie nasze prace montażowe. Materiały: zgodnie z rekomendacjami producenta (zwykle 2-3 lata). Gwarancja obejmuje wady rzemiosła i materiale, ale NIE normalne zużycie (np. wymiana żywicy).',
  },
  {
    question: 'Jesteście dostępni w weekend i wieczorem?',
    answer:
      'Awarie: TAK — 24/7 przez WhatsApp. Montaże zaplanowane: poniedziałek-piątek, 8:00-17:00. Ale w nagłych wypadkach zadzwoń — tam gdzie się da, wyjeżdżamy szybko.',
  },
  {
    question: 'Jakie miasta obejmujecie?',
    answer:
      'Cała prowincja Limburg: Brunssum, Heerlen, Maastricht, Landgraaf, Roggel, Sittard, Geleen, Kerkrade i tzw. Ost-Limburg. Poza Limburg — pytaj, być może się uda.',
  },
  {
    question: 'Ile kosztuje wycena?',
    answer:
      'Wycena jest BEZPŁATNA. Przyjdziemy, sprawdzimy instalację, damy Ci raport z określonym kosztem i harmonogramem. Wszystko bez zobowiązań — Ty podejmiesz decyzję.',
  },
]

const CTAButtons = () => (
  <motion.div
    initial={{ opacity: 0, y: 8 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.3, delay: 0.15 }}
    className="mt-6 pt-6 border-t border-gray-100"
  >
    <p className="text-sm text-gray-600 mb-4 font-medium">
      Nadal masz pytanie? Zadzwoń lub napisz na WhatsApp.
    </p>
    <div className="flex gap-3">
      <a
        href={`tel:${PHONE_NUMBER}`}
        className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold transition-all duration-200 hover:shadow-md active:scale-95"
        aria-label="Zadzwoń"
      >
        <Phone size={16} />
        Zadzwoń
      </a>
      <a
        href={WHATSAPP_LINK}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-green-600 hover:bg-green-700 text-white text-sm font-semibold transition-all duration-200 hover:shadow-md active:scale-95"
        aria-label="WhatsApp"
      >
        <MessageCircle size={16} />
        WhatsApp
      </a>
    </div>
  </motion.div>
)

export default function FAQ() {
  const [openIdx, setOpenIdx] = useState<number | null>(0)

  const toggleFAQ = (idx: number) => {
    setOpenIdx(openIdx === idx ? null : idx)
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.08, delayChildren: 0.1 },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
  }

  return (
    <section id="faq" className="section-spacing gradient-primary scroll-mt-24">
      <div className="section-container">
        {/* Nagłówek */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true, amount: 0.3 }}
          className="text-center mb-16 space-y-4"
        >
          <h2 className="text-gray-900">Pytania i odpowiedzi</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Szeroko zadawane pytania o wodę, hydraulikę i nasz serwis.
          </p>
        </motion.div>

        {/* Accordion */}
        <motion.div
          className="max-w-3xl mx-auto space-y-3"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          <AnimatePresence>
            {faqs.map((faq, idx) => (
              <motion.div
                key={idx}
                variants={itemVariants}
                className={`border rounded-xl overflow-hidden transition-all duration-300 ${
                  openIdx === idx
                    ? 'border-blue-300 bg-white shadow-lg shadow-blue-100/50'
                    : 'border-gray-200 bg-white hover:shadow-md hover:border-gray-300'
                } ${openIdx === idx ? 'shim-left' : ''}`}
                style={{
                  borderLeftWidth: openIdx === idx ? '4px' : '0px',
                  borderLeftColor: openIdx === idx ? '#0066CC' : 'transparent',
                }}
              >
                <button
                  onClick={() => toggleFAQ(idx)}
                  className="w-full flex items-center justify-between px-6 py-5 text-left font-semibold text-gray-900 hover:bg-gray-50/50 transition-colors duration-200"
                  aria-expanded={openIdx === idx}
                >
                  <span className="text-base leading-tight pr-4">{faq.question}</span>
                  <motion.div
                    animate={{ rotate: openIdx === idx ? 180 : 0 }}
                    transition={{ duration: 0.3, type: 'spring', stiffness: 200 }}
                    className="flex-shrink-0"
                  >
                    <ChevronDown size={24} className="text-blue-600" />
                  </motion.div>
                </button>

                {/* Answer with framer-motion */}
                <AnimatePresence>
                  {openIdx === idx && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{
                        duration: 0.3,
                        ease: [0.4, 0, 0.2, 1],
                      }}
                    >
                      <motion.div
                        initial={{ y: -8 }}
                        animate={{ y: 0 }}
                        transition={{ duration: 0.3, delay: 0.05 }}
                        className="px-6 py-5 border-t border-gray-100 bg-gradient-to-br from-gray-50/50 to-gray-50/0 text-gray-700 leading-relaxed"
                      >
                        <p>{faq.answer}</p>
                        <CTAButtons />
                      </motion.div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* CTA under FAQ */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          viewport={{ once: true, amount: 0.3 }}
          className="text-center mt-16"
        >
          <p className="text-gray-700 mb-6">Nie znalazłeś odpowiedzi?</p>
          <a
            href="#kontakt"
            className="btn-primary inline-flex items-center gap-2 hover:shadow-lg transition-shadow"
          >
            Napisz do nas
          </a>
        </motion.div>
      </div>
    </section>
  )
}

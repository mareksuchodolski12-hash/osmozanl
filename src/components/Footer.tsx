'use client'

import { Phone, MessageCircle } from 'lucide-react'

const PHONE_NUMBER = '+31 6 25379014'
const WHATSAPP_LINK = 'https://wa.me/31625379014'
const EMAIL = 'kontakt@hydraulika-woda.nl'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-gray-900 text-gray-300 py-12 md:py-16">
      <div className="section-container">
        {/* Main Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 mb-8">
          {/* Kolumna 1: Brand */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-cyan-500 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">H+W</span>
              </div>
              <span className="font-bold text-white">Hydraulika & Woda</span>
            </div>
            <p className="text-xs md:text-sm leading-relaxed text-gray-400">
              Profesjonalne usługi hydrauliczne i uzdatniania wody w Roermond i okolicach.
            </p>
          </div>

          {/* Kolumna 2: Usługi */}
          <div>
            <h4 className="font-semibold text-white mb-3 text-sm">Usługi</h4>
            <ul className="space-y-2 text-xs md:text-sm">
              <li><a href="#uslugi" className="text-gray-400 hover:text-white transition-colors">Hydraulika</a></li>
              <li><a href="#uslugi" className="text-gray-400 hover:text-white transition-colors">Zmiękczacze wody</a></li>
              <li><a href="#uslugi" className="text-gray-400 hover:text-white transition-colors">Odwrócona osmoza</a></li>
              <li><a href="#uslugi" className="text-gray-400 hover:text-white transition-colors">Serwis</a></li>
            </ul>
          </div>

          {/* Kolumna 3: Kontakt */}
          <div>
            <h4 className="font-semibold text-white mb-3 text-sm">Kontakt</h4>
            <div className="space-y-2 text-xs md:text-sm">
              <a
                href={`tel:${PHONE_NUMBER.replace(/\s/g, '')}`}
                className="text-gray-400 hover:text-white transition-colors flex items-center gap-2"
                aria-label={`Zadzwoń ${PHONE_NUMBER}`}
              >
                <Phone size={14} />
                {PHONE_NUMBER}
              </a>
              <a
                href={WHATSAPP_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors flex items-center gap-2"
                aria-label="WhatsApp"
              >
                <MessageCircle size={14} />
                WhatsApp
              </a>
              <a
                href={`mailto:${EMAIL}`}
                className="text-gray-400 hover:text-white transition-colors flex items-center gap-2"
                aria-label={`Email: ${EMAIL}`}
              >
                <span className="text-xs">✉</span>
                <span className="truncate text-xs md:text-sm">{EMAIL}</span>
              </a>
            </div>
          </div>
        </div>

        {/* Divider + Copyright */}
        <div className="border-t border-gray-800 pt-6 md:pt-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-xs md:text-sm">
            <p className="text-gray-500">© {currentYear} Hydraulika & Woda</p>
            <a
              href="/polityka-prywatnosci"
              className="text-gray-400 hover:text-white transition-colors"
            >
              Polityka prywatności
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}

'use client'

import { Phone, MessageCircle, Globe } from 'lucide-react'
import { useParams, usePathname, useRouter } from 'next/navigation'
import { Locale, getTranslations, getOtherLocale } from '@/lib/i18n'

export default function Header() {
  const params = useParams()
  const pathname = usePathname()
  const router = useRouter()
  const locale = (params.locale as string) || 'pl'
  const t = getTranslations(locale)

  const PHONE_NUMBER = process.env.NEXT_PUBLIC_PHONE_NUMBER || '+31 6 25379014'
  const WHATSAPP_LINK = process.env.NEXT_PUBLIC_WHATSAPP_LINK || 'https://wa.me/31625379014'

  const handleLanguageSwitch = () => {
    const otherLocale = getOtherLocale(locale as Locale)
    // Remove locale from pathname and add new locale
    const newPathname = pathname.replace(`/${locale}`, `/${otherLocale}`)
    router.push(newPathname === '' ? `/${otherLocale}` : newPathname)
  }

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-sm border-b border-gray-200 shadow-sm">
      <div className="section-container py-4">
        <div className="flex items-center justify-between">
          {/* Logo / Nazwa + Navigation */}
          <div className="flex items-center gap-8">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-cyan-500 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">H+W</span>
              </div>
              <div className="hidden sm:block">
                <h1 className="text-lg font-bold text-gray-900">
                  {locale === 'pl' ? 'Hydraulika & Woda' : 'Hydraulics & Water'}
                </h1>
                <p className="text-xs text-gray-600">{t.header.location}</p>
              </div>
            </div>


          </div>

          {/* CTA w header */}
          <div className="flex items-center gap-3">
            {/* Language Switcher */}
            <button
              onClick={handleLanguageSwitch}
              className="flex items-center gap-1.5 px-3 py-2 text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors"
              title={locale === 'pl' ? 'Switch to English' : 'Przełącz na Polski'}
              aria-label={locale === 'pl' ? 'Switch to English' : 'Przełącz na Polski'}
            >
              <Globe size={16} />
              <span>{locale === 'pl' ? 'EN' : 'PL'}</span>
            </button>

            <a
              href={`tel:${PHONE_NUMBER.replace(/\s/g, '')}`}
              className="hidden sm:flex flex-col items-start px-4 py-2 text-sm transition-colors hover:opacity-80"
              title={locale === 'pl' ? 'Zadzwoń do nas' : 'Call us'}
              aria-label={locale === 'pl' ? 'Zadzwoń do nas' : 'Call us'}
            >
              <span className="font-bold text-blue-600">{PHONE_NUMBER}</span>
              <span className="text-xs text-gray-600 mt-0.5">
                {locale === 'pl' ? 'Dostępni 7 dni w tygodniu' : 'Available 7 days a week'}
              </span>
            </a>

            <a
              href={WHATSAPP_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold rounded-lg transition-colors shadow-sm"
              title={locale === 'pl' ? 'Bezpłatna wycena' : 'Free Quote'}
              aria-label={locale === 'pl' ? 'Bezpłatna wycena' : 'Free Quote'}
            >
              <MessageCircle size={18} />
              <span className="hidden md:inline">{t.header.getQuote}</span>
            </a>
          </div>
        </div>
      </div>
    </header>
  )
}

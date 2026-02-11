import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { getTranslations } from '@/lib/i18n'
import type { Metadata } from 'next'

interface Props {
  params: Promise<{ locale: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params
  const t = getTranslations(locale)

  return {
    title: t.metadata.titlePrivacy,
    description: t.metadata.descriptionPrivacy,
  }
}

export default async function PrivacyPolicy({ params }: Props) {
  const { locale } = await params

  const isPl = locale === 'pl'

  return (
    <main className="min-h-screen bg-white">
      {/* Header */}
      <div className="bg-gradient-to-br from-blue-50 via-cyan-50 to-blue-50 sticky top-16 z-30 border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Link
            href={`/${locale}`}
            className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 font-semibold mb-4 transition-colors"
          >
            <ArrowLeft size={18} />
            {isPl ? 'Wróć do strony głównej' : 'Back to Home'}
          </Link>
          <h1 className="text-4xl font-bold text-gray-900">
            {isPl ? 'Polityka Prywatności' : 'Privacy Policy'}
          </h1>
          <p className="text-gray-600 mt-2">
            {isPl ? 'Aktualizacja:' : 'Updated:'} {new Date().getFullYear()}
          </p>
        </div>
      </div>

      {/* Content */}
      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="prose prose-lg max-w-none space-y-8">
          {/* Introduction */}
          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-gray-900">
              {isPl ? 'Wstęp' : 'Introduction'}
            </h2>
            {isPl ? (
              <>
                <p className="text-gray-700">
                  Szanujemy Twoją prywatność i jesteśmy zobowiązani do jej ochrony. Niniejsza Polityka Prywatności wyjaśnia, w jaki sposób zbieramy,
                  używamy, ujawniamy i zaopatrujemy informacje dotyczące Ciebie.
                </p>
                <p className="text-gray-700">
                  Polityka ta zgodna jest z Rozporządzeniem Ogólnym o Ochronie Danych (RODO) 2016/679 oraz obowiązującymi przepisami prawa ochrony danych
                  osobowych w Holandii i Unii Europejskiej.
                </p>
              </>
            ) : (
              <>
                <p className="text-gray-700">
                  We respect your privacy and are committed to protecting it. This Privacy Policy explains how we collect, use, disclose, and safeguard
                  information about you.
                </p>
                <p className="text-gray-700">
                  This policy complies with the General Data Protection Regulation (GDPR) 2016/679 and applicable data protection laws in the Netherlands
                  and European Union.
                </p>
              </>
            )}
          </section>

          {/* Administrator */}
          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-gray-900">
              {isPl ? '1. Administrator Danych Osobowych' : '1. Data Controller'}
            </h2>
            <div className="bg-gray-50 p-6 rounded-lg border border-gray-200 space-y-2">
              <p className="text-gray-900 font-semibold">
                {isPl ? 'Hydraulika & Woda' : 'Hydraulics & Water Systems'}
              </p>
              <p className="text-gray-700">
                {isPl ? 'Adres: Limburg, Holandia' : 'Address: Limburg, Netherlands'}
              </p>
              <p className="text-gray-700">
                Email:{' '}
                <a href="mailto:contact@hydraulics-water.nl" className="text-blue-600 hover:text-blue-700">
                  contact@hydraulics-water.nl
                </a>
              </p>
              <p className="text-gray-700">
                {isPl ? 'Telefon:' : 'Phone:'}{' '}
                <a href="tel:+31625379014" className="text-blue-600 hover:text-blue-700">
                  +31 6 25379014
                </a>
              </p>
            </div>
          </section>

          {/* GDPR Section */}
          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-gray-900">
              {isPl ? '2. Twoje Prawa' : '2. Your Rights'}
            </h2>
            <p className="text-gray-700">
              {isPl
                ? 'Masz prawo do dostępu, poprawy, usunięcia Twoich danych osobowych oraz prawo do sprzeciwu. Możesz również złożyć skargę do właściwego urzędu ochrony danych osobowych.'
                : 'You have the right to access, correct, delete your personal data and to object to processing. You may also file a complaint with the appropriate data protection authority.'}
            </p>
          </section>

          {/* Data Security */}
          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-gray-900">
              {isPl ? '3. Bezpieczeństwo Danych' : '3. Data Security'}
            </h2>
            <p className="text-gray-700">
              {isPl
                ? 'Wdrażamy odpowiednie środki bezpieczeństwa, aby chronić Twoje dane osobowe przed nieuprawnionym dostępem, zmianą, ujawnieniem lub zniszczeniem.'
                : 'We implement appropriate security measures to protect your personal data from unauthorized access, alteration, disclosure, or destruction.'}
            </p>
          </section>

          {/* Contact */}
          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-gray-900">
              {isPl ? '4. Kontakt' : '4. Contact'}
            </h2>
            <p className="text-gray-700">
              {isPl ? 'Jeśli masz pytania dotyczące tej Polityki Prywatności, skontaktuj się z nami:' : 'If you have questions about this Privacy Policy, please contact us:'}
            </p>
            <div className="bg-gray-50 p-6 rounded-lg border border-gray-200 space-y-2 mt-4">
              <p className="text-gray-900 font-semibold">
                {isPl ? 'Hydraulika & Woda' : 'Hydraulics & Water Systems'}
              </p>
              <p className="text-gray-700">
                Email:{' '}
                <a href="mailto:contact@hydraulics-water.nl" className="text-blue-600 hover:text-blue-700">
                  contact@hydraulics-water.nl
                </a>
              </p>
              <p className="text-gray-700">
                {isPl ? 'Telefon:' : 'Phone:'}{' '}
                <a href="tel:+31625379014" className="text-blue-600 hover:text-blue-700">
                  +31 6 25379014
                </a>
              </p>
              <p className="text-gray-700">
                {isPl ? 'Odpowiadamy w ciągu 30 dni roboczych.' : 'We respond within 30 business days.'}
              </p>
            </div>
          </section>

          {/* CTA */}
          <section className="mt-12 pt-8 border-t border-gray-200">
            <p className="text-gray-700 mb-6">
              {isPl ? 'Pytania? Skontaktuj się z nami bezpośrednio.' : 'Questions? Contact us directly.'}
            </p>
            <Link
              href={`/${locale}`}
              className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors"
            >
              <ArrowLeft size={18} />
              {isPl ? 'Wróć do strony głównej' : 'Back to Home'}
            </Link>
          </section>
        </div>
      </article>
    </main>
  )
}

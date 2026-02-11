import type { Metadata } from 'next'
import { getTranslations, isValidLocale } from '@/lib/i18n'

interface Props {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params
  const t = getTranslations(locale)
  const isEn = locale === 'en'

  return {
    title: t.metadata.titleMain,
    description: t.metadata.descriptionMain,
    keywords: isEn
      ? 'water softeners, reverse osmosis, heating systems, plumbing, Netherlands'
      : 'hydraulika, uzdatnianie wody, zmiękczacze, odwrócona osmoza, serwis wody, Limburg',
    authors: [{ name: isEn ? 'Hydraulics & Water Systems' : 'Hydraulika & Woda' }],
    openGraph: {
      title: t.metadata.titleMain,
      description: t.metadata.descriptionMain,
      url: `https://mshydropro.nl/${locale}`,
      type: 'website',
      siteName: isEn ? 'Hydraulics & Water Systems' : 'Hydraulika & Woda',
      locale: locale === 'pl' ? 'pl_PL' : 'en_US',
      alternateLocale: locale === 'pl' ? 'en_US' : 'pl_PL',
      images: [
        {
          url: 'https://mshydropro.nl/og-image.jpg',
          width: 1200,
          height: 630,
          alt: isEn ? 'Professional hydraulic and water services' : 'Usługi hydrauliczne i uzdatniania wody',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: t.metadata.titleMain,
      description: t.metadata.descriptionMain,
    },
    robots: {
      index: true,
      follow: true,
    },
    alternates: {
      canonical: `https://mshydropro.nl/${locale}`,
      languages: {
        'pl': 'https://mshydropro.nl/pl',
        'en': 'https://mshydropro.nl/en',
      },
    },
  }
}

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params

  if (!isValidLocale(locale)) {
    return null
  }

  return children
}

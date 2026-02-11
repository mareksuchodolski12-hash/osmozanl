'use client'

import Header from '@/components/Header'
import Hero from '@/components/Hero'
import TrustBar from '@/components/TrustBar'
import Services from '@/components/Services'
import HowItWorks from '@/components/HowItWorks'
import FAQ from '@/components/FAQ'
import Contact from '@/components/Contact'
import FloatingButtons from '@/components/FloatingButtons'
import Footer from '@/components/Footer'

export default function Home() {
  return (
    <main>
      <Header />
      <Hero />
      <TrustBar />
      <Services />
      <HowItWorks />
      <FAQ />
      <Contact />
      <Footer />
      <FloatingButtons />
    </main>
  )
}

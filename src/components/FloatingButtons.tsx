'use client'

import { useEffect, useState } from 'react'
import { Phone, MessageCircle, ArrowUp } from 'lucide-react'

const PHONE_NUMBER = '+31 6 25379014'
const WHATSAPP_LINK = 'https://wa.me/31625379014'

const FloatingButtonComponent = ({
  onClick,
  href,
  icon: Icon,
  label,
  tooltip,
  colorClass,
  isExternal = false,
  isAnimated = false,
}: {
  onClick?: () => void
  href?: string
  icon: React.ElementType
  label: string
  tooltip: string
  colorClass: string
  isExternal?: boolean
  isAnimated?: boolean
}) => {
  const baseClasses =
    'pointer-events-auto relative group flex items-center justify-center w-12 sm:w-14 h-12 sm:h-14 text-white rounded-full shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-110 active:scale-95 focus:outline-none'

  const content = (
    <>
      <div className="flex items-center justify-center w-6 sm:w-7 h-6 sm:h-7">
        <Icon size={24} />
      </div>

      {/* Tooltip */}
      <div className="absolute right-16 sm:right-20 bottom-1/2 transform translate-y-1/2 px-3 py-2 bg-gray-900 text-white text-xs sm:text-sm font-medium rounded-lg whitespace-nowrap opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-200 shadow-lg">
        {tooltip}
        {/* Tooltip arrow */}
        <div className="absolute left-full top-1/2 transform -translate-y-1/2 border-4 border-transparent border-l-gray-900"></div>
      </div>
    </>
  )

  if (href) {
    return (
      <a
        href={href}
        target={isExternal ? '_blank' : undefined}
        rel={isExternal ? 'noopener noreferrer' : undefined}
        className={`${baseClasses} ${colorClass} ${isAnimated ? 'animate-bounce-subtle' : ''}`}
        aria-label={label}
      >
        {content}
      </a>
    )
  }

  return (
    <button
      onClick={onClick}
      className={`${baseClasses} ${colorClass} ${isAnimated ? 'animate-bounce-subtle' : ''}`}
      aria-label={label}
    >
      {content}
    </button>
  )
}

export default function FloatingButtons() {
  const [showScrollTop, setShowScrollTop] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 300)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handlePhoneClick = () => {
    window.location.href = `tel:${PHONE_NUMBER.replace(/\s/g, '')}`
  }

  return (
    <div className="fixed bottom-4 sm:bottom-6 right-4 sm:right-6 flex flex-col gap-2 sm:gap-3 z-50 pointer-events-none">
      {/* WhatsApp Button */}
      <FloatingButtonComponent
        href={WHATSAPP_LINK}
        icon={MessageCircle}
        label="WhatsApp"
        tooltip="WhatsApp"
        colorClass="bg-green-500 hover:bg-green-600"
        isExternal
      />

      {/* Call Button */}
      <FloatingButtonComponent
        onClick={handlePhoneClick}
        icon={Phone}
        label="Zadzwoń"
        tooltip="Zadzwoń"
        colorClass="bg-blue-600 hover:bg-blue-700"
      />

      {/* Scroll to Top Button */}
      {showScrollTop && (
        <FloatingButtonComponent
          onClick={scrollToTop}
          icon={ArrowUp}
          label="Do góry"
          tooltip="Do góry"
          colorClass="bg-gray-700 hover:bg-gray-800"
          isAnimated
        />
      )}
    </div>
  )
}

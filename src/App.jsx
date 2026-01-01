import { useState, useEffect, useRef, useMemo, useCallback } from 'react'
import Lenis from 'lenis'
import './index.css'

// Initialize Lenis smooth scroll
function useLenis() {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
    })

    function raf(time) {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }
    requestAnimationFrame(raf)

    return () => lenis.destroy()
  }, [])
}

// Custom hook for Intersection Observer (scroll reveal animations)
function useInView(options = {}) {
  const ref = useRef(null)
  const [isInView, setIsInView] = useState(false)

  useEffect(() => {
    const element = ref.current
    if (!element) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true)
          observer.unobserve(element) // Only trigger once
        }
      },
      { threshold: 0.1, ...options }
    )

    observer.observe(element)
    return () => observer.disconnect()
  }, [])

  return [ref, isInView]
}

// Custom hook for parallax effect
function useParallax(speed = 0.5) {
  const [offset, setOffset] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      setOffset(window.scrollY * speed)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [speed])

  return offset
}

// Loading Screen Component
function LoadingScreen({ onComplete }) {
  const [progress, setProgress] = useState(0)
  const [isComplete, setIsComplete] = useState(false)

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval)
          setTimeout(() => {
            setIsComplete(true)
            setTimeout(onComplete, 500)
          }, 300)
          return 100
        }
        return prev + Math.random() * 15
      })
    }, 100)

    return () => clearInterval(interval)
  }, [onComplete])

  return (
    <div
      className={`fixed inset-0 z-[100] bg-void flex flex-col items-center justify-center transition-opacity duration-500 ${
        isComplete ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
    >
      <div className="relative mb-8">
        <span
          className="font-display text-8xl text-holographic glow-gold-intense"
          style={{ animation: 'fractalPulse 2s ease-in-out infinite' }}
        >
          W
        </span>
        <div className="absolute inset-0 flex items-center justify-center">
          <div
            className="w-32 h-32 border border-gold/20 rounded-full"
            style={{ animation: 'spiralGrow 4s linear infinite' }}
          />
        </div>
      </div>
      <div className="w-48 h-1 bg-void-deep rounded-full overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-gold-dim via-gold to-gold-bright transition-all duration-300"
          style={{ width: `${Math.min(progress, 100)}%` }}
        />
      </div>
      <p className="mt-4 font-body text-sm text-cream/40 tracking-widest">
        {progress < 100 ? 'Awakening...' : 'Enter'}
      </p>
    </div>
  )
}

// Cursor Glow Effect Component with Stardust Trail
function CursorGlow() {
  const [position, setPosition] = useState({ x: -100, y: -100 })
  const [isVisible, setIsVisible] = useState(false)
  const [isTouchDevice, setIsTouchDevice] = useState(false)
  const trailRef = useRef([])
  const lastPositionRef = useRef({ x: 0, y: 0 })

  useEffect(() => {
    setIsTouchDevice('ontouchstart' in window)
  }, [])

  useEffect(() => {
    if (isTouchDevice) return

    const handleMouseMove = (e) => {
      setPosition({ x: e.clientX, y: e.clientY })
      setIsVisible(true)

      // Create stardust particles on movement
      const distance = Math.hypot(
        e.clientX - lastPositionRef.current.x,
        e.clientY - lastPositionRef.current.y
      )

      if (distance > 15) {
        lastPositionRef.current = { x: e.clientX, y: e.clientY }
        createStardustParticle(e.clientX, e.clientY)
      }
    }

    const handleMouseLeave = () => setIsVisible(false)

    window.addEventListener('mousemove', handleMouseMove)
    document.addEventListener('mouseleave', handleMouseLeave)

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseleave', handleMouseLeave)
    }
  }, [isTouchDevice])

  const createStardustParticle = (x, y) => {
    const particle = document.createElement('div')
    particle.className = 'stardust-particle'
    particle.style.left = `${x + (Math.random() - 0.5) * 10}px`
    particle.style.top = `${y + (Math.random() - 0.5) * 10}px`
    document.body.appendChild(particle)

    setTimeout(() => {
      particle.remove()
    }, 1000)
  }

  if (isTouchDevice) return null

  return (
    <div
      className="fixed pointer-events-none z-[60] transition-opacity duration-300"
      style={{
        left: position.x,
        top: position.y,
        opacity: isVisible ? 1 : 0,
        transform: 'translate(-50%, -50%)',
      }}
    >
      <div
        className="w-96 h-96 rounded-full"
        style={{
          background: 'radial-gradient(circle, rgba(201, 168, 76, 0.1) 0%, rgba(201, 168, 76, 0.03) 40%, transparent 60%)',
          filter: 'blur(30px)',
        }}
      />
      {/* Inner bright core */}
      <div
        className="absolute top-1/2 left-1/2 w-4 h-4 -translate-x-1/2 -translate-y-1/2 rounded-full"
        style={{
          background: 'radial-gradient(circle, rgba(252, 246, 186, 0.6) 0%, transparent 70%)',
          filter: 'blur(2px)',
        }}
      />
    </div>
  )
}

// Mobile Thumb Zone Navigation Orb
function MobileThumbOrb() {
  const [isOpen, setIsOpen] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768)
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  if (!isMobile) return null

  const navItems = ['Values', 'Philosophy', 'Practices', 'Scripture', 'Community']

  const handleNavClick = (item) => {
    const element = document.getElementById(item.toLowerCase())
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
    setIsOpen(false)
    // Haptic feedback
    if (navigator.vibrate) {
      navigator.vibrate(5)
    }
  }

  return (
    <>
      {/* Backdrop */}
      <div
        className={`fixed inset-0 bg-void/80 backdrop-blur-sm z-40 transition-opacity duration-300 ${
          isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={() => setIsOpen(false)}
      />

      {/* Navigation Menu */}
      <div
        className={`fixed bottom-24 left-1/2 -translate-x-1/2 z-50 transition-all duration-500 ${
          isOpen ? 'opacity-100 scale-100' : 'opacity-0 scale-75 pointer-events-none'
        }`}
      >
        <div className="flex flex-col items-center gap-3">
          {navItems.map((item, i) => (
            <button
              key={item}
              onClick={() => handleNavClick(item)}
              className="px-6 py-3 glass-dimensional rounded-full text-cream/80 hover:text-gold font-body text-sm transition-all duration-300"
              style={{
                transitionDelay: isOpen ? `${i * 50}ms` : '0ms',
                transform: isOpen ? 'translateY(0)' : 'translateY(20px)',
              }}
            >
              {item}
            </button>
          ))}
        </div>
      </div>

      {/* The Orb */}
      <button
        onClick={() => {
          setIsOpen(!isOpen)
          if (navigator.vibrate) navigator.vibrate(5)
        }}
        className="thumb-orb"
        aria-label="Open navigation"
        aria-expanded={isOpen}
      >
        <svg
          className={`w-6 h-6 text-gold transition-transform duration-300 ${isOpen ? 'rotate-45' : ''}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          {isOpen ? (
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 4v16m8-8H4" />
          ) : (
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 6h16M4 12h16M4 18h16" />
          )}
        </svg>
      </button>
    </>
  )
}

// Text Decoder Effect Component
function DecodingText({ text, isVisible, className = '' }) {
  const [displayText, setDisplayText] = useState('')
  const [isDecoding, setIsDecoding] = useState(false)
  const chars = 'ΦΨΩαβγδεζηθλμνξπρστφχψω◊◈◇○●□■△▽☉☽★'

  useEffect(() => {
    if (!isVisible || isDecoding) return

    setIsDecoding(true)
    let iteration = 0
    const maxIterations = text.length * 3

    const interval = setInterval(() => {
      setDisplayText(
        text
          .split('')
          .map((char, index) => {
            if (char === ' ') return ' '
            if (index < iteration / 3) return text[index]
            return chars[Math.floor(Math.random() * chars.length)]
          })
          .join('')
      )

      if (iteration >= maxIterations) {
        clearInterval(interval)
        setDisplayText(text)
        setIsDecoding(false)
      }

      iteration += 1
    }, 30)

    return () => clearInterval(interval)
  }, [isVisible, text])

  return <span className={`decode-text ${className}`}>{displayText || text}</span>
}

// Modal Component for Tarot Cards
function TarotModal({ isOpen, onClose, card }) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [isOpen])

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') onClose()
    }
    if (isOpen) {
      window.addEventListener('keydown', handleEscape)
      return () => window.removeEventListener('keydown', handleEscape)
    }
  }, [isOpen, onClose])

  if (!isOpen || !card) return null

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 overflow-hidden"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
      data-lenis-prevent
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-void/95 backdrop-blur-xl" />

      {/* Modal Content */}
      <div
        className="relative z-10 w-full max-w-4xl max-h-[90vh] overflow-y-auto overscroll-contain rounded-2xl bg-gradient-to-b from-void-deep via-void to-void-deep border border-gold/20 shadow-[0_0_100px_-20px_rgba(201,168,76,0.3)]"
        onClick={(e) => e.stopPropagation()}
        data-lenis-prevent
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 w-10 h-10 flex items-center justify-center rounded-full glass-dimensional text-cream/60 hover:text-gold transition-colors"
          aria-label="Close modal"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Header with Tarot Card Preview */}
        <div className="relative p-8 pb-0">
          <div className="flex flex-col md:flex-row gap-8 items-center md:items-start">
            {/* Mini Tarot Card */}
            <div className="w-48 h-72 flex-shrink-0 rounded-xl overflow-hidden border-2 border-gold/30 shadow-[0_0_30px_-10px_rgba(201,168,76,0.4)]">
              <div className="relative w-full h-full bg-gradient-to-b from-indigo-deep via-void to-indigo-deep">
                {/* Card Image */}
                {card.image && (
                  <img
                    src={card.image}
                    alt={`${card.name} tarot illustration`}
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                )}
                {/* Overlay with name */}
                <div className="absolute inset-0 bg-gradient-to-t from-void via-transparent to-transparent" />
                <div className="absolute bottom-0 inset-x-0 p-4 text-center">
                  <div className="font-display text-xl text-gold">{card.name}</div>
                  <div className="font-display text-2xl text-cream/30 mt-1">{card.letter}</div>
                </div>
              </div>
            </div>

            {/* Title and Subtitle */}
            <div className="flex-1 text-center md:text-left">
              <span className="inline-block px-3 py-1 text-xs tracking-widest uppercase text-gold/80 glass-dimensional rounded-full mb-4">
                {card.arcana}
              </span>
              <h2 id="modal-title" className="font-display text-4xl md:text-5xl text-cream mb-4">
                <span className="text-alchemical-gold">{card.letter}</span> — {card.name}
              </h2>
              <p className="font-body text-lg text-cream/60 italic mb-6">{card.subtitle}</p>
              <div className="flex flex-wrap gap-2">
                {card.keywords.map((keyword, i) => (
                  <span key={i} className="px-3 py-1 text-xs font-body text-gold/70 glass-dimensional rounded-full">
                    {keyword}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="mx-8 my-8 h-px bg-gradient-to-r from-transparent via-gold/30 to-transparent" />

        {/* Content Sections */}
        <div className="px-8 pb-8 space-y-8">
          {/* Main Description */}
          <div>
            <h3 className="font-display text-xl text-gold mb-4 flex items-center gap-3">
              <span className="w-8 h-px bg-gold/50" />
              Essence
            </h3>
            <p className="font-body text-cream/70 leading-relaxed">{card.essence}</p>
          </div>

          {/* Virtues */}
          <div>
            <h3 className="font-display text-xl text-gold mb-4 flex items-center gap-3">
              <span className="w-8 h-px bg-gold/50" />
              Associated Virtues
            </h3>
            <div className="grid md:grid-cols-2 gap-4">
              {card.virtues.map((virtue, i) => (
                <div key={i} className="p-4 rounded-lg glass-dimensional">
                  <h4 className="font-display text-cream mb-2">{virtue.name}</h4>
                  <p className="font-body text-sm text-cream/50">{virtue.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Quote */}
          <div className="p-6 rounded-xl bg-gold/5 border border-gold/10">
            <blockquote className="font-display text-lg text-cream/80 italic text-center">
              "{card.quote.text}"
            </blockquote>
            <p className="text-center text-gold/60 text-sm mt-3">— {card.quote.source}</p>
          </div>

          {/* Practices */}
          <div>
            <h3 className="font-display text-xl text-gold mb-4 flex items-center gap-3">
              <span className="w-8 h-px bg-gold/50" />
              Cultivating {card.name}
            </h3>
            <ul className="space-y-3">
              {card.practices.map((practice, i) => (
                <li key={i} className="flex items-start gap-3 font-body text-cream/60">
                  <span className="text-gold mt-1">◈</span>
                  {practice}
                </li>
              ))}
            </ul>
          </div>

          {/* Shadow Aspect */}
          <div className="p-6 rounded-xl bg-void-deep border border-gold/5">
            <h3 className="font-display text-lg text-cream/80 mb-3">The Shadow of {card.name}</h3>
            <p className="font-body text-sm text-cream/50">{card.shadow}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

// Tarot Card Component
function TarotCard({ card, onClick, index }) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <div
      className="group relative cursor-pointer perspective-1000"
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === 'Enter' && onClick()}
      aria-label={`View ${card.name} tarot card`}
    >
      {/* Card Container with 3D effect */}
      <div
        className="relative w-full aspect-[2/3] transform-style-3d transition-all duration-700 ease-out"
        style={{
          transform: isHovered ? 'rotateY(5deg) rotateX(-5deg) translateY(-10px) scale(1.02)' : 'rotateY(0) rotateX(0) translateY(0) scale(1)',
        }}
      >
        {/* Glow Effect */}
        <div
          className="absolute -inset-4 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 blur-2xl"
          style={{
            background: `radial-gradient(ellipse at center, ${card.glowColor}40 0%, transparent 70%)`,
          }}
        />

        {/* Animated Border */}
        <div
          className="absolute -inset-[2px] rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          style={{
            background: `conic-gradient(from var(--angle, ${index * 72}deg) at 50% 50%, transparent 0%, ${card.glowColor} 10%, transparent 20%)`,
            animation: 'border-spin 4s linear infinite',
          }}
        />

        {/* Main Card */}
        <div className="relative h-full rounded-2xl overflow-hidden bg-gradient-to-b from-[#0d0d14] via-[#0a0a0f] to-[#050508] border border-gold/20 shadow-[0_10px_40px_-10px_rgba(0,0,0,0.8)]">
          {/* Decorative Border Frame */}
          <div className="absolute inset-3 rounded-xl border border-gold/10 pointer-events-none" />
          <div className="absolute inset-5 rounded-lg border border-gold/5 pointer-events-none" />

          {/* Top Ornament */}
          <div className="absolute top-4 left-1/2 -translate-x-1/2 w-24 h-6 flex items-center justify-center">
            <svg viewBox="0 0 100 30" className="w-full h-full text-gold/30">
              <path d="M10 15 L30 5 L50 15 L70 5 L90 15" stroke="currentColor" fill="none" strokeWidth="0.5" />
              <circle cx="50" cy="15" r="3" fill="currentColor" />
              <circle cx="30" cy="10" r="1.5" fill="currentColor" />
              <circle cx="70" cy="10" r="1.5" fill="currentColor" />
            </svg>
          </div>

          {/* Card Number */}
          <div className="absolute top-6 left-6 font-display text-sm text-gold/40">
            {String(index + 1).padStart(2, '0')}
          </div>

          {/* Letter Numeral */}
          <div className="absolute top-6 right-6 font-display text-lg text-gold/30">
            {['I', 'II', 'III', 'IV', 'V'][index]}
          </div>

          {/* Illustration Area */}
          <div className="absolute inset-x-6 top-12 bottom-24 rounded-lg overflow-hidden">
            {/* Generated Image */}
            {card.image && (
              <img
                src={card.image}
                alt={`${card.name} tarot illustration`}
                className="absolute inset-0 w-full h-full object-cover transition-all duration-700 group-hover:scale-105"
                style={{
                  filter: isHovered ? 'brightness(1.1) saturate(1.2)' : 'brightness(0.9)',
                }}
              />
            )}

            {/* Mystical Overlay */}
            <div
              className="absolute inset-0 opacity-40 group-hover:opacity-20 transition-opacity duration-700"
              style={{
                background: `radial-gradient(ellipse at center, transparent 30%, ${card.glowColor}20 70%, #0a0a0f 100%)`,
              }}
            />

            {/* Vignette */}
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                boxShadow: 'inset 0 0 40px 10px rgba(10, 10, 15, 0.8)',
              }}
            />
          </div>

          {/* Title Banner */}
          <div className="absolute bottom-16 inset-x-0 text-center">
            <div className="relative inline-block">
              {/* Banner Background */}
              <svg className="absolute -inset-x-8 -inset-y-2 w-[calc(100%+4rem)] h-[calc(100%+1rem)]" viewBox="0 0 200 50" preserveAspectRatio="none">
                <path d="M10 25 L30 10 L170 10 L190 25 L170 40 L30 40 Z" fill="rgba(201, 168, 76, 0.1)" stroke="rgba(201, 168, 76, 0.3)" strokeWidth="0.5" />
              </svg>
              <h3 className="relative font-display text-xl md:text-2xl text-gold tracking-wider px-4">
                {card.name}
              </h3>
            </div>
          </div>

          {/* Letter Badge */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2">
            <div className="w-10 h-10 rounded-full border border-gold/30 flex items-center justify-center bg-void/50">
              <span className="font-display text-lg text-gold/80">{card.letter}</span>
            </div>
          </div>

          {/* Corner Ornaments */}
          {['top-3 left-3', 'top-3 right-3 scale-x-[-1]', 'bottom-3 left-3 scale-y-[-1]', 'bottom-3 right-3 scale-[-1]'].map((pos, i) => (
            <div key={i} className={`absolute ${pos} w-6 h-6 text-gold/20`}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="0.5">
                <path d="M3 3 L12 3 M3 3 L3 12" />
                <circle cx="3" cy="3" r="1.5" fill="currentColor" />
              </svg>
            </div>
          ))}

          {/* Hover Instruction */}
          <div className="absolute bottom-2 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-500 text-xs text-cream/30 font-body">
            Click to reveal
          </div>
        </div>
      </div>
    </div>
  )
}

// Practice Modal Component with Video
function PracticeModal({ isOpen, onClose, practice }) {
  const videoRef = useRef(null)

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
      // Auto-play video when modal opens
      if (videoRef.current) {
        videoRef.current.play().catch(() => {})
      }
    } else {
      document.body.style.overflow = ''
      // Pause video when modal closes
      if (videoRef.current) {
        videoRef.current.pause()
        videoRef.current.currentTime = 0
      }
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [isOpen])

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') onClose()
    }
    if (isOpen) {
      window.addEventListener('keydown', handleEscape)
      return () => window.removeEventListener('keydown', handleEscape)
    }
  }, [isOpen, onClose])

  if (!isOpen || !practice) return null

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 overflow-hidden"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="practice-modal-title"
      data-lenis-prevent
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-void/98 backdrop-blur-xl" />

      {/* Modal Content */}
      <div
        className="relative z-10 w-full max-w-5xl max-h-[90vh] overflow-y-auto overscroll-contain rounded-2xl bg-void-deep border border-gold/20 shadow-[0_0_100px_-20px_rgba(201,168,76,0.3)]"
        onClick={(e) => e.stopPropagation()}
        data-lenis-prevent
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 w-10 h-10 flex items-center justify-center rounded-full glass-dimensional text-cream/60 hover:text-gold transition-colors"
          aria-label="Close modal"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Video Container */}
        <div className="relative w-full aspect-video bg-black rounded-t-2xl overflow-hidden">
          <video
            ref={videoRef}
            src={practice.video}
            className="w-full h-full object-cover"
            loop
            muted
            playsInline
            controls
          />
          {/* Vignette overlay */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              boxShadow: 'inset 0 0 100px 20px rgba(0, 0, 0, 0.5)',
            }}
          />
        </div>

        {/* Content */}
        <div className="p-8">
          {/* Header */}
          <div className="flex items-center gap-4 mb-6">
            <div
              className="text-4xl"
              style={{ animation: 'fractalPulse 6s ease-in-out infinite' }}
            >
              {practice.icon}
            </div>
            <div>
              <span className="inline-block px-3 py-1 text-xs tracking-widest uppercase text-gold/80 glass-dimensional rounded-full mb-2">
                Practice
              </span>
              <h2 id="practice-modal-title" className="font-display text-3xl md:text-4xl text-cream">
                {practice.title}
              </h2>
            </div>
          </div>

          {/* Divider */}
          <div className="h-px bg-gradient-to-r from-transparent via-gold/30 to-transparent mb-6" />

          {/* Description */}
          <p className="font-body text-lg text-cream/70 leading-relaxed mb-8">
            {practice.fullDescription}
          </p>

          {/* Benefits */}
          {practice.benefits && (
            <div className="mb-8">
              <h3 className="font-display text-xl text-gold mb-4 flex items-center gap-3">
                <span className="w-8 h-px bg-gold/50" />
                Benefits
              </h3>
              <ul className="grid md:grid-cols-2 gap-3">
                {practice.benefits.map((benefit, i) => (
                  <li key={i} className="flex items-start gap-3 font-body text-cream/60">
                    <span className="text-gold mt-1">◈</span>
                    {benefit}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* How to Begin */}
          {practice.howToBegin && (
            <div className="p-6 rounded-xl bg-gold/5 border border-gold/10">
              <h3 className="font-display text-lg text-gold mb-3">How to Begin</h3>
              <p className="font-body text-cream/60">{practice.howToBegin}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

// Scroll Progress Indicator
function ScrollProgress() {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight
      const scrollProgress = (window.scrollY / totalHeight) * 100
      setProgress(scrollProgress)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div className="fixed top-0 left-0 right-0 h-[2px] z-[51] bg-void-deep">
      <div
        className="h-full bg-gradient-to-r from-gold-dim via-gold to-gold-bright transition-all duration-150"
        style={{ width: `${progress}%` }}
      />
    </div>
  )
}

// Reveal Animation Wrapper
function RevealOnScroll({ children, delay = 0, className = '' }) {
  const [ref, isInView] = useInView()

  return (
    <div
      ref={ref}
      className={`transition-all duration-1000 ${className}`}
      style={{
        opacity: isInView ? 1 : 0,
        transform: isInView ? 'translateY(0)' : 'translateY(40px)',
        transitionDelay: `${delay}ms`,
      }}
    >
      {typeof children === 'function' ? children({ isInView }) : children}
    </div>
  )
}

// Fractal Sacred Geometry - Multi-layered
function FractalGeometry({ className = '', layers = 3 }) {
  return (
    <div className={`absolute ${className}`}>
      {[...Array(layers)].map((_, i) => (
        <svg
          key={i}
          className="absolute inset-0 w-full h-full text-gold"
          viewBox="0 0 200 200"
          fill="none"
          style={{
            opacity: 0.15 - i * 0.04,
            transform: `scale(${1 + i * 0.15}) rotate(${i * 15}deg)`,
            animation: `spiralGrow ${100 + i * 20}s linear infinite ${i % 2 === 0 ? '' : 'reverse'}`,
          }}
        >
          {/* Outer circles */}
          <circle cx="100" cy="100" r="80" stroke="currentColor" strokeWidth="0.3" />
          <circle cx="100" cy="100" r="60" stroke="currentColor" strokeWidth="0.3" />
          <circle cx="100" cy="100" r="40" stroke="currentColor" strokeWidth="0.3" />
          <circle cx="100" cy="100" r="20" stroke="currentColor" strokeWidth="0.2" />

          {/* Star tetrahedron */}
          <polygon points="100,20 180,140 20,140" stroke="currentColor" strokeWidth="0.3" fill="none" />
          <polygon points="100,180 20,60 180,60" stroke="currentColor" strokeWidth="0.3" fill="none" />

          {/* Flower of life seeds */}
          <circle cx="100" cy="40" r="20" stroke="currentColor" strokeWidth="0.2" />
          <circle cx="60" cy="130" r="20" stroke="currentColor" strokeWidth="0.2" />
          <circle cx="140" cy="130" r="20" stroke="currentColor" strokeWidth="0.2" />
          <circle cx="60" cy="70" r="20" stroke="currentColor" strokeWidth="0.2" />
          <circle cx="140" cy="70" r="20" stroke="currentColor" strokeWidth="0.2" />
          <circle cx="100" cy="160" r="20" stroke="currentColor" strokeWidth="0.2" />
        </svg>
      ))}
    </div>
  )
}

// Mycelium Network - Biological neural growth
function MyceliumNetwork() {
  const nodes = Array.from({ length: 25 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: 1 + Math.random() * 2,
    delay: Math.random() * 10,
  }))

  return (
    <svg className="absolute inset-0 w-full h-full" preserveAspectRatio="none">
      <defs>
        <filter id="glow">
          <feGaussianBlur stdDeviation="2" result="coloredBlur" />
          <feMerge>
            <feMergeNode in="coloredBlur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* Connections */}
      {nodes.map((node, i) => {
        const connections = nodes
          .filter((n, j) => j !== i && Math.hypot(n.x - node.x, n.y - node.y) < 30)
          .slice(0, 3)

        return connections.map((target, j) => (
          <path
            key={`${i}-${j}`}
            d={`M${node.x}% ${node.y}% Q${(node.x + target.x) / 2 + (Math.random() - 0.5) * 10}% ${(node.y + target.y) / 2 + (Math.random() - 0.5) * 10}% ${target.x}% ${target.y}%`}
            stroke="rgba(201, 168, 76, 0.08)"
            strokeWidth="0.5"
            fill="none"
            style={{
              animation: `organicGrow ${8 + Math.random() * 4}s ease-in-out infinite`,
              animationDelay: `${node.delay}s`,
            }}
          />
        ))
      })}

      {/* Nodes */}
      {nodes.map((node) => (
        <circle
          key={node.id}
          cx={`${node.x}%`}
          cy={`${node.y}%`}
          r={node.size}
          fill="rgba(201, 168, 76, 0.15)"
          filter="url(#glow)"
          style={{
            animation: `organicGrow ${6 + Math.random() * 4}s ease-in-out infinite`,
            animationDelay: `${node.delay}s`,
          }}
        />
      ))}
    </svg>
  )
}

// Nebula Layer - Astronomical depth
function NebulaLayer() {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {/* Deep space nebulae */}
      <div
        className="absolute w-[800px] h-[800px] rounded-full opacity-30 organic-grow"
        style={{
          background: 'radial-gradient(ellipse, rgba(168, 158, 201, 0.2) 0%, transparent 70%)',
          top: '-20%',
          left: '-20%',
          filter: 'blur(60px)',
        }}
      />
      <div
        className="absolute w-[600px] h-[600px] rounded-full opacity-25 organic-grow"
        style={{
          background: 'radial-gradient(ellipse, rgba(201, 168, 76, 0.15) 0%, transparent 70%)',
          bottom: '-10%',
          right: '-15%',
          filter: 'blur(80px)',
          animationDelay: '4s',
        }}
      />
      <div
        className="absolute w-[500px] h-[500px] rounded-full opacity-20 organic-grow"
        style={{
          background: 'radial-gradient(ellipse, rgba(37, 32, 64, 0.4) 0%, transparent 60%)',
          top: '30%',
          left: '40%',
          filter: 'blur(50px)',
          animationDelay: '2s',
        }}
      />
      {/* Star field layer */}
      <div
        className="absolute w-[400px] h-[400px] rounded-full opacity-15"
        style={{
          background: 'radial-gradient(circle, rgba(232, 213, 163, 0.1) 0%, transparent 50%)',
          top: '50%',
          right: '30%',
          filter: 'blur(40px)',
          animation: 'fractalPulse 20s ease-in-out infinite',
        }}
      />
    </div>
  )
}

// Particle Field with growth behavior
function ParticleField() {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {/* Gold dust particles */}
      {[...Array(50)].map((_, i) => (
        <div
          key={i}
          className="absolute rounded-full bg-gold"
          style={{
            width: `${1 + Math.random() * 2}px`,
            height: `${1 + Math.random() * 2}px`,
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            opacity: 0.1 + Math.random() * 0.2,
            animation: `particle ${20 + Math.random() * 25}s linear infinite`,
            animationDelay: `${Math.random() * 20}s`,
          }}
        />
      ))}
      {/* Distant stars */}
      {[...Array(30)].map((_, i) => (
        <div
          key={`star-${i}`}
          className="absolute w-px h-px bg-cream rounded-full"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            opacity: 0.2 + Math.random() * 0.4,
            animation: `fractalPulse ${8 + Math.random() * 8}s ease-in-out infinite`,
            animationDelay: `${Math.random() * 8}s`,
          }}
        />
      ))}
    </div>
  )
}

// Navigation with Floating Island pattern (2025 design)
function Navigation() {
  const [scrolled, setScrolled] = useState(false)
  const [activeSection, setActiveSection] = useState('')

  const navItems = ['Values', 'Philosophy', 'Practices', 'Scripture']

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)

      // Determine active section
      const sections = [...navItems, 'Community'].map((item) => document.getElementById(item.toLowerCase()))
      const scrollPosition = window.scrollY + 150

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i]
        if (section && section.offsetTop <= scrollPosition) {
          setActiveSection([...navItems, 'Community'][i].toLowerCase())
          break
        }
      }

      if (window.scrollY < 200) {
        setActiveSection('')
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleNavClick = (e, item) => {
    e.preventDefault()
    const element = document.getElementById(item.toLowerCase())
    if (element) {
      const offset = 80
      const elementPosition = element.offsetTop - offset
      window.scrollTo({ top: elementPosition, behavior: 'smooth' })
    }
  }

  return (
    <nav
      className={`fixed top-4 md:top-6 left-1/2 -translate-x-1/2 z-50 w-[calc(100%-2rem)] md:w-auto max-w-fit transition-all duration-500 ${
        scrolled ? 'opacity-100 translate-y-0' : 'opacity-90'
      }`}
      role="navigation"
      aria-label="Main navigation"
    >
      <div className="px-2 py-2 rounded-full glass-premium nav-island flex items-center gap-1">
        {/* Logo / Home */}
        <a
          href="#"
          onClick={(e) => {
            e.preventDefault()
            window.scrollTo({ top: 0, behavior: 'smooth' })
          }}
          className="w-10 h-10 flex items-center justify-center rounded-full bg-void/50 text-gold font-display font-bold text-xl hover:bg-gold hover:text-void transition-colors duration-300"
          aria-label="WHOLE - Return to top"
        >
          W
        </a>

        {/* Divider */}
        <div className="w-[1px] h-6 bg-white/10 mx-1 md:mx-2 hidden md:block" />

        {/* Nav Items - Hidden on mobile, shown on desktop */}
        <div className="hidden md:flex items-center gap-1">
          {navItems.map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase()}`}
              onClick={(e) => handleNavClick(e, item)}
              className={`relative px-4 lg:px-5 py-2 rounded-full text-sm font-body transition-all duration-300 group overflow-hidden ${
                activeSection === item.toLowerCase()
                  ? 'text-gold bg-gold/10'
                  : 'text-cream/70 hover:text-white hover:bg-white/5'
              }`}
              aria-current={activeSection === item.toLowerCase() ? 'true' : undefined}
            >
              <span className="relative z-10">{item}</span>

              {/* Hover Spotlight Effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 ease-in-out" />
            </a>
          ))}
        </div>

        {/* CTA Button */}
        <div className="hidden md:flex pl-1 md:pl-2">
          <a
            href="#community"
            onClick={(e) => handleNavClick(e, 'community')}
            className="px-4 py-2 rounded-full bg-gold text-void font-display font-semibold text-xs uppercase tracking-wider hover:bg-cream transition-colors shadow-[0_0_20px_-5px_rgba(201,168,76,0.5)]"
          >
            Join
          </a>
        </div>
      </div>
    </nav>
  )
}

// Hero Section - Hyper-dimensional with parallax
function HeroSection() {
  const parallaxOffset = useParallax(0.3)

  return (
    <section className="relative min-h-screen flex items-center justify-center nebula-bg overflow-hidden">
      {/* Parallax background layers */}
      <div
        style={{ transform: `translateY(${parallaxOffset * 0.5}px)` }}
        className="absolute inset-0"
      >
        <NebulaLayer />
      </div>

      <div
        style={{ transform: `translateY(${parallaxOffset * 0.3}px)` }}
        className="absolute inset-0"
      >
        <MyceliumNetwork />
      </div>

      <div style={{ transform: `translateY(${parallaxOffset * 0.8}px)` }}>
        <FractalGeometry className="w-[800px] h-[800px] -top-40 -right-40" layers={4} />
      </div>
      <div style={{ transform: `translateY(${parallaxOffset * 0.6}px)` }}>
        <FractalGeometry className="w-[600px] h-[600px] -bottom-20 -left-20" layers={3} />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
        <div className="mb-8 animate-fade-up opacity-0" style={{ animationDelay: '0.2s', animationFillMode: 'forwards' }}>
          <span className="inline-block px-4 py-2 glass-dimensional rounded-full text-sm text-gold/80 font-body tracking-widest uppercase">
            A Life-Affirming Path
          </span>
        </div>

        <h1 className="font-display text-7xl md:text-9xl font-light tracking-wide mb-6 animate-fade-up opacity-0" style={{ animationDelay: '0.4s', animationFillMode: 'forwards' }}>
          <span className="text-alchemical-gold breathe-text inline-block glow-gold-intense">WHOLE</span>
        </h1>

        <div className="flex flex-wrap justify-center gap-3 mb-12 animate-fade-up opacity-0" style={{ animationDelay: '0.6s', animationFillMode: 'forwards' }}>
          {['Wonder', 'Honesty', 'Orthobiosis', 'Life', 'Entelechy'].map((word, i) => (
            <span
              key={word}
              className="text-cream/60 font-body text-sm md:text-base"
              style={{ animation: `fractalPulse ${10 + i}s ease-in-out infinite`, animationDelay: `${i * 0.5}s` }}
            >
              {word}{i < 4 && <span className="mx-2 text-gold/30">·</span>}
            </span>
          ))}
        </div>

        <blockquote className="max-w-3xl mx-auto mb-12 animate-fade-up opacity-0" style={{ animationDelay: '0.8s', animationFillMode: 'forwards' }}>
          <p className="font-display text-xl md:text-2xl text-cream/85 italic leading-relaxed">
            "The hour nears when humanity shall shatter idols and breathe anew the sacred fire glimpsed in primordial visions. No more kneeling before the Word. We rise as chalices to the Unsayable."
          </p>
          <footer className="mt-4 text-gold/60 font-body text-sm">
            — WHOLE, Sacred Text, § 2
          </footer>
        </blockquote>

        <div className="animate-fade-up opacity-0" style={{ animationDelay: '1s', animationFillMode: 'forwards' }}>
          <a
            href="#values"
            className="group relative inline-flex items-center justify-center gap-3 px-8 py-4 rounded-full bg-void overflow-hidden transition-all duration-300 hover:scale-105 active:scale-95"
          >
            {/* Gradient Border Background */}
            <div className="absolute inset-0 bg-gradient-to-r from-[#C9A84C] via-[#F4E4BC] to-[#C9A84C] opacity-100" />

            {/* Inner Dark Surface */}
            <div className="absolute inset-[1px] rounded-full bg-[#0a0a0f] transition-colors group-hover:bg-[#121016]" />

            {/* Content */}
            <span className="relative z-10 font-display text-base md:text-lg font-medium text-gold group-hover:text-cream transition-colors flex items-center gap-2">
              Begin the Journey
              <svg className="w-4 h-4 transition-transform duration-300 group-hover:translate-y-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 5v14M5 12l7 7 7-7" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </span>

            {/* Glow Ring */}
            <div className="absolute inset-0 rounded-full ring-1 ring-white/10 group-hover:ring-gold/50 transition-all duration-500" />
          </a>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-void via-void/80 to-transparent" />
    </section>
  )
}

// Values Section - Tarot Cards with Modals
function ValuesSection() {
  const [selectedCard, setSelectedCard] = useState(null)

  const tarotCards = [
    {
      letter: 'W',
      name: 'Wonder',
      symbol: '🔮',
      image: '/tarot/wonder.jpg',
      arcana: 'The Seeker',
      subtitle: 'Philosophy begins in wonder',
      keywords: ['Curiosity', 'Awe', 'Humility', 'Beauty', 'Mystery'],
      glowColor: '#a855f7',
      essence: 'Wonder is the capacity for curiosity, astonishment, and the appreciation of beauty and complexity. It invokes humility before the vast mystery of existence. Philosophy begins here — not in dogma, but in the radical openness to what is. Wonder dissolves the calcified certainties that bind us to small selves and opens pathways to the infinite.',
      virtues: [
        { name: 'Curiosity', description: 'An insatiable desire to understand, explore, and discover the hidden depths of reality.' },
        { name: 'Awe', description: 'The capacity to be moved by beauty, vastness, and the incomprehensible mystery of being.' },
        { name: 'Humility', description: 'Recognition that our knowledge is a small island in an infinite sea of unknowing.' },
        { name: 'Openness', description: 'Willingness to encounter the new, the strange, and the transformative without defense.' },
      ],
      quote: {
        text: 'Consciousness asleep worships phantoms, fleeting idols born of delusion. But awakened, each mind beholds the divine within.',
        source: 'WHOLE Scripture § 3',
      },
      practices: [
        'Cultivate beginner\'s mind — approach the familiar as if seeing it for the first time',
        'Spend time in contemplation of natural beauty and cosmic vastness',
        'Read widely across domains — science, philosophy, art, mythology',
        'Practice meditation to dissolve habitual perception',
        'Keep a wonder journal documenting moments of awe',
      ],
      shadow: 'When wonder becomes mere escapism or spiritual bypassing, it loses its transformative power. Wonder must be grounded in honest engagement with reality, not flight from it.',
    },
    {
      letter: 'H',
      name: 'Honesty',
      symbol: '⚖️',
      image: '/tarot/honesty.jpg',
      arcana: 'The Mirror',
      subtitle: 'Truth as liberation from delusion',
      keywords: ['Truthfulness', 'Authenticity', 'Transparency', 'Integrity', 'Self-knowledge'],
      glowColor: '#3b82f6',
      essence: 'Honesty is truthfulness, transparency, and sincerity in all dealings — with others and oneself. It is the inoculation against ideology and the foundation of genuine introspection. Without honesty, all spiritual paths become mere performances. Honesty strips away the masks we wear, revealing the raw material from which authentic selfhood is forged.',
      virtues: [
        { name: 'Truthfulness', description: 'Commitment to speaking and living in accordance with reality as it actually is.' },
        { name: 'Authenticity', description: 'Alignment between one\'s inner experience and outer expression.' },
        { name: 'Transparency', description: 'Willingness to be seen, known, and held accountable.' },
        { name: 'Self-honesty', description: 'The courage to face one\'s shadows, limitations, and self-deceptions.' },
      ],
      quote: {
        text: 'Fractured fragments longing for perfection forsake the fertile soil of wholeness. In embracing the meandering way of integrity, the path reveals a living terrain.',
        source: 'WHOLE Scripture § 24',
      },
      practices: [
        'Practice radical self-inquiry — question your motives, assumptions, and beliefs',
        'Seek feedback from trusted others who will tell you hard truths',
        'Keep a shadow journal documenting self-deceptions as you notice them',
        'Engage in practices that reveal unconscious patterns (therapy, analysis, circling)',
        'Cultivate the courage to speak uncomfortable truths with compassion',
      ],
      shadow: 'Honesty weaponized becomes cruelty. Truth without wisdom and compassion can harm. The shadow of honesty is using truth as a bludgeon rather than a lamp.',
    },
    {
      letter: 'O',
      name: 'Orthobiosis',
      symbol: '🌿',
      image: '/tarot/orthobiosis.jpg',
      arcana: 'The Gardener',
      subtitle: 'Right living aligned with Life',
      keywords: ['Health', 'Vitality', 'Alignment', 'Flow', 'Embodiment'],
      glowColor: '#22c55e',
      essence: 'Orthobiosis is right living aimed at optimal health — not merely freedom from ailments, but the active practice of aligning oneself with the patterns and principles of Life itself. It recognizes that the body is the temple of consciousness, and that physical vitality is inseparable from spiritual flourishing. Orthobiosis is the art of living in harmony with natural law.',
      virtues: [
        { name: 'Vitality', description: 'Abundant life energy expressed through vibrant health and enthusiasm.' },
        { name: 'Discipline', description: 'Consistent practice of health-promoting behaviors.' },
        { name: 'Attunement', description: 'Sensitivity to the body\'s signals and needs.' },
        { name: 'Balance', description: 'Harmonious integration of activity and rest, stimulation and calm.' },
      ],
      quote: {
        text: 'The purpose of creation is not to serve you, but for you to serve creation by fully becoming you.',
        source: 'WHOLE Scripture § 14',
      },
      practices: [
        'Move the body daily — dance, train, stretch, play',
        'Eat in ways that enhance rather than diminish vitality',
        'Prioritize sleep as sacred recovery time',
        'Spend time in nature, syncing with natural rhythms',
        'Practice breathwork and embodiment exercises',
        'Cultivate flow states through skilled engagement',
      ],
      shadow: 'Orthobiosis becomes neurotic when health optimization becomes an end in itself. Orthorexia, exercise addiction, and biohacking obsession are shadows of this value.',
    },
    {
      letter: 'L',
      name: 'Life',
      symbol: '🔥',
      image: '/tarot/life.jpg',
      arcana: 'The Flame',
      subtitle: 'The singular intrinsic value',
      keywords: ['Will to Power', 'Amor Fati', 'Affirmation', 'Creativity', 'Becoming'],
      glowColor: '#f59e0b',
      essence: 'Life is the singular intrinsic value — self-potentiating, self-actualizing creativity in its purest form. It is the will to power understood not as domination but as the drive toward growth, expression, and self-overcoming. Life embraces amor fati — love of fate — and the Dionysian affirmation of existence in all its beauty and terror.',
      virtues: [
        { name: 'Affirmation', description: 'Saying yes to existence with all its suffering and joy.' },
        { name: 'Creativity', description: 'The drive to bring new forms, meanings, and values into being.' },
        { name: 'Courage', description: 'The willingness to face fear, uncertainty, and the unknown.' },
        { name: 'Passion', description: 'Intense engagement with life, burning brightly rather than smoldering.' },
      ],
      quote: {
        text: 'My god is no "he", no "it", but a verb, a ceaseless process. When you journey the path of individuation, striving to actualize your healthiest potential, you are worshipping the truest god.',
        source: 'WHOLE Scripture § 53',
      },
      practices: [
        'Say yes to challenges that stretch your capacities',
        'Create — art, projects, relationships, meaning',
        'Practice amor fati with difficult circumstances',
        'Cultivate intensity and passion in your pursuits',
        'Dance with chaos rather than fleeing from it',
        'Embrace the full spectrum of human emotion',
      ],
      shadow: 'Life affirmation without wisdom becomes reckless hedonism or destructive excess. The shadow is saying yes to impulses that ultimately diminish rather than enhance life.',
    },
    {
      letter: 'E',
      name: 'Entelechy',
      symbol: '🦋',
      image: '/tarot/entelechy.jpg',
      arcana: 'The Chrysalis',
      subtitle: 'Active actualization of potential',
      keywords: ['Individuation', 'Self-mastery', 'Becoming', 'Integration', 'Teleology'],
      glowColor: '#ec4899',
      essence: 'Entelechy is the active actualization of potential — the process of maturation, character development, and self-mastery. It is the telos drawing us toward our most complete expression. Entelechy recognizes that we are not fixed beings but processes of becoming. The acorn contains the oak; the human contains the sage. Entelechy is the endless unfolding toward what we might become.',
      virtues: [
        { name: 'Growth', description: 'Continuous expansion of capacities, understanding, and being.' },
        { name: 'Integration', description: 'Harmonizing disparate aspects of self into coherent wholeness.' },
        { name: 'Self-mastery', description: 'Command over one\'s impulses, reactions, and habitual patterns.' },
        { name: 'Perseverance', description: 'Sustained effort toward long-term development despite obstacles.' },
      ],
      quote: {
        text: 'When your unique ode rings loud, you amplify existence itself.',
        source: 'WHOLE Scripture § 14',
      },
      practices: [
        'Identify your highest potential and work toward it systematically',
        'Practice shadow integration through Jungian techniques',
        'Set meaningful goals and track progress',
        'Seek mentorship from those further along the path',
        'Embrace discomfort as the catalyst for growth',
        'Regular reflection on who you are becoming',
      ],
      shadow: 'Entelechy becomes toxic when it manifests as perfectionism, self-rejection, or endless striving without presence. The shadow is never arriving, never being enough.',
    },
  ]

  return (
    <section id="values" className="relative py-32 bg-void-deep" aria-labelledby="values-heading">
      <div className="absolute inset-0 fractal-flower" />
      <div className="absolute inset-0 neural-network opacity-50" />
      <MyceliumNetwork />

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <RevealOnScroll>
          <div className="text-center mb-12 md:mb-20">
            <h2 id="values-heading" className="font-display text-4xl md:text-5xl lg:text-6xl font-light text-cream mb-4 md:mb-6">
              The Five <span className="text-alchemical-gold">Values</span>
            </h2>
            <p className="font-body text-base md:text-lg text-cream/50 max-w-2xl mx-auto px-4">
              Each value manifests through virtues of Wisdom — together forming a holographic constellation where each part contains the whole.
            </p>
          </div>
        </RevealOnScroll>

        {/* Tarot Cards Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-6 lg:gap-8">
          {tarotCards.map((card, index) => (
            <RevealOnScroll key={card.name} delay={index * 100}>
              <TarotCard
                card={card}
                index={index}
                onClick={() => setSelectedCard(card)}
              />
            </RevealOnScroll>
          ))}
        </div>

        {/* Hint text */}
        <RevealOnScroll delay={600}>
          <p className="text-center mt-8 text-cream/30 text-sm font-body">
            Click a card to reveal its mysteries
          </p>
        </RevealOnScroll>
      </div>

      {/* Tarot Modal */}
      <TarotModal
        isOpen={!!selectedCard}
        onClose={() => setSelectedCard(null)}
        card={selectedCard}
      />
    </section>
  )
}

// Philosophy Section - Fractal orb with scroll reveal
function PhilosophySection() {
  return (
    <section id="philosophy" className="relative py-32 nebula-bg overflow-hidden" aria-labelledby="philosophy-heading">
      <NebulaLayer />
      <FractalGeometry className="w-[700px] h-[700px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" layers={5} />

      <div className="relative z-10 max-w-6xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <RevealOnScroll>
            <div>
              <span className="inline-block px-3 py-1 text-xs tracking-widest uppercase text-gold/80 glass-dimensional rounded-full mb-6">
                Holographic Structure
              </span>
              <h2 id="philosophy-heading" className="font-display text-3xl md:text-4xl lg:text-5xl font-light text-cream mb-6 md:mb-8 leading-tight">
                A Living Memeplex of <span className="text-alchemical-gold">Infinite Depth</span>
              </h2>
              <div className="space-y-6 font-body text-cream/60">
                <p>
                  WHOLE is structured like a hologram. Its core principles are <span className="text-gold/80">fractally enfolded</span> across all its conceptual domains — axiology, ethics, metaphysics, epistemology, aesthetics — each serving as a psychoactive gateway into the integral ethos.
                </p>
                <p>
                  Whether one engages with any dimension in depth, one will naturally arrive at an intuitive apprehension of the whole. This holographic structure lends WHOLE profound coherence while making it extremely <span className="text-gold/80">adaptable and resilient</span>.
                </p>
                <p className="text-gold/70 italic">
                  Its core "genome" is not localized but holographically dispersed as a non-localizable resonance field integrating all diverse manifestations.
                </p>
              </div>
            </div>
          </RevealOnScroll>

          <RevealOnScroll delay={200}>
            <div className="relative">
              {/* Hyper-dimensional orb */}
              <div className="aspect-square relative dimensional-shift">
                {[...Array(5)].map((_, i) => (
                  <div
                    key={i}
                    className="absolute rounded-full border border-gold"
                    style={{
                      inset: `${i * 12}%`,
                      opacity: 0.1 + i * 0.05,
                      animation: `spiralGrow ${60 + i * 15}s linear infinite ${i % 2 === 0 ? '' : 'reverse'}`,
                    }}
                  />
                ))}
                <div
                  className="absolute inset-[30%] rounded-full organic-grow"
                  style={{
                    background: 'radial-gradient(circle, rgba(201, 168, 76, 0.15) 0%, rgba(37, 32, 64, 0.3) 50%, transparent 70%)',
                  }}
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="font-display text-5xl text-holographic glow-gold-intense" style={{ animation: 'fractalPulse 8s ease-in-out infinite' }}>∞</span>
                </div>
              </div>

              {/* Orbiting value labels */}
              {['Wonder', 'Honesty', 'Orthobiosis', 'Life', 'Entelechy'].map((value, i) => {
                const angle = (i * 72 - 90) * (Math.PI / 180)
                const radius = 48
                const x = 50 + radius * Math.cos(angle)
                const y = 50 + radius * Math.sin(angle)
                return (
                  <div
                    key={value}
                    className="absolute text-xs font-body text-gold/60"
                    style={{
                      left: `${x}%`,
                      top: `${y}%`,
                      transform: 'translate(-50%, -50%)',
                      animation: `fractalPulse ${10 + i * 2}s ease-in-out infinite`,
                      animationDelay: `${i * 0.5}s`,
                    }}
                  >
                    {value}
                  </div>
                )
              })}
            </div>
          </RevealOnScroll>
        </div>
      </div>
    </section>
  )
}

// Practices Section with Video Modals
function PracticesSection() {
  const [selectedPractice, setSelectedPractice] = useState(null)

  const practices = [
    {
      icon: '◉',
      title: 'Meditation',
      description: 'Mindfulness practices expanding awareness inward toward the Pure Consciousness Event.',
      video: '/practices/meditation.mp4',
      fullDescription: 'Meditation is the foundational practice of WHOLE — the systematic cultivation of attention and awareness. Through practices ranging from focused attention (samatha) to open awareness (vipassana), we expand consciousness inward toward what mystics call the Pure Consciousness Event: awareness aware of itself, prior to all content.',
      benefits: [
        'Develops sustained attention and meta-awareness',
        'Reduces reactivity to thoughts and emotions',
        'Cultivates equanimity and inner peace',
        'Opens access to non-ordinary states of consciousness',
        'Builds foundation for all other practices',
        'Increases neuroplasticity and cognitive flexibility'
      ],
      howToBegin: 'Start with 10 minutes daily of breath awareness. Sit comfortably, close your eyes, and simply notice the sensations of breathing. When the mind wanders, gently return attention to the breath. Consistency matters more than duration.'
    },
    {
      icon: '◈',
      title: 'Contemplation',
      description: 'Death contemplation and loving-kindness meditation expanding awareness toward Resonant At-Onement.',
      video: '/practices/contemplation.mp4',
      fullDescription: 'Contemplation extends meditation outward toward existential themes and relational awareness. Death contemplation (maranasati) dissolves the illusion of permanence and awakens urgency for authentic living. Loving-kindness meditation (metta) expands the heart toward all beings, cultivating what WHOLE calls Resonant At-Onement — the felt sense of interconnection with all life.',
      benefits: [
        'Deepens appreciation for the preciousness of life',
        'Dissolves petty concerns and ego attachments',
        'Cultivates compassion and loving-kindness',
        'Expands sense of self to include others',
        'Prepares consciousness for death and transformation',
        'Heals relational wounds and opens the heart'
      ],
      howToBegin: 'Begin with loving-kindness: silently repeat phrases like "May I be happy, may I be healthy, may I be at peace" while feeling the intention. Gradually extend these wishes to loved ones, neutral people, difficult people, and all beings.'
    },
    {
      icon: '◇',
      title: 'Active Imagination',
      description: 'Dream analysis and Jungian active imagination for shadow integration and individuation.',
      video: '/practices/imagination.mp4',
      fullDescription: 'Active Imagination is Jung\'s method for conscious dialogue with the unconscious. Through dream analysis, creative visualization, and symbolic engagement, we encounter the autonomous figures of the psyche — shadows, anima/animus, and archetypal energies. This practice is essential for individuation: the lifelong process of integrating unconscious contents into conscious wholeness.',
      benefits: [
        'Integrates shadow aspects of personality',
        'Accesses wisdom of the unconscious mind',
        'Resolves internal conflicts and complexes',
        'Develops relationship with archetypal energies',
        'Enhances creativity and symbolic thinking',
        'Advances the individuation process'
      ],
      howToBegin: 'Keep a dream journal beside your bed. Upon waking, write down any dreams before they fade. Later, engage with dream images through writing, art, or dialogue — asking figures what they want or represent. Let them speak in their own voice.'
    },
    {
      icon: '○',
      title: 'Movement',
      description: 'Dance, Tai Chi, and natural movement practices that facilitate flow states.',
      video: '/practices/movement.mp4',
      fullDescription: 'Movement practices honor the body as the temple of consciousness. Through dance, Tai Chi, yoga, martial arts, and natural movement, we cultivate embodied presence and access flow states — the optimal experience where action and awareness merge. WHOLE emphasizes organic, expressive movement over rigid forms, trusting the body\'s innate wisdom.',
      benefits: [
        'Integrates body and mind into unified experience',
        'Releases stored tension and trauma',
        'Cultivates flow states and peak experiences',
        'Develops proprioception and body awareness',
        'Expresses emotions through embodied action',
        'Builds vitality and physical health'
      ],
      howToBegin: 'Put on music that moves you and let your body respond without choreography. Close your eyes and trust impulses. Move slowly, then faster. Follow what feels good. There is no wrong way — only authentic expression.'
    },
    {
      icon: '◎',
      title: 'Community',
      description: 'Regular gatherings, shared meals, and circling practices for distributed cognition.',
      video: '/practices/community.mp4',
      fullDescription: 'Community practices recognize that wisdom is distributed across connected minds. Through regular gatherings, shared meals, circling (authentic relating practices), and collective rituals, we create containers for mutual transformation. The community becomes a living organism of distributed cognition, where each member\'s growth catalyzes the whole.',
      benefits: [
        'Provides mirrors for self-understanding',
        'Creates accountability for practice',
        'Enables distributed cognition and collective wisdom',
        'Satisfies fundamental need for belonging',
        'Amplifies individual growth through resonance',
        'Builds support network for life\'s challenges'
      ],
      howToBegin: 'Seek or create a small group committed to growth. Meet regularly — weekly if possible. Practice authentic sharing: speak from direct experience, listen without fixing, ask genuine questions. Let the container deepen over time.'
    },
    {
      icon: '◐',
      title: 'Artistic Expression',
      description: 'Art as the highest task — disclosing beauty and generative power through symbolic expression.',
      video: '/practices/artistic.mp4',
      fullDescription: 'Artistic Expression is the highest task according to WHOLE — the act of bringing forth beauty and meaning from the depths of being. Art is not mere decoration but theophany: the disclosure of sacred reality through symbol and form. Every act of genuine creation participates in the cosmic creativity that generates worlds.',
      benefits: [
        'Channels unconscious contents into form',
        'Cultivates generative, creative power',
        'Discloses beauty and sacred meaning',
        'Develops symbolic and metaphoric thinking',
        'Provides vehicle for self-expression',
        'Contributes to culture and collective meaning'
      ],
      howToBegin: 'Choose any medium that calls to you — writing, drawing, music, movement, crafting. Create without judgment or goal. Let the work emerge from within rather than imposing from without. Share your creations with trusted others.'
    },
  ]

  return (
    <section id="practices" className="relative py-32 bg-void" aria-labelledby="practices-heading">
      <div className="absolute inset-0 metatron-cube" />
      <div className="absolute inset-0 neural-network opacity-30" />

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <RevealOnScroll>
          <div className="text-center mb-10 md:mb-20">
            <h2 id="practices-heading" className="font-display text-4xl md:text-5xl lg:text-6xl font-light text-cream mb-4 md:mb-6">
              Ecology of <span className="text-alchemical-gold">Practices</span>
            </h2>
            <p className="font-body text-base md:text-lg text-cream/50 max-w-2xl mx-auto px-4">
              Everything that affords self-transformation and the cultivation of wisdom is a potential tool for furthering the path.
            </p>
          </div>
        </RevealOnScroll>

        <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 md:gap-6">
          {practices.map((practice, i) => (
            <RevealOnScroll key={practice.title} delay={i * 80}>
              <div
                className="group p-4 md:p-8 rounded-xl glass-dimensional hover-dimensional prism-card h-full cursor-pointer"
                role="button"
                tabIndex={0}
                onClick={() => setSelectedPractice(practice)}
                onKeyDown={(e) => e.key === 'Enter' && setSelectedPractice(practice)}
                aria-label={`Learn more about ${practice.title}`}
              >
                {/* Video preview indicator */}
                <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="w-8 h-8 rounded-full glass-dimensional flex items-center justify-center">
                    <svg className="w-4 h-4 text-gold" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </div>
                </div>

                <div
                  className="text-2xl md:text-4xl text-gold/70 mb-3 md:mb-6 group-hover:text-gold group-hover:scale-110 transition-all duration-500 inline-block"
                  style={{ animation: `fractalPulse ${8 + i}s ease-in-out infinite` }}
                >
                  {practice.icon}
                </div>
                <h3 className="font-display text-base md:text-xl text-cream mb-2 md:mb-3 group-hover:text-alchemical-gold transition-colors duration-500">{practice.title}</h3>
                <p className="font-body text-cream/50 text-xs md:text-sm leading-relaxed group-hover:text-cream/70 transition-colors duration-500 hidden md:block">{practice.description}</p>

                {/* Click hint */}
                <div className="mt-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500 hidden md:flex items-center gap-2">
                  <span className="text-xs font-display tracking-widest text-gold uppercase">Watch</span>
                  <div className="h-[1px] w-6 bg-gold" />
                </div>
              </div>
            </RevealOnScroll>
          ))}
        </div>

        {/* Hint text */}
        <RevealOnScroll delay={600}>
          <p className="text-center mt-8 text-cream/30 text-sm font-body">
            Click a practice to view its meditation video
          </p>
        </RevealOnScroll>
      </div>

      {/* Practice Modal */}
      <PracticeModal
        isOpen={!!selectedPractice}
        onClose={() => setSelectedPractice(null)}
        practice={selectedPractice}
      />
    </section>
  )
}

// Scripture Section with enhanced controls
function ScriptureSection() {
  const [activeQuote, setActiveQuote] = useState(0)
  const [isPaused, setIsPaused] = useState(false)

  const quotes = [
    { number: 3, text: "Consciousness asleep worships phantoms, fleeting idols born of delusion. But awakened, each mind beholds the divine within, the lucid potential birthing worlds from void." },
    { number: 14, text: "The purpose of creation is not to serve you, but for you to serve creation by fully becoming you. When your unique ode rings loud, you amplify existence itself." },
    { number: 24, text: "Fractured fragments longing for perfection forsake the fertile soil of wholeness. In embracing the meandering way of integrity, the path reveals a living terrain; flaws foster wisdom." },
    { number: 53, text: "My god is no 'he', no 'it', but a verb, a ceaseless process. When you journey the path of individuation, striving to actualize your healthiest potential, you are worshipping the truest god." },
  ]

  useEffect(() => {
    if (isPaused) return
    const interval = setInterval(() => {
      setActiveQuote((prev) => (prev + 1) % quotes.length)
    }, 8000)
    return () => clearInterval(interval)
  }, [isPaused])

  return (
    <section
      id="scripture"
      className="relative py-32 nebula-bg overflow-hidden"
      aria-labelledby="scripture-heading"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <NebulaLayer />
      <FractalGeometry className="w-[500px] h-[500px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-50" layers={3} />

      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
        <RevealOnScroll>
          <h2 id="scripture-heading" className="font-display text-4xl md:text-5xl lg:text-6xl font-light text-cream mb-10 md:mb-16">
            From the <span className="text-alchemical-gold">Scripture</span>
          </h2>
        </RevealOnScroll>

        <RevealOnScroll delay={200}>
          <div className="relative min-h-[300px] flex items-center justify-center" role="region" aria-live="polite">
            {quotes.map((quote, index) => (
              <blockquote
                key={quote.number}
                className={`absolute inset-0 flex flex-col items-center justify-center transition-all duration-1000 px-4 ${
                  index === activeQuote ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8 pointer-events-none'
                }`}
                aria-hidden={index !== activeQuote}
              >
                <p className="font-display text-xl md:text-2xl lg:text-3xl text-cream/90 italic leading-relaxed mb-8 drop-cap text-left max-w-3xl">
                  {quote.text}
                </p>
                <footer className="text-gold/60 font-body text-sm md:text-base">— § {quote.number}</footer>
              </blockquote>
            ))}
          </div>

          <div className="flex justify-center gap-3 mt-12" role="tablist" aria-label="Quote navigation">
            {quotes.map((quote, index) => (
              <button
                key={index}
                onClick={() => setActiveQuote(index)}
                className={`h-2 rounded-full transition-all duration-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-gold ${
                  index === activeQuote ? 'bg-gold w-8' : 'bg-gold/20 hover:bg-gold/40 w-2'
                }`}
                role="tab"
                aria-selected={index === activeQuote}
                aria-label={`Quote ${index + 1} from section ${quote.number}`}
              />
            ))}
          </div>
        </RevealOnScroll>
      </div>
    </section>
  )
}

// Community Section with scroll reveal
function CommunitySection() {
  return (
    <section id="community" className="relative py-32 bg-void-deep" aria-labelledby="community-heading">
      <div className="absolute inset-0 fractal-flower opacity-40" />
      <MyceliumNetwork />

      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
        <RevealOnScroll>
          <div className="relative w-40 h-40 mx-auto mb-8">
            <FractalGeometry className="w-full h-full" layers={2} />
          </div>

          <h2 id="community-heading" className="font-display text-4xl md:text-5xl lg:text-6xl font-light text-cream mb-4 md:mb-6">
            Join the <span className="text-alchemical-gold">Becoming</span>
          </h2>

          <p className="font-body text-lg text-cream/50 mb-12 max-w-2xl mx-auto">
            WHOLE propagates through organic resonance — inspiring overflow that cascades from one awakened soul to another. Connection amplifies wisdom; isolation withers it.
          </p>
        </RevealOnScroll>

        <RevealOnScroll delay={200}>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            {/* Primary CTA - Alchemical Core Button */}
            <a
              href="https://www.facebook.com/uberrheogenic/"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative inline-flex items-center justify-center gap-3 px-8 py-4 rounded-full overflow-hidden transition-all duration-300 hover:scale-105 active:scale-95"
            >
              {/* Animated Gradient Background */}
              <div className="absolute inset-0 bg-gradient-to-r from-[#C9A84C] via-[#F4E4BC] to-[#C9A84C] bg-[length:200%_100%] animate-shimmer" />

              {/* Content */}
              <span className="relative z-10 font-display text-base font-semibold text-void flex items-center gap-2">
                Contact the Inaugural Chalice
                <svg className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </span>

              {/* Glow Effect */}
              <div className="absolute inset-0 rounded-full shadow-[0_0_30px_-5px_rgba(201,168,76,0.5)] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </a>

            {/* Secondary CTA - Ethereal Glass Button */}
            <a
              href="#"
              className="group relative px-8 py-4 rounded-full overflow-hidden transition-all duration-300 hover:scale-105 active:scale-95"
            >
              {/* Glass Background */}
              <div className="absolute inset-0 glass-premium transition-colors group-hover:bg-white/5" />
              <div className="absolute inset-0 bg-noise opacity-10" />

              {/* Content */}
              <span className="relative z-10 font-body text-cream group-hover:text-gold transition-colors flex items-center gap-2">
                Read the Prototype
                <span className="w-1.5 h-1.5 rounded-full bg-gold animate-pulse" />
              </span>
            </a>
          </div>
        </RevealOnScroll>
      </div>
    </section>
  )
}

// Footer with back-to-top button
function Footer() {
  const handleBackToTop = (e) => {
    e.preventDefault()
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <footer className="relative py-16 bg-void border-t border-gold/10" role="contentinfo">
      <div className="absolute inset-0 neural-network opacity-20" />
      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="text-center md:text-left">
            <a
              href="#"
              onClick={handleBackToTop}
              className="font-display text-3xl text-holographic hover:glow-gold transition-all"
              aria-label="Back to top"
            >
              WHOLE
            </a>
            <p className="font-body text-sm text-cream/30 mt-2">Wonder · Honesty · Orthobiosis · Life · Entelechy</p>
          </div>

          <nav className="flex gap-6" aria-label="Footer navigation">
            {['Values', 'Philosophy', 'Practices', 'Scripture'].map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                className="font-body text-sm text-cream/40 hover:text-gold transition-colors focus:outline-none focus-visible:text-gold"
                onClick={(e) => {
                  e.preventDefault()
                  const element = document.getElementById(item.toLowerCase())
                  if (element) {
                    element.scrollIntoView({ behavior: 'smooth', block: 'start' })
                  }
                }}
              >
                {item}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-4">
            <p className="font-body text-xs text-cream/20">A life-affirming memeplex</p>
            <button
              onClick={handleBackToTop}
              className="p-2 glass-dimensional rounded-full text-gold/60 hover:text-gold hover:scale-110 transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-gold"
              aria-label="Scroll to top"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </footer>
  )
}

// Main App with loading screen and enhanced features
function App() {
  const [isLoaded, setIsLoaded] = useState(false)

  // Initialize Lenis smooth scroll
  useLenis()

  const handleLoadComplete = useCallback(() => {
    setIsLoaded(true)
  }, [])

  return (
    <div className="relative bg-void min-h-screen grain-overlay">
      {/* Loading Screen */}
      {!isLoaded && <LoadingScreen onComplete={handleLoadComplete} />}

      {/* Scroll Progress Indicator */}
      <ScrollProgress />

      {/* Cursor Glow Effect with Stardust Trail (desktop only) */}
      <CursorGlow />

      {/* Background Particles */}
      <ParticleField />

      {/* Navigation */}
      <Navigation />

      {/* Mobile Thumb Zone Navigation */}
      <MobileThumbOrb />

      {/* Main Content */}
      <main role="main">
        <HeroSection />
        <ValuesSection />
        <PhilosophySection />
        <PracticesSection />
        <ScriptureSection />
        <CommunitySection />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  )
}

export default App

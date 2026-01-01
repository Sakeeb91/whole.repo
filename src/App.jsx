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

// Values Section - Holographic cards with scroll reveal
function ValuesSection() {
  const values = [
    { letter: 'W', name: 'Wonder', description: 'Philosophy begins in wonder — the capacity for curiosity, astonishment, and appreciation of beauty and complexity. It invokes humility before the vast mystery of existence.' },
    { letter: 'H', name: 'Honesty', description: 'Truthfulness, transparency, and sincerity in all dealings — with others and oneself. Authenticity that inoculates against ideology and promotes introspection.' },
    { letter: 'O', name: 'Orthobiosis', description: 'Right living aimed at optimal health — not merely freedom from ailments, but the practice of aligning oneself with the patterns of Life itself.' },
    { letter: 'L', name: 'Life', description: 'The singular intrinsic value — self-potentiating, self-actualizing creativity. Life as will to power, embracing amor fati and Dionysian affirmation.' },
    { letter: 'E', name: 'Entelechy', description: 'The active actualization of potential — maturation, character development, self-mastery. The endless process of individuation and self-overcoming.' },
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

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {values.map((value, index) => (
            <RevealOnScroll
              key={value.name}
              delay={index * 100}
              className={index === 4 ? 'md:col-span-2 lg:col-span-1' : ''}
            >
              {({ isInView }) => (
                <div className="group relative h-full w-full" role="article" tabIndex={0}>
                  {/* Animated Conic Border Gradient */}
                  <div
                    className="absolute -inset-[1px] rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-sm animate-border-spin"
                    style={{
                      background: 'conic-gradient(from var(--angle, 0deg) at 50% 50%, transparent 0%, transparent 70%, #C9A84C 85%, transparent 100%)',
                    }}
                  />

                  {/* Main Card Container */}
                  <div className="relative h-full rounded-2xl bg-[#0a0a0f] p-[1px] overflow-hidden transition-all duration-500 ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:-translate-y-2 group-hover:scale-[1.01]">

                    {/* Inner Content Surface */}
                    <div className="relative h-full rounded-2xl bg-void/90 p-6 md:p-8 flex flex-col overflow-hidden min-h-[280px]">

                      {/* Ambient Noise Texture */}
                      <div className="absolute inset-0 bg-noise opacity-30 pointer-events-none mix-blend-overlay" />

                      {/* Top Light Leak Effect */}
                      <div className="absolute -top-24 -right-24 w-48 h-48 bg-gold/10 blur-[80px] rounded-full group-hover:bg-gold/25 transition-colors duration-700" />

                      {/* Large Letter with Ink Trap depth effect */}
                      <div className="absolute -right-2 -top-2 font-display text-[7rem] md:text-[8rem] leading-none font-bold text-transparent bg-clip-text bg-gradient-to-b from-white/[0.03] to-transparent select-none transition-all duration-700 group-hover:scale-110 group-hover:from-gold/10">
                        {value.letter}
                      </div>

                      {/* Content */}
                      <div className="relative z-10 flex-1 flex flex-col">
                        <h3 className="font-display text-xl md:text-2xl text-cream mb-3 md:mb-4 mt-6 md:mt-8 inline-flex items-center gap-3">
                          <span className="w-6 md:w-8 h-[1px] bg-gold/50 group-hover:w-10 md:group-hover:w-12 transition-all duration-500" />
                          <span className="group-hover:text-gold transition-colors duration-300">
                            <DecodingText text={value.name} isVisible={isInView} />
                          </span>
                        </h3>

                        <p className="font-body text-sm md:text-base text-cream/60 leading-relaxed group-hover:text-cream/80 transition-colors duration-500">
                          {value.description}
                        </p>
                      </div>

                      {/* Bottom Interactive Indicator */}
                      <div className="mt-auto pt-6 flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-4 group-hover:translate-y-0">
                        <span className="text-xs font-display tracking-widest text-gold uppercase">Discover</span>
                        <div className="h-[1px] w-8 bg-gold" />
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </RevealOnScroll>
          ))}
        </div>
      </div>
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

// Practices Section with scroll reveal
function PracticesSection() {
  const practices = [
    { icon: '◉', title: 'Meditation', description: 'Mindfulness practices expanding awareness inward toward the Pure Consciousness Event.' },
    { icon: '◈', title: 'Contemplation', description: 'Death contemplation and loving-kindness meditation expanding awareness toward Resonant At-Onement.' },
    { icon: '◇', title: 'Active Imagination', description: 'Dream analysis and Jungian active imagination for shadow integration and individuation.' },
    { icon: '○', title: 'Movement', description: 'Dance, Tai Chi, and natural movement practices that facilitate flow states.' },
    { icon: '◎', title: 'Community', description: 'Regular gatherings, shared meals, and circling practices for distributed cognition.' },
    { icon: '◐', title: 'Artistic Expression', description: 'Art as the highest task — disclosing beauty and generative power through symbolic expression.' },
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
                role="article"
                tabIndex={0}
              >
                <div
                  className="text-2xl md:text-4xl text-gold/70 mb-3 md:mb-6 group-hover:text-gold group-hover:scale-110 transition-all duration-500 inline-block"
                  style={{ animation: `fractalPulse ${8 + i}s ease-in-out infinite` }}
                >
                  {practice.icon}
                </div>
                <h3 className="font-display text-base md:text-xl text-cream mb-2 md:mb-3 group-hover:text-alchemical-gold transition-colors duration-500">{practice.title}</h3>
                <p className="font-body text-cream/50 text-xs md:text-sm leading-relaxed group-hover:text-cream/70 transition-colors duration-500 hidden md:block">{practice.description}</p>
              </div>
            </RevealOnScroll>
          ))}
        </div>
      </div>
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

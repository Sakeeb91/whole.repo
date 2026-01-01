import { useState, useEffect, useRef } from 'react'
import './index.css'

// Aurora Orbs - Floating psychedelic blobs
function AuroraOrbs() {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {/* Large morphing aurora blobs */}
      <div
        className="absolute w-[600px] h-[600px] morph-blob breathing-orb"
        style={{
          background: 'radial-gradient(circle, rgba(255,113,206,0.3) 0%, transparent 70%)',
          top: '-10%',
          left: '-10%',
          animationDelay: '0s',
        }}
      />
      <div
        className="absolute w-[500px] h-[500px] morph-blob breathing-orb"
        style={{
          background: 'radial-gradient(circle, rgba(1,205,254,0.25) 0%, transparent 70%)',
          top: '20%',
          right: '-15%',
          animationDelay: '2s',
        }}
      />
      <div
        className="absolute w-[400px] h-[400px] morph-blob breathing-orb"
        style={{
          background: 'radial-gradient(circle, rgba(5,255,161,0.2) 0%, transparent 70%)',
          bottom: '10%',
          left: '20%',
          animationDelay: '4s',
        }}
      />
      <div
        className="absolute w-[350px] h-[350px] morph-blob breathing-orb"
        style={{
          background: 'radial-gradient(circle, rgba(185,103,255,0.25) 0%, transparent 70%)',
          bottom: '-5%',
          right: '25%',
          animationDelay: '3s',
        }}
      />
      <div
        className="absolute w-[300px] h-[300px] morph-blob breathing-orb"
        style={{
          background: 'radial-gradient(circle, rgba(255,251,150,0.2) 0%, transparent 70%)',
          top: '40%',
          left: '40%',
          animationDelay: '1s',
        }}
      />
    </div>
  )
}

// Rainbow Particle Field - Wholesome psychedelic particles
function ParticleField() {
  const colors = [
    'bg-aurora-pink/40',
    'bg-aurora-blue/40',
    'bg-aurora-green/40',
    'bg-aurora-yellow/40',
    'bg-aurora-purple/40',
    'bg-psyche-rose/40',
    'bg-psyche-mint/40',
    'bg-psyche-aqua/40',
  ]

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {[...Array(60)].map((_, i) => (
        <div
          key={i}
          className={`absolute w-1.5 h-1.5 ${colors[i % colors.length]} rounded-full animate-hue-rotate`}
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animation: `particle ${15 + Math.random() * 25}s linear infinite, hueRotate ${8 + Math.random() * 10}s linear infinite`,
            animationDelay: `${Math.random() * 20}s`,
            filter: 'blur(0.5px)',
          }}
        />
      ))}
      {/* Twinkling stars with rainbow colors */}
      {[...Array(30)].map((_, i) => (
        <div
          key={`star-${i}`}
          className="absolute w-1 h-1 rounded-full animate-pulse-slow"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 4}s`,
            background: `hsl(${Math.random() * 360}, 80%, 70%)`,
            boxShadow: `0 0 10px hsl(${Math.random() * 360}, 80%, 70%)`,
          }}
        />
      ))}
    </div>
  )
}

// Psychedelic Sacred Geometry with rainbow strokes
function SacredGeometry({ className = '', rainbow = false }) {
  return (
    <svg
      className={`absolute ${rainbow ? 'animate-hue-rotate' : ''} ${className}`}
      viewBox="0 0 200 200"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="rainbowGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#ff71ce" />
          <stop offset="20%" stopColor="#b967ff" />
          <stop offset="40%" stopColor="#01cdfe" />
          <stop offset="60%" stopColor="#05ffa1" />
          <stop offset="80%" stopColor="#fffb96" />
          <stop offset="100%" stopColor="#ff71ce" />
        </linearGradient>
      </defs>
      <circle cx="100" cy="100" r="80" stroke={rainbow ? "url(#rainbowGrad)" : "currentColor"} strokeWidth="0.5" opacity="0.3" />
      <circle cx="100" cy="100" r="60" stroke={rainbow ? "url(#rainbowGrad)" : "currentColor"} strokeWidth="0.5" opacity="0.25" />
      <circle cx="100" cy="100" r="40" stroke={rainbow ? "url(#rainbowGrad)" : "currentColor"} strokeWidth="0.5" opacity="0.2" />
      <polygon
        points="100,20 180,140 20,140"
        stroke={rainbow ? "url(#rainbowGrad)" : "currentColor"}
        strokeWidth="0.5"
        fill="none"
        opacity="0.2"
      />
      <polygon
        points="100,180 20,60 180,60"
        stroke={rainbow ? "url(#rainbowGrad)" : "currentColor"}
        strokeWidth="0.5"
        fill="none"
        opacity="0.2"
      />
      <circle cx="100" cy="40" r="20" stroke={rainbow ? "url(#rainbowGrad)" : "currentColor"} strokeWidth="0.3" opacity="0.15" />
      <circle cx="60" cy="130" r="20" stroke={rainbow ? "url(#rainbowGrad)" : "currentColor"} strokeWidth="0.3" opacity="0.15" />
      <circle cx="140" cy="130" r="20" stroke={rainbow ? "url(#rainbowGrad)" : "currentColor"} strokeWidth="0.3" opacity="0.15" />
    </svg>
  )
}

// Navigation Component with rainbow accents
function Navigation() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navItems = ['Values', 'Philosophy', 'Practices', 'Scripture', 'Community']

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? 'glass-rainbow py-4' : 'py-6'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        <a href="#" className="font-display text-2xl font-semibold text-gradient-rainbow glow-rainbow-pulse">
          W
        </a>
        <div className="hidden md:flex items-center gap-8">
          {navItems.map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase()}`}
              className="font-body text-sm text-cream/70 hover:text-aurora-pink transition-colors animated-underline trippy-hover"
            >
              {item}
            </a>
          ))}
        </div>
        <button className="md:hidden text-aurora-pink">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>
    </nav>
  )
}

// Hero Section with psychedelic vibes
function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Psychedelic mesh background */}
      <div className="absolute inset-0 psyche-mesh aurora-bg" />

      <SacredGeometry rainbow className="w-[700px] h-[700px] animate-spin-slow -top-32 -right-32 opacity-40" />
      <SacredGeometry rainbow className="w-[500px] h-[500px] animate-spin-slow -bottom-20 -left-20 opacity-30" style={{ animationDirection: 'reverse' }} />

      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
        <div className="mb-8 animate-fade-up opacity-0" style={{ animationDelay: '0.2s', animationFillMode: 'forwards' }}>
          <span className="inline-block px-4 py-2 glass-rainbow rounded-full text-sm text-cream/90 font-body tracking-widest uppercase">
            A Life-Affirming Path
          </span>
        </div>

        <h1 className="font-display text-7xl md:text-9xl font-light tracking-wide mb-6 animate-fade-up opacity-0" style={{ animationDelay: '0.4s', animationFillMode: 'forwards' }}>
          <span className="text-gradient-rainbow glow-rainbow-pulse">WHOLE</span>
        </h1>

        <div className="flex flex-wrap justify-center gap-3 mb-12 animate-fade-up opacity-0" style={{ animationDelay: '0.6s', animationFillMode: 'forwards' }}>
          {[
            { word: 'Wonder', color: 'text-aurora-pink' },
            { word: 'Honesty', color: 'text-aurora-green' },
            { word: 'Orthobiosis', color: 'text-aurora-blue' },
            { word: 'Life', color: 'text-aurora-yellow' },
            { word: 'Entelechy', color: 'text-aurora-purple' },
          ].map((item, i) => (
            <span key={item.word} className={`${item.color} font-body text-sm md:text-base animate-wave`} style={{ animationDelay: `${i * 0.1}s` }}>
              {item.word}{i < 4 && <span className="mx-2 text-cream/30">·</span>}
            </span>
          ))}
        </div>

        <blockquote className="max-w-3xl mx-auto mb-12 animate-fade-up opacity-0" style={{ animationDelay: '0.8s', animationFillMode: 'forwards' }}>
          <p className="font-display text-xl md:text-2xl text-cream/90 italic leading-relaxed">
            "The hour nears when humanity shall shatter idols and breathe anew the sacred fire glimpsed in primordial visions. No more kneeling before the Word. We rise as <span className="text-gradient-aurora">chalices to the Unsayable</span>."
          </p>
          <footer className="mt-4 text-aurora-purple font-body text-sm">
            — WHOLE, Sacred Text, § 2
          </footer>
        </blockquote>

        <div className="animate-fade-up opacity-0" style={{ animationDelay: '1s', animationFillMode: 'forwards' }}>
          <a
            href="#values"
            className="group inline-flex items-center gap-2 px-8 py-4 glass-rainbow rounded-full text-cream font-body hover:scale-105 transition-all animate-color-pulse"
          >
            Begin the Journey
            <svg className="w-4 h-4 animate-bounce group-hover:text-aurora-green" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </a>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-void to-transparent" />
    </section>
  )
}

// Values Section with rainbow cards
function ValuesSection() {
  const values = [
    {
      letter: 'W',
      name: 'Wonder',
      description: 'Philosophy begins in wonder — the capacity for curiosity, astonishment, and appreciation of beauty and complexity. It invokes humility before the vast mystery of existence.',
      gradient: 'from-aurora-pink/30 to-aurora-purple/20',
      borderColor: 'hover:border-aurora-pink/50',
      glow: 'rgba(255,113,206,0.3)',
    },
    {
      letter: 'H',
      name: 'Honesty',
      description: 'Truthfulness, transparency, and sincerity in all dealings — with others and oneself. Authenticity that inoculates against ideology and promotes introspection.',
      gradient: 'from-aurora-green/30 to-psyche-mint/20',
      borderColor: 'hover:border-aurora-green/50',
      glow: 'rgba(5,255,161,0.3)',
    },
    {
      letter: 'O',
      name: 'Orthobiosis',
      description: 'Right living aimed at optimal health — not merely freedom from ailments, but the practice of aligning oneself with the patterns of Life itself.',
      gradient: 'from-aurora-blue/30 to-psyche-aqua/20',
      borderColor: 'hover:border-aurora-blue/50',
      glow: 'rgba(1,205,254,0.3)',
    },
    {
      letter: 'L',
      name: 'Life',
      description: 'The singular intrinsic value — self-potentiating, self-actualizing creativity. Life as will to power, embracing amor fati and Dionysian affirmation.',
      gradient: 'from-aurora-yellow/30 to-psyche-peach/20',
      borderColor: 'hover:border-aurora-yellow/50',
      glow: 'rgba(255,251,150,0.3)',
    },
    {
      letter: 'E',
      name: 'Entelechy',
      description: 'The active actualization of potential — maturation, character development, self-mastery. The endless process of individuation and self-overcoming.',
      gradient: 'from-aurora-purple/30 to-ethereal-lavender/20',
      borderColor: 'hover:border-aurora-purple/50',
      glow: 'rgba(185,103,255,0.3)',
    },
  ]

  return (
    <section id="values" className="relative py-32 bg-void-deep">
      <div className="absolute inset-0 flower-of-life-rainbow opacity-40" />
      <div className="absolute inset-0 psyche-mesh opacity-30" />

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <div className="text-center mb-20">
          <h2 className="font-display text-5xl md:text-6xl font-light text-cream mb-6">
            The Five <span className="text-gradient-rainbow">Values</span>
          </h2>
          <p className="font-body text-lg text-cream/60 max-w-2xl mx-auto">
            Each value manifests through virtues of Wisdom — together forming a holographic constellation where each part contains the whole.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {values.map((value, index) => (
            <div
              key={value.name}
              className={`group relative p-8 rounded-2xl bg-gradient-to-br ${value.gradient} border border-white/10 ${value.borderColor} transition-all duration-500 hover:-translate-y-2 trippy-hover ${
                index === 4 ? 'md:col-span-2 lg:col-span-1' : ''
              }`}
              style={{
                boxShadow: `0 0 0px ${value.glow}`,
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.boxShadow = `0 0 40px ${value.glow}`
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.boxShadow = `0 0 0px ${value.glow}`
              }}
            >
              <div className="absolute top-4 right-4 font-display text-6xl font-bold text-white/5 group-hover:text-white/15 transition-colors animate-hue-rotate" style={{ animationDuration: '10s' }}>
                {value.letter}
              </div>
              <h3 className="font-display text-2xl text-cream mb-4">{value.name}</h3>
              <p className="font-body text-cream/70 leading-relaxed">{value.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// Philosophy Section with psychedelic orb
function PhilosophySection() {
  return (
    <section id="philosophy" className="relative py-32 overflow-hidden">
      <div className="absolute inset-0 psyche-mesh aurora-bg" />
      <SacredGeometry rainbow className="w-[600px] h-[600px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 animate-breathe opacity-20" />

      <div className="relative z-10 max-w-6xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <span className="inline-block px-3 py-1 text-xs tracking-widest uppercase text-aurora-purple glass-rainbow rounded-full mb-6">
              Holographic Structure
            </span>
            <h2 className="font-display text-4xl md:text-5xl font-light text-cream mb-8 leading-tight">
              A Living Memeplex of <span className="text-gradient-aurora">Infinite Depth</span>
            </h2>
            <div className="space-y-6 font-body text-cream/70">
              <p>
                WHOLE is structured like a hologram. Its core principles are fractally enfolded across all its conceptual domains — axiology, ethics, metaphysics, epistemology, aesthetics — each serving as a <span className="text-aurora-blue">psychoactive gateway</span> into the integral ethos.
              </p>
              <p>
                Whether one engages with any dimension in depth, one will naturally arrive at an intuitive apprehension of the whole. This holographic structure lends WHOLE profound coherence while making it extremely <span className="text-aurora-green">adaptable and resilient</span>.
              </p>
              <p className="text-aurora-pink italic">
                Its core "genome" is not localized but holographically dispersed as a non-localizable resonance field integrating all diverse manifestations.
              </p>
            </div>
          </div>

          <div className="relative">
            {/* Psychedelic spinning orb */}
            <div className="aspect-square relative">
              <div className="absolute inset-0 rounded-full animate-spin-slow" style={{ animationDuration: '30s' }}>
                <div className="w-full h-full rounded-full border-2 border-aurora-pink/30" />
              </div>
              <div className="absolute inset-4 rounded-full animate-spin-slow" style={{ animationDuration: '25s', animationDirection: 'reverse' }}>
                <div className="w-full h-full rounded-full border-2 border-aurora-blue/30" />
              </div>
              <div className="absolute inset-8 rounded-full animate-spin-slow" style={{ animationDuration: '20s' }}>
                <div className="w-full h-full rounded-full border-2 border-aurora-green/30" />
              </div>
              <div className="absolute inset-12 rounded-full animate-spin-slow" style={{ animationDuration: '15s', animationDirection: 'reverse' }}>
                <div className="w-full h-full rounded-full border-2 border-aurora-purple/30" />
              </div>
              <div className="absolute inset-16 rounded-full">
                <div className="w-full h-full rounded-full bg-gradient-radial from-aurora-pink/20 via-aurora-blue/10 to-transparent morph-blob flex items-center justify-center">
                  <span className="font-display text-5xl text-gradient-rainbow glow-rainbow-pulse animate-pulse-slow">∞</span>
                </div>
              </div>
            </div>

            {['Wonder', 'Honesty', 'Orthobiosis', 'Life', 'Entelechy'].map((value, i) => {
              const angle = (i * 72 - 90) * (Math.PI / 180)
              const radius = 48
              const x = 50 + radius * Math.cos(angle)
              const y = 50 + radius * Math.sin(angle)
              const colors = ['text-aurora-pink', 'text-aurora-green', 'text-aurora-blue', 'text-aurora-yellow', 'text-aurora-purple']
              return (
                <div
                  key={value}
                  className={`absolute text-xs font-body ${colors[i]} animate-wave`}
                  style={{
                    left: `${x}%`,
                    top: `${y}%`,
                    transform: 'translate(-50%, -50%)',
                    animationDelay: `${i * 0.2}s`,
                  }}
                >
                  {value}
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}

// Practices Section with rainbow icons
function PracticesSection() {
  const practices = [
    {
      icon: '◉',
      title: 'Meditation',
      description: 'Mindfulness practices expanding awareness inward toward the Pure Consciousness Event.',
      color: 'text-aurora-pink',
    },
    {
      icon: '◈',
      title: 'Contemplation',
      description: 'Death contemplation and loving-kindness meditation expanding awareness toward Resonant At-Onement.',
      color: 'text-aurora-blue',
    },
    {
      icon: '◇',
      title: 'Active Imagination',
      description: 'Dream analysis and Jungian active imagination for shadow integration and individuation.',
      color: 'text-aurora-purple',
    },
    {
      icon: '○',
      title: 'Movement',
      description: 'Dance, Tai Chi, and natural movement practices that facilitate flow states.',
      color: 'text-aurora-green',
    },
    {
      icon: '◎',
      title: 'Community',
      description: 'Regular gatherings, shared meals, and circling practices for distributed cognition.',
      color: 'text-aurora-yellow',
    },
    {
      icon: '◐',
      title: 'Artistic Expression',
      description: 'Art as the highest task — disclosing beauty and generative power through symbolic expression.',
      color: 'text-psyche-rose',
    },
  ]

  return (
    <section id="practices" className="relative py-32 bg-void">
      <div className="absolute inset-0 flower-of-life-rainbow opacity-30" />

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <div className="text-center mb-20">
          <h2 className="font-display text-5xl md:text-6xl font-light text-cream mb-6">
            Ecology of <span className="text-gradient-aurora">Practices</span>
          </h2>
          <p className="font-body text-lg text-cream/60 max-w-2xl mx-auto">
            Everything that affords self-transformation and the cultivation of wisdom is a potential tool for furthering the path.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {practices.map((practice, i) => (
            <div
              key={practice.title}
              className="group p-8 rounded-xl glass-rainbow hover:scale-105 transition-all duration-300 trippy-hover"
              style={{ animationDelay: `${i * 0.1}s` }}
            >
              <div className={`text-4xl ${practice.color} mb-6 group-hover:scale-125 transition-transform animate-wave`} style={{ animationDelay: `${i * 0.15}s` }}>
                {practice.icon}
              </div>
              <h3 className="font-display text-xl text-cream mb-3">{practice.title}</h3>
              <p className="font-body text-cream/60 text-sm leading-relaxed">{practice.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// Scripture Section with psychedelic quotes
function ScriptureSection() {
  const [activeQuote, setActiveQuote] = useState(0)

  const quotes = [
    {
      number: 3,
      text: "Consciousness asleep worships phantoms, fleeting idols born of delusion. But awakened, each mind beholds the divine within, the lucid potential birthing worlds from void.",
    },
    {
      number: 14,
      text: "The purpose of creation is not to serve you, but for you to serve creation by fully becoming you. When your unique ode rings loud, you amplify existence itself.",
    },
    {
      number: 24,
      text: "Fractured fragments longing for perfection forsake the fertile soil of wholeness. In embracing the meandering way of integrity, the path reveals a living terrain; flaws foster wisdom.",
    },
    {
      number: 53,
      text: "My god is no 'he', no 'it', but a verb, a ceaseless process. When you journey the path of individuation, striving to actualize your healthiest potential, you are worshipping the truest god.",
    },
  ]

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveQuote((prev) => (prev + 1) % quotes.length)
    }, 8000)
    return () => clearInterval(interval)
  }, [])

  return (
    <section id="scripture" className="relative py-32 overflow-hidden">
      <div className="absolute inset-0 psyche-mesh aurora-bg" />

      {/* Psychedelic breathing orbs */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full breathing-orb" style={{ background: 'radial-gradient(circle, rgba(255,113,206,0.2) 0%, transparent 70%)' }} />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full breathing-orb" style={{ background: 'radial-gradient(circle, rgba(1,205,254,0.2) 0%, transparent 70%)', animationDelay: '2s' }} />
        <div className="absolute top-1/2 right-1/3 w-64 h-64 rounded-full breathing-orb" style={{ background: 'radial-gradient(circle, rgba(5,255,161,0.15) 0%, transparent 70%)', animationDelay: '3s' }} />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
        <h2 className="font-display text-5xl md:text-6xl font-light text-cream mb-16">
          From the <span className="text-gradient-rainbow glow-rainbow">Scripture</span>
        </h2>

        <div className="relative min-h-[300px] flex items-center justify-center">
          {quotes.map((quote, index) => (
            <blockquote
              key={quote.number}
              className={`absolute inset-0 flex flex-col items-center justify-center transition-all duration-1000 ${
                index === activeQuote ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8 pointer-events-none'
              }`}
            >
              <p className="font-display text-2xl md:text-3xl text-cream/90 italic leading-relaxed mb-8">
                "{quote.text}"
              </p>
              <footer className="text-aurora-purple font-body">
                — § {quote.number}
              </footer>
            </blockquote>
          ))}
        </div>

        <div className="flex justify-center gap-3 mt-12">
          {quotes.map((_, index) => {
            const colors = ['bg-aurora-pink', 'bg-aurora-blue', 'bg-aurora-green', 'bg-aurora-purple']
            return (
              <button
                key={index}
                onClick={() => setActiveQuote(index)}
                className={`h-2 rounded-full transition-all ${
                  index === activeQuote ? `${colors[index]} w-8` : 'bg-white/20 w-2 hover:bg-white/40'
                }`}
              />
            )
          })}
        </div>
      </div>
    </section>
  )
}

// Community Section with rainbow CTA
function CommunitySection() {
  return (
    <section id="community" className="relative py-32 bg-void-deep">
      <div className="absolute inset-0 flower-of-life-rainbow opacity-30" />
      <div className="absolute inset-0 psyche-mesh opacity-20" />

      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
        <div className="mb-8">
          <SacredGeometry rainbow className="w-32 h-32 mx-auto animate-breathe opacity-60" />
        </div>

        <h2 className="font-display text-5xl md:text-6xl font-light text-cream mb-6">
          Join the <span className="text-gradient-rainbow glow-rainbow-pulse">Becoming</span>
        </h2>

        <p className="font-body text-lg text-cream/60 mb-12 max-w-2xl mx-auto">
          WHOLE propagates through organic resonance — inspiring overflow that cascades from one awakened soul to another. <span className="text-aurora-blue">Connection amplifies wisdom</span>; isolation withers it.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href="https://www.facebook.com/uberrheogenic/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-3 px-8 py-4 bg-gradient-to-r from-aurora-pink via-aurora-purple to-aurora-blue text-white font-body font-medium rounded-full hover:scale-105 transition-transform animate-color-pulse"
          >
            Contact the Inaugural Chalice
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </a>

          <a
            href="#"
            className="inline-flex items-center justify-center gap-3 px-8 py-4 glass-rainbow text-cream font-body rounded-full hover:scale-105 transition-all trippy-hover"
          >
            Read the Prototype
          </a>
        </div>
      </div>
    </section>
  )
}

// Footer with rainbow accents
function Footer() {
  const colors = ['text-aurora-pink', 'text-aurora-green', 'text-aurora-blue', 'text-aurora-yellow', 'text-aurora-purple']

  return (
    <footer className="relative py-16 bg-void border-t border-aurora-purple/20">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="text-center md:text-left">
            <span className="font-display text-3xl text-gradient-rainbow glow-rainbow">WHOLE</span>
            <p className="font-body text-sm mt-2">
              {['Wonder', 'Honesty', 'Orthobiosis', 'Life', 'Entelechy'].map((word, i) => (
                <span key={word}>
                  <span className={colors[i]}>{word}</span>
                  {i < 4 && <span className="text-cream/30"> · </span>}
                </span>
              ))}
            </p>
          </div>

          <nav className="flex gap-6">
            {['Values', 'Philosophy', 'Practices', 'Scripture'].map((item, i) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                className={`font-body text-sm text-cream/50 hover:${colors[i]} transition-colors trippy-hover`}
              >
                {item}
              </a>
            ))}
          </nav>

          <p className="font-body text-xs text-gradient-aurora">
            A life-affirming memeplex
          </p>
        </div>
      </div>
    </footer>
  )
}

// Main App
function App() {
  return (
    <div className="relative bg-void min-h-screen">
      <AuroraOrbs />
      <ParticleField />
      <Navigation />
      <main>
        <HeroSection />
        <ValuesSection />
        <PhilosophySection />
        <PracticesSection />
        <ScriptureSection />
        <CommunitySection />
      </main>
      <Footer />
    </div>
  )
}

export default App

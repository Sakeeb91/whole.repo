import { useState, useEffect } from 'react'
import './index.css'

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

// Navigation
function Navigation() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navItems = ['Values', 'Philosophy', 'Practices', 'Scripture', 'Community']

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled ? 'glass-dimensional py-4' : 'py-6'}`}>
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        <a href="#" className="font-display text-2xl font-semibold text-holographic">
          W
        </a>
        <div className="hidden md:flex items-center gap-8">
          {navItems.map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase()}`}
              className="font-body text-sm text-cream/60 hover:text-gold transition-colors animated-underline"
            >
              {item}
            </a>
          ))}
        </div>
        <button className="md:hidden text-gold">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>
    </nav>
  )
}

// Hero Section - Hyper-dimensional
function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center nebula-bg overflow-hidden">
      <NebulaLayer />
      <MyceliumNetwork />

      <FractalGeometry className="w-[800px] h-[800px] -top-40 -right-40" layers={4} />
      <FractalGeometry className="w-[600px] h-[600px] -bottom-20 -left-20" layers={3} />

      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
        <div className="mb-8 animate-fade-up opacity-0" style={{ animationDelay: '0.2s', animationFillMode: 'forwards' }}>
          <span className="inline-block px-4 py-2 glass-dimensional rounded-full text-sm text-gold/80 font-body tracking-widest uppercase">
            A Life-Affirming Path
          </span>
        </div>

        <h1 className="font-display text-7xl md:text-9xl font-light tracking-wide mb-6 animate-fade-up opacity-0" style={{ animationDelay: '0.4s', animationFillMode: 'forwards' }}>
          <span className="text-gradient-gold glow-gold-intense">WHOLE</span>
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
            className="inline-flex items-center gap-2 px-8 py-4 glass-dimensional rounded-full text-cream font-body hover-dimensional"
          >
            Begin the Journey
            <svg className="w-4 h-4 animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </a>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-void via-void/80 to-transparent" />
    </section>
  )
}

// Values Section - Holographic cards
function ValuesSection() {
  const values = [
    { letter: 'W', name: 'Wonder', description: 'Philosophy begins in wonder — the capacity for curiosity, astonishment, and appreciation of beauty and complexity. It invokes humility before the vast mystery of existence.' },
    { letter: 'H', name: 'Honesty', description: 'Truthfulness, transparency, and sincerity in all dealings — with others and oneself. Authenticity that inoculates against ideology and promotes introspection.' },
    { letter: 'O', name: 'Orthobiosis', description: 'Right living aimed at optimal health — not merely freedom from ailments, but the practice of aligning oneself with the patterns of Life itself.' },
    { letter: 'L', name: 'Life', description: 'The singular intrinsic value — self-potentiating, self-actualizing creativity. Life as will to power, embracing amor fati and Dionysian affirmation.' },
    { letter: 'E', name: 'Entelechy', description: 'The active actualization of potential — maturation, character development, self-mastery. The endless process of individuation and self-overcoming.' },
  ]

  return (
    <section id="values" className="relative py-32 bg-void-deep">
      <div className="absolute inset-0 fractal-flower" />
      <div className="absolute inset-0 neural-network opacity-50" />
      <MyceliumNetwork />

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <div className="text-center mb-20">
          <h2 className="font-display text-5xl md:text-6xl font-light text-cream mb-6">
            The Five <span className="text-holographic">Values</span>
          </h2>
          <p className="font-body text-lg text-cream/50 max-w-2xl mx-auto">
            Each value manifests through virtues of Wisdom — together forming a holographic constellation where each part contains the whole.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {values.map((value, index) => (
            <div
              key={value.name}
              className={`group relative p-8 rounded-2xl glass-dimensional hover-dimensional ${index === 4 ? 'md:col-span-2 lg:col-span-1' : ''}`}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="absolute top-4 right-4 font-display text-7xl font-bold text-gold/5 group-hover:text-gold/15 transition-colors duration-700">
                {value.letter}
              </div>
              <div className="absolute inset-0 rounded-2xl metatron-cube opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
              <h3 className="font-display text-2xl text-cream mb-4 relative z-10">{value.name}</h3>
              <p className="font-body text-cream/60 leading-relaxed relative z-10">{value.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// Philosophy Section - Fractal orb
function PhilosophySection() {
  return (
    <section id="philosophy" className="relative py-32 nebula-bg overflow-hidden">
      <NebulaLayer />
      <FractalGeometry className="w-[700px] h-[700px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" layers={5} />

      <div className="relative z-10 max-w-6xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <span className="inline-block px-3 py-1 text-xs tracking-widest uppercase text-gold/80 glass-dimensional rounded-full mb-6">
              Holographic Structure
            </span>
            <h2 className="font-display text-4xl md:text-5xl font-light text-cream mb-8 leading-tight">
              A Living Memeplex of <span className="text-holographic">Infinite Depth</span>
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
        </div>
      </div>
    </section>
  )
}

// Practices Section
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
    <section id="practices" className="relative py-32 bg-void">
      <div className="absolute inset-0 metatron-cube" />
      <div className="absolute inset-0 neural-network opacity-30" />

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <div className="text-center mb-20">
          <h2 className="font-display text-5xl md:text-6xl font-light text-cream mb-6">
            Ecology of <span className="text-holographic">Practices</span>
          </h2>
          <p className="font-body text-lg text-cream/50 max-w-2xl mx-auto">
            Everything that affords self-transformation and the cultivation of wisdom is a potential tool for furthering the path.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {practices.map((practice, i) => (
            <div
              key={practice.title}
              className="group p-8 rounded-xl glass-dimensional hover-dimensional"
              style={{ animationDelay: `${i * 0.1}s` }}
            >
              <div
                className="text-4xl text-gold/70 mb-6 group-hover:text-gold transition-colors"
                style={{ animation: `fractalPulse ${8 + i}s ease-in-out infinite` }}
              >
                {practice.icon}
              </div>
              <h3 className="font-display text-xl text-cream mb-3">{practice.title}</h3>
              <p className="font-body text-cream/50 text-sm leading-relaxed">{practice.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// Scripture Section
function ScriptureSection() {
  const [activeQuote, setActiveQuote] = useState(0)

  const quotes = [
    { number: 3, text: "Consciousness asleep worships phantoms, fleeting idols born of delusion. But awakened, each mind beholds the divine within, the lucid potential birthing worlds from void." },
    { number: 14, text: "The purpose of creation is not to serve you, but for you to serve creation by fully becoming you. When your unique ode rings loud, you amplify existence itself." },
    { number: 24, text: "Fractured fragments longing for perfection forsake the fertile soil of wholeness. In embracing the meandering way of integrity, the path reveals a living terrain; flaws foster wisdom." },
    { number: 53, text: "My god is no 'he', no 'it', but a verb, a ceaseless process. When you journey the path of individuation, striving to actualize your healthiest potential, you are worshipping the truest god." },
  ]

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveQuote((prev) => (prev + 1) % quotes.length)
    }, 8000)
    return () => clearInterval(interval)
  }, [])

  return (
    <section id="scripture" className="relative py-32 nebula-bg overflow-hidden">
      <NebulaLayer />
      <FractalGeometry className="w-[500px] h-[500px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-50" layers={3} />

      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
        <h2 className="font-display text-5xl md:text-6xl font-light text-cream mb-16">
          From the <span className="text-holographic">Scripture</span>
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
              <footer className="text-gold/60 font-body">— § {quote.number}</footer>
            </blockquote>
          ))}
        </div>

        <div className="flex justify-center gap-3 mt-12">
          {quotes.map((_, index) => (
            <button
              key={index}
              onClick={() => setActiveQuote(index)}
              className={`w-2 h-2 rounded-full transition-all duration-500 ${
                index === activeQuote ? 'bg-gold w-8' : 'bg-gold/20 hover:bg-gold/40'
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

// Community Section
function CommunitySection() {
  return (
    <section id="community" className="relative py-32 bg-void-deep">
      <div className="absolute inset-0 fractal-flower opacity-40" />
      <MyceliumNetwork />

      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
        <FractalGeometry className="w-40 h-40 left-1/2 -translate-x-1/2 mx-auto mb-8" layers={2} />

        <h2 className="font-display text-5xl md:text-6xl font-light text-cream mb-6">
          Join the <span className="text-holographic">Becoming</span>
        </h2>

        <p className="font-body text-lg text-cream/50 mb-12 max-w-2xl mx-auto">
          WHOLE propagates through organic resonance — inspiring overflow that cascades from one awakened soul to another. Connection amplifies wisdom; isolation withers it.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href="https://www.facebook.com/uberrheogenic/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-3 px-8 py-4 bg-gradient-to-r from-gold to-gold-bright text-void-deep font-body font-medium rounded-full hover:scale-105 transition-transform depth-shadow"
          >
            Contact the Inaugural Chalice
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </a>

          <a href="#" className="inline-flex items-center justify-center gap-3 px-8 py-4 glass-dimensional text-cream font-body rounded-full hover-dimensional">
            Read the Prototype
          </a>
        </div>
      </div>
    </section>
  )
}

// Footer
function Footer() {
  return (
    <footer className="relative py-16 bg-void border-t border-gold/10">
      <div className="absolute inset-0 neural-network opacity-20" />
      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="text-center md:text-left">
            <span className="font-display text-3xl text-holographic">WHOLE</span>
            <p className="font-body text-sm text-cream/30 mt-2">Wonder · Honesty · Orthobiosis · Life · Entelechy</p>
          </div>

          <nav className="flex gap-6">
            {['Values', 'Philosophy', 'Practices', 'Scripture'].map((item) => (
              <a key={item} href={`#${item.toLowerCase()}`} className="font-body text-sm text-cream/40 hover:text-gold transition-colors">
                {item}
              </a>
            ))}
          </nav>

          <p className="font-body text-xs text-cream/20">A life-affirming memeplex</p>
        </div>
      </div>
    </footer>
  )
}

// Main App
function App() {
  return (
    <div className="relative bg-void min-h-screen">
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

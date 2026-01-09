"use client"

import { useRef, useState, useEffect } from "react"
import Link from "next/link"
import { motion, useScroll, useTransform, useSpring, useInView, AnimatePresence, useMotionValueEvent } from "framer-motion"
import { SignInButton, SignUpButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs"
import { Button } from "@/components/ui/button"
import { 
  ArrowRight, Play, Github, Instagram, ChevronDown,
  Globe, Sparkles, Copy, Check, Palette, Code2, FileCode,
  MousePointerClick, Wand2, ClipboardCopy, ArrowDown
} from "lucide-react"
import Hyperspeed from "@/components/ReactBits/Hyperspeed"
import DecryptedText from "@/components/ReactBits/DecryptedText"
import TextPressure from "@/components/TextPressure"

// Magnetic button component
const MagneticButton = ({ children, className, onClick }: { 
  children: React.ReactNode
  className?: string
  onClick?: () => void 
}) => {
  const ref = useRef<HTMLButtonElement>(null)
  const [position, setPosition] = useState({ x: 0, y: 0 })

  const handleMouse = (e: React.MouseEvent) => {
    const { clientX, clientY } = e
    const { left, top, width, height } = ref.current!.getBoundingClientRect()
    const x = (clientX - left - width / 2) * 0.3
    const y = (clientY - top - height / 2) * 0.3
    setPosition({ x, y })
  }

  const reset = () => setPosition({ x: 0, y: 0 })

  return (
    <motion.button
      ref={ref}
      onMouseMove={handleMouse}
      onMouseLeave={reset}
      onClick={onClick}
      animate={{ x: position.x, y: position.y }}
      transition={{ type: "spring", stiffness: 150, damping: 15 }}
      className={className}
    >
      {children}
    </motion.button>
  )
}

// Glowing orb cursor follower
const GlowingCursor = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }
    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  return (
    <motion.div
      className="fixed w-96 h-96 rounded-full pointer-events-none z-0 mix-blend-screen"
      style={{
        background: 'radial-gradient(circle, rgba(3,179,195,0.15) 0%, transparent 70%)',
      }}
      animate={{
        x: mousePosition.x - 192,
        y: mousePosition.y - 192,
      }}
      transition={{ type: "spring", stiffness: 50, damping: 30 }}
    />
  )
}

// Vertical Step Component with scroll animation
const VerticalStep = ({ 
  step, 
  icon, 
  title, 
  description,
  features,
  isLast = false,
  accentColor = "cyan"
}: { 
  step: number
  icon: React.ReactNode
  title: string
  description: string
  features: string[]
  isLast?: boolean
  accentColor?: "cyan" | "pink" | "green"
}) => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  
  const colorClasses = {
    cyan: {
      text: "text-cyan-400",
      bg: "bg-cyan-500",
      border: "border-cyan-500/50",
      glow: "bg-cyan-500/20",
      shadow: "shadow-[0_0_60px_-15px_rgba(3,179,195,0.5)]"
    },
    pink: {
      text: "text-[#D856BF]",
      bg: "bg-[#D856BF]",
      border: "border-[#D856BF]/50",
      glow: "bg-[#D856BF]/20",
      shadow: "shadow-[0_0_60px_-15px_rgba(216,86,191,0.5)]"
    },
    green: {
      text: "text-purple-400",
      bg: "bg-purple-500",
      border: "border-purple-500/50",
      glow: "bg-purple-500/20",
      shadow: "shadow-[0_0_60px_-15px_rgba(34,197,94,0.5)]"
    }
  }

  const colors = colorClasses[accentColor]

  return (
    <div ref={ref} className="relative flex gap-8 md:gap-16">
      {/* Timeline */}
      <div className="flex flex-col items-center">
        {/* Step number circle */}
        <motion.div
          className={`relative z-10 size-16 md:size-20 rounded-full border-2 flex items-center justify-center bg-black ${
            isInView ? colors.border : 'border-white/10'
          } transition-colors duration-700`}
          initial={{ scale: 0, rotate: -180 }}
          animate={isInView ? { scale: 1, rotate: 0 } : {}}
          transition={{ duration: 0.6, type: "spring", stiffness: 100 }}
        >
          {/* Glow effect */}
          {isInView && (
            <motion.div
              className={`absolute inset-0 rounded-full ${colors.glow} blur-xl`}
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1.5 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            />
          )}
          
          <motion.span 
            className={`relative text-2xl md:text-3xl font-black ${isInView ? colors.text : 'text-white/20'} transition-colors duration-700`}
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.3 }}
          >
            {step}
          </motion.span>
        </motion.div>
        
        {/* Connecting line */}
        {!isLast && (
          <div className="relative w-[2px] flex-1 min-h-[200px] bg-white/5 overflow-hidden">
            <motion.div
              className={`absolute top-0 left-0 w-full ${colors.bg}`}
              initial={{ height: "0%" }}
              animate={isInView ? { height: "100%" } : {}}
              transition={{ duration: 1, delay: 0.5, ease: "easeOut" }}
            />
          </div>
        )}
      </div>

      {/* Content */}
      <motion.div
        className="flex-1 pb-24 md:pb-32"
        initial={{ opacity: 0, x: 50 }}
        animate={isInView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        {/* Step label */}
        <motion.div
          className={`inline-flex items-center gap-2 px-3 py-1 border ${colors.border} bg-black mb-6`}
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.4 }}
        >
          <span className={`text-[10px] font-mono ${colors.text} tracking-widest uppercase`}>
            Step 0{step}
          </span>
        </motion.div>

        {/* Icon and title */}
        <div className="flex items-start gap-4 mb-6">
          <motion.div
            className={`p-4 border ${isInView ? colors.border : 'border-white/10'} bg-black/50 transition-colors duration-500`}
            initial={{ scale: 0, rotate: -45 }}
            animate={isInView ? { scale: 1, rotate: 0 } : {}}
            transition={{ delay: 0.5, type: "spring" }}
          >
            {icon}
          </motion.div>
          <div>
            <motion.h3
              className="text-2xl md:text-4xl font-black uppercase tracking-tight mb-2"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.5 }}
            >
              {title}
            </motion.h3>
            <motion.p
              className="text-gray-500 text-sm md:text-base leading-relaxed max-w-lg"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.6 }}
            >
              {description}
            </motion.p>
          </div>
        </div>

        {/* Features list */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-8"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.7 }}
        >
          {features.map((feature, i) => (
            <motion.div
              key={feature}
              className="flex items-center gap-3 text-sm text-gray-400"
              initial={{ opacity: 0, x: 20 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: 0.7 + i * 0.1 }}
            >
              <div className={`size-1.5 ${colors.bg} rounded-full`} />
              {feature}
            </motion.div>
          ))}
        </motion.div>

        {/* Visual element based on step */}
        <motion.div
          className={`mt-8 p-6 border border-white/10 bg-white/[0.02] backdrop-blur-sm ${isInView ? colors.shadow : ''} transition-shadow duration-700`}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.8 }}
        >
          {step === 1 && (
            <div className="flex items-center gap-4">
              <Globe className={`size-5 ${colors.text}`} />
              <div className="flex-1 h-12 bg-white/5 border border-white/10 flex items-center px-4">
                <span className="text-gray-500 font-mono text-sm">https://example.com</span>
                <motion.span
                  className="ml-1 w-[2px] h-5 bg-cyan-400"
                  animate={{ opacity: [1, 0] }}
                  transition={{ duration: 0.8, repeat: Infinity }}
                />
              </div>
            </div>
          )}
          {step === 2 && (
            <div className="space-y-3">
              {['Analyzing DOM...', 'Extracting styles...', 'Detecting components...'].map((text, i) => (
                <motion.div
                  key={text}
                  className="flex items-center gap-3"
                  initial={{ opacity: 0, x: -20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 1 + i * 0.2 }}
                >
                  <motion.div
                    className={`size-2 rounded-full ${colors.bg}`}
                    animate={{ scale: [1, 1.5, 1], opacity: [0.5, 1, 0.5] }}
                    transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.3 }}
                  />
                  <span className="text-sm font-mono text-gray-200">{text}</span>
                </motion.div>
              ))}
            </div>
          )}
          {step === 3 && (
            <div className="flex items-center justify-between">
              <pre className="text-xs font-mono text-white/80 leading-relaxed">
                {`import { Hero } from './components'`}
              </pre>
              <div className="flex items-center gap-2 px-3 py-1.5 bg-purple-500/10 border border-purple-500/30">
                <Check className="size-3 text-purple-400" />
                <span className="text-[10px] font-mono text-purple-400">Ready to use</span>
              </div>
            </div>
          )}
        </motion.div>
      </motion.div>
    </div>
  )
}

// How It Works Section with scroll progress
const HowItWorksSection = () => {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  })

  const steps = [
    {
      icon: <Globe className="size-6 text-cyan-400" />,
      title: "Enter the URL",
      description: "Simply paste the URL of any website you want to extract components from. Our system accepts any publicly accessible webpage.",
      features: [
        "Support for any public URL",
        "Automatic page rendering",
        "Handle dynamic content",
        "SPA detection"
      ],
      accentColor: "cyan" as const
    },
    {
      icon: <Sparkles className="size-6 text-[#D856BF]" />,
      title: "AI Fetches Everything",
      description: "Our AI analyzes the page structure, extracts color palettes, identifies UI patterns, and generates clean, production-ready component code.",
      features: [
        "Color palette extraction",
        "Typography detection",
        "Component identification",
        "Style mapping"
      ],
      accentColor: "pink" as const
    },
    {
      icon: <ClipboardCopy className="size-6 text-purple-400" />,
      title: "Copy, Paste & Build",
      description: "Get your generated components with a simple copy-paste. Each component comes with a usage guide and all necessary dependencies listed.",
      features: [
        "One-click copy",
        "Usage documentation",
        "Dependency list included",
        "Framework-ready code"
      ],
      accentColor: "green" as const
    }
  ]

  return (
    <section id="how-it-works" ref={containerRef} className="relative z-10 py-32">
      {/* Background gradient that follows scroll */}
    

      <div className="container mx-auto px-6">
        {/* Section Header */}
        <motion.div
          className="text-center mb-24"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <motion.span 
            className="inline-flex items-center gap-2 px-4 py-2 border border-white/10 bg-white/[0.02] mb-6"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
          >
            <span className="text-[10px] font-mono text-cyan-500 tracking-widest uppercase">
              Simple Process
            </span>
            <ArrowDown className="size-3 text-cyan-500" />
          </motion.span>
          
          <h2 className="text-4xl md:text-6xl font-black italic tracking-tighter mb-6 uppercase">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-500">How It</span>{' '}
            <span className="text-cyan-400">Works</span>
          </h2>
          <p className="text-gray-500 text-sm md:text-base max-w-lg mx-auto">
            Three simple steps to transform any website into reusable, production-ready components
          </p>
        </motion.div>

       

        {/* Steps */}
        <div className="max-w-4xl mx-auto pl-4 md:pl-0">
          {steps.map((step, index) => (
            <VerticalStep
              key={step.title}
              step={index + 1}
              icon={step.icon}
              title={step.title}
              description={step.description}
              features={step.features}
              isLast={index === steps.length - 1}
              accentColor={step.accentColor}
            />
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          className="text-center mt-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <p className="text-gray-500 text-sm mb-6">Ready to experience the magic?</p>
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <ChevronDown className="size-6 text-cyan-500 mx-auto" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

// Interactive Terminal Component
const InteractiveTerminal = () => {
  const [url, setUrl] = useState("")
  const [isProcessing, setIsProcessing] = useState(false)
  const [currentPhase, setCurrentPhase] = useState(0)
  const [copied, setCopied] = useState(false)
  const [showOutput, setShowOutput] = useState(false)

  const phases = [
    { text: "Connecting to target...", delay: 800 },
    { text: "Analyzing DOM structure...", delay: 1200 },
    { text: "Extracting color palette...", delay: 1000 },
    { text: "Identifying components...", delay: 1500 },
    { text: "Generating React code...", delay: 1200 },
    { text: "Compilation complete ✓", delay: 500 },
  ]

  const outputCode = `// Generated Component
import { motion } from "framer-motion"

export const HeroSection = () => {
  return (
    <section className="relative min-h-screen 
      bg-gradient-to-br from-slate-900 to-black">
      <div className="container mx-auto px-6 py-24">
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-6xl font-bold text-white"
        >
          Welcome to the Future
        </motion.h1>
        <Button className="mt-8 bg-cyan-500">
          Get Started
        </Button>
      </div>
    </section>
  )
}`

  const colorPalette = [
    { name: "Primary", hex: "#03B3C3" },
    { name: "Secondary", hex: "#D856BF" },
    { name: "Background", hex: "#0A0A0A" },
    { name: "Surface", hex: "#1A1A1A" },
    { name: "Text", hex: "#FFFFFF" },
    { name: "Muted", hex: "#6B7280" },
  ]

  const handleProcess = () => {
    if (!url) return
    setIsProcessing(true)
    setCurrentPhase(0)
    setShowOutput(false)

    let phase = 0
    const runPhase = () => {
      if (phase < phases.length) {
        setCurrentPhase(phase)
        setTimeout(() => {
          phase++
          runPhase()
        }, phases[phase].delay)
      } else {
        setIsProcessing(false)
        setShowOutput(true)
      }
    }
    runPhase()
  }

  const handleCopy = () => {
    navigator.clipboard.writeText(outputCode)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="border border-white/10 bg-black/80 backdrop-blur-xl overflow-hidden">
      {/* Terminal Header */}
      <div className="h-12 border-b border-white/10 flex items-center px-6 justify-between bg-white/[0.02]">
        <div className="flex gap-3">
          <div className="size-3 rounded-full bg-red-500/80" />
          <div className="size-3 rounded-full bg-yellow-500/80" />
          <div className="size-3 rounded-full bg-green-500/80" />
        </div>
        <DecryptedText 
          text="REFRACTION_TERMINAL_v2.0" 
          speed={40} 
          className="text-[10px] font-mono text-gray-500 tracking-[0.2em]" 
        />
        <div className="flex items-center gap-2">
          <motion.span 
            className="text-[9px] font-mono text-green-500"
            animate={{ opacity: [1, 0.5, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            ● READY
          </motion.span>
        </div>
      </div>

      <div className="grid lg:grid-cols-2 min-h-[600px]">
        {/* Left Panel - Input & Process */}
        <div className="p-8 border-r border-white/10 flex flex-col">
          <div className="mb-8">
            <span className="text-[10px] font-mono text-cyan-500 tracking-widest uppercase mb-4 block">
              Input
            </span>
            <div className="relative">
              <Globe className="absolute left-4 top-1/2 -translate-y-1/2 size-4 text-gray-500" />
              <input
                type="text"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder="https://example.com"
                className="w-full h-14 pl-12 pr-4 bg-white/5 border border-white/10 text-white font-mono text-sm placeholder:text-gray-600 focus:outline-none focus:border-cyan-500/50 transition-colors"
              />
            </div>
          </div>

          <MagneticButton
            onClick={handleProcess}
            className={`h-14 w-full font-black tracking-widest text-sm transition-all flex items-center justify-center gap-3 ${
              isProcessing 
                ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/50' 
                : 'bg-white text-black hover:bg-white/90'
            }`}
          >
            {isProcessing ? (
              <>
                <motion.div
                  className="size-4 border-2 border-cyan-400 border-t-transparent rounded-full"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                />
                PROCESSING
              </>
            ) : (
              <>
                <Wand2 className="size-4" />
                EXTRACT COMPONENTS
              </>
            )}
          </MagneticButton>

          {/* Process Log */}
          <div className="mt-8 flex-1 bg-black/50 border border-white/5 p-4 font-mono text-xs overflow-hidden">
            <div className="text-gray-600 mb-4"># Process Log</div>
            <AnimatePresence>
              {isProcessing && phases.slice(0, currentPhase + 1).map((phase, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  className={`mb-2 flex items-center gap-2 ${
                    i === currentPhase ? 'text-cyan-400' : 'text-gray-500'
                  }`}
                >
                  <span className="text-gray-600">›</span>
                  {phase.text}
                  {i === currentPhase && (
                    <motion.span
                      animate={{ opacity: [1, 0] }}
                      transition={{ duration: 0.5, repeat: Infinity }}
                    >
                      _
                    </motion.span>
                  )}
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>

        {/* Right Panel - Output */}
        <div className="bg-black/60 flex flex-col">
          <AnimatePresence mode="wait">
            {showOutput ? (
              <motion.div
                key="output"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex flex-col h-full"
              >
                {/* Color Palette */}
                <div className="p-6 border-b border-white/10">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-[10px] font-mono text-[#D856BF] tracking-widest uppercase flex items-center gap-2">
                      <Palette className="size-3" />
                      Extracted Palette
                    </span>
                  </div>
                  <div className="grid grid-cols-6 gap-2">
                    {colorPalette.map((color) => (
                      <div key={color.name} className="group cursor-pointer">
                        <div 
                          className="h-8 border border-white/10 transition-transform group-hover:scale-105"
                          style={{ backgroundColor: color.hex }}
                        />
                        <div className="mt-1 text-[8px] font-mono text-gray-600 text-center">
                          {color.hex}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Generated Code */}
                <div className="flex-1 p-6 relative">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-[10px] font-mono text-cyan-500 tracking-widest uppercase flex items-center gap-2">
                      <FileCode className="size-3" />
                      Generated Component
                    </span>
                    <button
                      onClick={handleCopy}
                      className="flex items-center gap-2 px-3 py-1.5 bg-white/5 hover:bg-white/10 border border-white/10 transition-colors"
                    >
                      {copied ? (
                        <>
                          <Check className="size-3 text-green-400" />
                          <span className="text-[10px] font-mono text-green-400">Copied!</span>
                        </>
                      ) : (
                        <>
                          <Copy className="size-3 text-gray-400" />
                          <span className="text-[10px] font-mono text-gray-400">Copy</span>
                        </>
                      )}
                    </button>
                  </div>
                  <pre className="text-[11px] font-mono text-cyan-500/80 leading-relaxed overflow-auto max-h-[280px]">
                    {outputCode}
                  </pre>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="placeholder"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex-1 flex items-center justify-center"
              >
                <div className="text-center">
                  <motion.div
                    className="size-16 mx-auto mb-4 border border-white/10 flex items-center justify-center"
                    animate={{ 
                      borderColor: ['rgba(255,255,255,0.1)', 'rgba(3,179,195,0.3)', 'rgba(255,255,255,0.1)']
                    }}
                    transition={{ duration: 3, repeat: Infinity }}
                  >
                    <Code2 className="size-6 text-gray-600" />
                  </motion.div>
                  <p className="text-[11px] font-mono text-gray-600 tracking-widest uppercase">
                    Output will appear here
                  </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  )
}

export default function HyperspeedLanding() {
  const { scrollYProgress } = useScroll()
  const containerRef = useRef(null)
  const heroRef = useRef(null)
  const isHeroInView = useInView(heroRef, { once: true })
  
  // Smooth spring animations
  const smoothProgress = useSpring(scrollYProgress, { stiffness: 100, damping: 30 })
  const yContent = useTransform(smoothProgress, [0, 0.2], [0, -100])
  const opacityContent = useTransform(smoothProgress, [0, 0.15], [1, 0])
  const scale = useTransform(smoothProgress, [0, 0.2], [1, 0.95])

  // Navbar background opacity based on scroll
  const navBgOpacity = useTransform(scrollYProgress, [0, 0.1], [0, 1])

  return (
    <div 
      ref={containerRef}
      className="min-h-screen bg-[#000000] relative text-white selection:bg-cyan-500/30 overflow-x-hidden"
    >
      {/* Background Effects */}
      <GlowingCursor />
      
      <motion.div 
        className="z-10 absolute top-[-10%] right-[-5%] w-[50%] h-[30%] bg-pink-700/20 blur-[120px] rounded-full pointer-events-none"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.2, 0.3, 0.2],
        }}
        transition={{ duration: 8, repeat: Infinity }}
      />
      <motion.div 
        className="z-20 absolute top-[-10%] left-[-5%] w-[50%] h-[30%] bg-cyan-700/20 blur-[120px] rounded-full pointer-events-none"
        animate={{
          scale: [1.2, 1, 1.2],
          opacity: [0.3, 0.2, 0.3],
        }}
        transition={{ duration: 8, repeat: Infinity }}
      />
      
      <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-[80%] h-[40%] bg-gradient-to-t from-cyan-900/10 to-transparent blur-[100px] pointer-events-none" />

      {/* Hyperspeed Background */}
      <div className="fixed inset-0 z-0 opacity-100">
        <Hyperspeed
          effectOptions={{
            onSpeedUp: () => { },
            onSlowDown: () => { },
            distortion: 'turbulentDistortion',
            length: 400,
            roadWidth: 20,
            islandWidth: 2,
            lanesPerRoad: 6,
            fov: 90,
            fovSpeedUp: 150,
            speedUp: 2,
            carLightsFade: 0.4,
            totalSideLightSticks: 20,
            lightPairsPerRoadWay: 40,
            shoulderLinesWidthPercentage: 0.05,
            brokenLinesWidthPercentage: 0.1,
            brokenLinesLengthPercentage: 0.5,
            lightStickWidth: [0.12, 0.5],
            lightStickHeight: [1.3, 1.7],
            movingAwaySpeed: [60, 80],
            movingCloserSpeed: [-120, -160],
            carLightsLength: [400 * 0.03, 400 * 0.2],
            carLightsRadius: [0.05, 0.14],
            carWidthPercentage: [0.3, 0.5],
            carShiftX: [-0.8, 0.8],
            carFloorSeparation: [0, 5],
            colors: {
              roadColor: 0x000000, 
              islandColor: 0x000000,
              background: 0x000000,
              shoulderLines: 0xFFFFFF,
              brokenLines: 0xFFFFFF,
              leftCars: [0xD856BF, 0x6750A2, 0xC247AC], 
              rightCars: [0x03B3C3, 0x0E5EA5, 0x324555], 
              sticks: 0x03B3C3,
            }
          }}
        />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,#000000_100%)]" />
      </div>

      {/* Navigation */}
      <motion.nav 
        className="fixed top-0 w-full z-[100] px-6 py-4"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        <div className="container mx-auto max-w-7xl h-16 relative">
          <motion.div 
            className="absolute inset-0 bg-black/50 backdrop-blur-xl border border-white/10 rounded-full shadow-[0_0_30px_-10px_rgba(3,179,195,0.3)]"
            style={{ opacity: navBgOpacity }}
          />
          <div className="absolute inset-0 bg-black/50 backdrop-blur-md border border-white/5 rounded-full" />
          
          <div className="relative h-full px-8 flex items-center justify-between">
            <Link href="/" className="flex items-center gap-3 group">
              <span className="text-xl font-black tracking-widest uppercase italic bg-clip-text text-transparent bg-gradient-to-r from-white via-white to-gray-300">
                Refraction
              </span>
            </Link>

            <div className="hidden lg:flex items-center gap-8">
              {['How it Works', 'Terminal'].map((item, i) => (
                <motion.div
                  key={item}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 + i * 0.1 }}
                >
                  <Link 
                    href={`#${item.toLowerCase().replace(/\s+/g, '-')}`} 
                    className="text-[14px] font-black text-gray-400 hover:text-white transition-colors"
                  >
                    {item}
                  </Link>
                </motion.div>
              ))}
            </div>
            
            <div className="flex items-center gap-6">
              <SignedOut>
                <SignInButton mode="modal">
                  <motion.button 
                    className="text-[13px] font-black tracking-[0.2em] text-gray-400 hover:text-white/80 transition-colors uppercase"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Login
                  </motion.button>
                </SignInButton>
                
                <SignUpButton mode="modal">
                  <Button className="group bg-white rounded-none relative px-6 py-2 overflow-hidden hover:bg-white/80 hover:text-black">                    
                    <span className="relative text-[13px] font-black tracking-widest text-black transition-colors duration-300 uppercase flex items-center gap-2">
                      Initialize 
                    </span>
                  </Button>
                </SignUpButton>
              </SignedOut>

              <SignedIn>
                <div className="flex items-center gap-4">
                  <motion.span 
                    className="text-[10px] font-mono text-cyan-500"
                    animate={{ opacity: [1, 0.5, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    SYSTEM_ACTIVE
                  </motion.span>
                  <UserButton 
                    appearance={{
                      elements: {
                        avatarBox: "size-8 rounded-none border border-white/20 hover:border-cyan-500 transition-colors"
                      }
                    }}
                  />
                </div>
              </SignedIn>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Hero Section */}
      <motion.main 
        ref={heroRef}
        className="relative z-10 pt-48 pb-32 container mx-auto px-6 text-center"
        style={{ y: yContent, opacity: opacityContent, scale }}
      >
        <motion.div 
          className="mb-8 w-full flex justify-center"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={isHeroInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <TextPressure
            text="Refraction"
            flex={true}
            alpha={false}
            stroke={false}
            width={true}
            weight={true}
            italic={true}
            textColor=""
            strokeColor="#E6DCDC"
            minFontSize={20}
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isHeroInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <p className="text-white/70 max-w-2xl mx-auto mb-4 text-md font-medium leading-relaxed">
            Transform any website into production-ready React components with AI-powered precision.
          </p>
        </motion.div>

        <motion.div 
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={isHeroInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <SignUpButton mode="modal">
            <Button className="h-14 px-10 bg-white hover:bg-white/50 text-black font-black rounded-none transition-all duration-700 group tracking-widest flex items-center">
              START EXTRACTING 
              <motion.span
                className="ml-2"
                animate={{ x: [0, 5, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                <ArrowRight className="size-4" />
              </motion.span>
            </Button>
          </SignUpButton>
          
          <MagneticButton className="h-14 px-10 text-[10px] font-black tracking-[0.3em] border border-white/10 hover:bg-white hover:text-black transition-all uppercase flex items-center gap-2 group">
            <Play className="size-3 group-hover:text-black" />
            Watch Demo
          </MagneticButton>
        </motion.div>

        <motion.div
          className="flex flex-col items-center gap-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
        >
          <span className="text-[9px] font-mono text-gray-600 tracking-widest uppercase">Scroll to explore</span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <ChevronDown className="size-4 text-gray-600" />
          </motion.div>
        </motion.div>
      </motion.main>

      {/* How It Works Section */}
      <HowItWorksSection />

      {/* Terminal Section */}
      <section id="terminal" className="relative z-10 container mx-auto px-6 pb-32">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <span className="text-[10px] font-mono text-[#D856BF] tracking-widest uppercase mb-4 block">
            Live Demo
          </span>
          <h2 className="text-4xl md:text-5xl font-black italic tracking-tighter mb-4 uppercase">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-500">Try It</span>{' '}
            <span className="text-cyan-400">Now</span>
          </h2>
          <p className="text-gray-500 text-sm max-w-md mx-auto">
            Enter any URL and watch the magic happen in real-time
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <InteractiveTerminal />
        </motion.div>

        {/* Usage Guide */}
        <motion.div
          className="mt-12 p-8 border border-white/10 bg-black/50 backdrop-blur-sm"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 border border-white/10">
              <MousePointerClick className="size-4 text-cyan-400" />
            </div>
            <h3 className="text-lg font-black uppercase tracking-wide">Quick Usage Guide</h3>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                step: "1",
                title: "Install Dependencies",
                code: "npm install framer-motion lucide-react"
              },
              {
                step: "2",
                title: "Copy Component",
                code: "// Paste in your components folder"
              },
              {
                step: "3",
                title: "Import & Use",
                code: "import { HeroSection } from './components'"
              }
            ].map((item) => (
              <div key={item.step} className="space-y-3">
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-mono text-gray-500 bg-cyan-500/10 px-2 py-1">
                    Step {item.step}
                  </span>
                  <span className="text-sm font-bold">{item.title}</span>
                </div>
                <pre className="text-[11px] font-mono text-gray-500 bg-white/5 p-3 border border-white/5">
                  {item.code}
                </pre>
              </div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* CTA Section */}
      <section className="relative z-10 py-32 border-t border-white/5">
        <div className="container mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-5xl md:text-6xl font-black italic tracking-tighter mb-6 uppercase">
              Ready to Refract?
            </h2>
            <p className="text-gray-500 max-w-md mx-auto mb-10 text-sm">
              Join thousands of developers transforming the web into reusable components.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <SignUpButton mode="modal">
                <MagneticButton className="h-16 px-12 bg-white text-black font-black rounded-none transition-all duration-700 tracking-widest text-lg flex items-center gap-3 hover:shadow-[0_0_60px_rgba(3,179,195,0.4)]">
                  GET STARTED FREE
                  <ArrowRight className="size-5" />
                </MagneticButton>
              </SignUpButton>
            </div>
            
            <p className="text-[10px] text-gray-600 mt-6 font-mono tracking-widest">
              NO CREDIT CARD REQUIRED • 1000 FREE EXTRACTIONS
            </p>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 border-t border-white/5 bg-black py-16">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-12 mb-12">
            <div className="md:col-span-2">
              <div className="flex items-center gap-2 mb-4">
                <span className="text-xl font-black tracking-widest uppercase italic">Refraction</span>
              </div>
              <p className="text-sm text-gray-500 max-w-sm mb-6">
                AI-powered web scraping and component generation platform. Transform any website into clean, reusable code.
              </p>
              <div className="flex gap-4">
                {[
                  { icon: <Github className="size-4" />, href: '#' },
                  { icon: <Instagram className="size-4" />, href: '#' },
                  { icon: <Play className="size-4" />, href: '#' },
                ].map((social, i) => (
                  <motion.a
                    key={i}
                    href={social.href}
                    className="p-3 border border-white/10 text-gray-500 hover:text-cyan-400 hover:border-cyan-500/50 transition-all"
                    whileHover={{ y: -2 }}
                  >
                    {social.icon}
                  </motion.a>
                ))}
                {/* built by section */}
                <motion.a
                  href="https://refractioncollective.com"
                  className="p-3 border border-white/10 text-gray-500 hover:text-cyan-400 hover:border-cyan-500/50 transition-all flex items-center gap-2"
                  whileHover={{ y: -2 }}
                >
                  <span className="text-[10px] font-mono">Built by</span>
                  {/* <RefractionCollectiveLogo className="size-4" /> */}
                  <span className="text-[10px] font-mono font-bold">Ganga Singh</span>
                </motion.a>
              </div>
            </div>
            
            <div>
              <h4 className="text-[11px] font-black tracking-widest uppercase text-white mb-4">Product</h4>
              <ul className="space-y-3">
                {['Features', 'Pricing', 'API', 'Changelog'].map((link) => (
                  <li key={link}>
                    <Link href="#" className="text-sm text-gray-500 hover:text-white transition-colors">
                      {link}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            
            <div>
              <h4 className="text-[11px] font-black tracking-widest uppercase text-white mb-4">Company</h4>
              <ul className="space-y-3">
                {['About', 'Blog', 'Careers', 'Contact'].map((link) => (
                  <li key={link}>
                    <Link href="#" className="text-sm text-gray-500 hover:text-white transition-colors">
                      {link}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          
          <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-4">
              <span className="text-[9px] font-mono text-gray-600 tracking-widest">
                © 2025 Refraction_Collective
              </span>
              <div className="h-3 w-[1px] bg-white/10" />
              <span className="text-[9px] font-mono text-cyan-500 tracking-widest flex items-center gap-2">
                <span className="relative flex h-1.5 w-1.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-green-500"></span>
                </span>
                ALL SYSTEMS OPERATIONAL
              </span>
            </div>
            
            <div className="flex gap-6">
              {['Privacy', 'Terms', 'Security'].map((link) => (
                <Link 
                  key={link}
                  href="#" 
                  className="text-[10px] font-mono text-gray-600 hover:text-white transition-colors uppercase tracking-widest"
                >
                  {link}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
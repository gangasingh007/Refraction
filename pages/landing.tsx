"use client"

import { useRef, useState, useEffect } from "react"
import Link from "next/link"
import { motion, useScroll, useTransform, useSpring, useInView, AnimatePresence } from "framer-motion"
import { SignInButton, SignUpButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs"
import { Button } from "@/components/ui/button"
import { 
  ArrowRight, Sparkles, Zap, LayoutTemplate, 
  Play, Terminal, Github, Instagram, ChevronDown,
  Code2, Layers, Cpu, ArrowUpRight, Command, Copy, Check
} from "lucide-react"

// Import custom components
import Hyperspeed from "@/components/ReactBits/Hyperspeed"
import DecryptedText from "@/components/ReactBits/DecryptedText"
import FeatureCard from "@/components/landing/FeatureCard"
import TextPressure from "@/components/TextPressure"

// Animated counter component
const AnimatedCounter = ({ value, duration = 2 }: { value: number; duration?: number }) => {
  const [count, setCount] = useState(0)
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })

  useEffect(() => {
    if (isInView) {
      let start = 0
      const end = value
      const incrementTime = (duration * 1000) / end
      const timer = setInterval(() => {
        start += 1
        setCount(start)
        if (start >= end) clearInterval(timer)
      }, incrementTime)
      return () => clearInterval(timer)
    }
  }, [isInView, value, duration])

  return <span ref={ref}>{count}</span>
}

// Floating particles component
const FloatingParticles = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {[...Array(20)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 bg-cyan-500/30 rounded-full"
          initial={{
            x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1000),
            y: Math.random() * (typeof window !== 'undefined' ? window.innerHeight : 1000),
          }}
          animate={{
            y: [null, -20, 20],
            opacity: [0.2, 0.5, 0.2],
          }}
          transition={{
            duration: 3 + Math.random() * 2,
            repeat: Infinity,
            repeatType: "reverse",
            delay: Math.random() * 2,
          }}
        />
      ))}
    </div>
  )
}

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

// Code block with copy functionality
const CodeBlock = ({ code }: { code: string }) => {
  const [copied, setCopied] = useState(false)

  const handleCopy = () => {
    navigator.clipboard.writeText(code)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="relative group">
      <button
        onClick={handleCopy}
        className="absolute top-4 right-4 p-2 bg-white/5 hover:bg-white/10 rounded transition-colors z-20"
      >
        {copied ? <Check className="size-4 text-green-400" /> : <Copy className="size-4 text-gray-400" />}
      </button>
      <pre className="leading-relaxed text-cyan-500/80">{code}</pre>
    </div>
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

  const [activeTab, setActiveTab] = useState<'react' | 'vue' | 'svelte'>('react')

  const codeExamples = {
    react: `// REFRACTION ENGINE OUTPUT
import { motion } from "framer-motion"

export const ActionButton = () => {
  return (
    <motion.button 
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className="px-8 py-4 bg-[#03B3C3] 
        text-black font-black uppercase
        tracking-widest rounded-none
        shadow-[0_0_40px_rgba(3,179,195,0.3)]"
    >
      Initialize
    </motion.button>
  )
}`,
    vue: `<!-- REFRACTION ENGINE OUTPUT -->
<template>
  <button 
    @mouseenter="hover = true"
    @mouseleave="hover = false"
    :class="buttonClasses"
  >
    Initialize
  </button>
</template>

<script setup>
const hover = ref(false)
const buttonClasses = computed(() => \`
  px-8 py-4 bg-[#03B3C3] text-black
  font-black uppercase tracking-widest
\`)
</script>`,
    svelte: `<!-- REFRACTION ENGINE OUTPUT -->
<script>
  let hover = false
</script>

<button 
  on:mouseenter={() => hover = true}
  on:mouseleave={() => hover = false}
  class="px-8 py-4 bg-[#03B3C3] 
    text-black font-black uppercase
    tracking-widest rounded-none
    transition-transform duration-200"
  class:scale-105={hover}
>
  Initialize
</button>`
  }

  // Stats data
  const stats = [
    { value: 150, suffix: 'ms', label: 'Avg. Extraction Time' },
    { value: 99, suffix: '%', label: 'Accuracy Rate' },
    { value: 50, suffix: 'K+', label: 'Components Generated' },
    { value: 24, suffix: '/7', label: 'System Uptime' },
  ]

  return (
    <div 
      ref={containerRef}
      className="min-h-screen bg-[#000000] relative text-white selection:bg-cyan-500/30 overflow-x-hidden"
    >
      {/* Cursor follower */}
      <div className="absolute z-10 top-[-10%] right-[-5%] w-[30%] h-[30%] bg-pink-700/20 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute z-10 top-[-10%] left-[-5%] w-[30%] h-[30%] bg-blue-700/10 blur-[120px] rounded-full pointer-events-none" />
      <GlowingCursor />
      


      {/* GRADIENT OVERLAY LAYER - Enhanced with animation */}
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
      
      {/* Additional ambient glow */}
      <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-[80%] h-[40%] bg-gradient-to-t from-cyan-900/10 to-transparent blur-[100px] pointer-events-none" />

      {/* ========== HYPERSPEED BACKGROUND ========== */}
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

      {/* ========== NAV ========== */}
      <motion.nav 
        className="fixed top-0 w-full z-[100] px-6 py-4"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        <div className="container mx-auto max-w-7xl h-16 relative">
          <motion.div 
            className="absolute inset-0 bg-black/50 backdrop-blur-xl border border-white/10 rounded-full md:rounded-full shadow-[0_0_30px_-10px_rgba(3,179,195,0.3)]"
            style={{ opacity: navBgOpacity }}
          />
          <div className="absolute  inset-0 bg-black/50 backdrop-blur-md border border-white/5 rounded-full " />
          
          <div className="relative h-full px-8 flex items-center justify-between">
            {/* LEFT: Logo */}
            <Link href="/" className="flex items-center gap-3 group">
              <div className="relative">

                <div className="relative flex items-center gap-2">
                  <span className="text-xl font-black tracking-widest uppercase italic bg-clip-text text-transparent bg-gradient-to-r from-white via-white to-gray-300">
                    Refraction
                  </span>
                </div>
              </div>
            </Link>

            {/* CENTER: Navigation Links */}
            <div className="hidden lg:flex items-center gap-8">
              {['Terminal', 'Features'].map((item, i) => (
                <motion.div
                  key={item}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 + i * 0.1 }}
                >
                  <Link 
                    href={`#${item.toLowerCase()}`} 
                    className="text-[14px] font-black text-gray-400 hover:text-white"
                  >
                    {item}
                    <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-gradient-to-r from-cyan-400 to-[#D856BF] group-hover:w-full transition-all duration-300" />
                  </Link>
                </motion.div>
              ))}
            </div>
            
            {/* RIGHT: Auth Actions */}
            <div className="flex items-center gap-6">
              <SignedOut>
                <SignInButton mode="modal">
                  <motion.button 
                    className="text-[13px] font-black tracking-[0.2em] text-gray-400 hover:text-white/80 transition-colors uppercase relative group"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Login
                  </motion.button>
                </SignInButton>
                
                <SignUpButton mode="modal">
                  <Button className="group bg-white rounded-none relative px-6 py-2 overflow-hidden hover:bg-white/80 hover:text-black">                    
                    <span className="relative text-[13px] font-black tracking-widest text-black group-hover: transition-colors duration-300 uppercase flex items-center gap-2">
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

      {/* ========== HERO ========== */}
      <motion.main 
        ref={heroRef}
        className="relative z-10 pt-48 pb-32 container mx-auto px-6 text-center"
        style={{ y: yContent, opacity: opacityContent, scale }}
      >
        {/* Status badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isHeroInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-8 flex justify-center"
        >
        </motion.div>

        {/* Main title */}
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

        {/* Subtitle with animated reveal */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isHeroInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="relative"
        >
          <p className="text-white/70 max-w-2xl mx-auto mb-4 text-md font-medium leading-relaxed">
            Transform any website into production-ready React components with AI-powered precision.
          </p>
        </motion.div>

        {/* CTA Buttons */}
        <motion.div 
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={isHeroInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <SignUpButton mode="modal">
            <Button className="h-14 px-10 bg-white hover:bg-white/50 text-black font-black rounded-none transition-all duration-700 group tracking-widest flex items-center">
              START SCRAPING 
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

        {/* Scroll indicator */}
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
      {/* ========== FEATURE CARDS SECTION ========== */}
      <section id="features" className="relative z-10 container mx-auto px-6 py-32">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-5xl font-black italic tracking-tighter mb-4  uppercase">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-500 px-2">Core</span>{' '}
            <span className="text-cyan-400">Capabilities</span>
          </h2>
          <p className="text-gray-500 text-sm max-w-md mx-auto">
            Enterprise-grade scraping infrastructure with AI-powered component generation
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          {[
            {
              icon: <Zap className="text-cyan-400" />,
              title: "Flash Extraction",
              description: "Scrape nested DOM elements and styles in under 150ms using our optimized headless engine.",
              glowColor: "rgba(3, 179, 195, 0.1)",
              stats: "< 150ms"
            },
            {
              icon: <LayoutTemplate className="text-[#D856BF]" />,
              title: "Semantic Rebuild",
              description: "Our AI identifies buttons, modals, and navbars, automatically converting them to Shadcn UI.",
              glowColor: "rgba(216, 86, 191, 0.1)",
              stats: "99.2% accuracy"
            },
            {
              icon: <Terminal className="text-white" />,
              title: "TypeScript Ready",
              description: "Every component comes with full type safety and organized Tailwind utility classes.",
              glowColor: "rgba(255, 255, 255, 0.05)",
              stats: "100% typed"
            },
          ].map((feature, i) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15 }}
            >
              <FeatureCard 
                icon={feature.icon}
                title={feature.title}
                description={feature.description}
                glowColor={feature.glowColor}
              />
            </motion.div>
          ))}
        </div>

        {/* Additional feature grid */}
        <div className="grid md:grid-cols-2 gap-6 mt-6">
          <motion.div
            className="p-8 border border-white/10 bg-black/50 backdrop-blur-sm hover:border-cyan-500/30 transition-all group"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <div className="flex items-start gap-4">
              <div className="p-3 border border-white/10 group-hover:border-cyan-500/50 transition-colors">
                <Layers className="size-6 text-cyan-400" />
              </div>
              <div>
                <h3 className="text-lg font-black uppercase tracking-wide mb-2">Multi-Framework Export</h3>
                <p className="text-sm text-gray-500 leading-relaxed">
                  Export to React, Vue, Svelte, or vanilla HTML. Each output is optimized for the target framework's best practices.
                </p>
                <div className="flex gap-2 mt-4">
                  {['React', 'Vue', 'Svelte'].map((fw) => (
                    <span key={fw} className="text-[9px] font-mono px-2 py-1 bg-white/5 border border-white/10 text-gray-400">
                      {fw}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            className="p-8 border border-white/10 bg-black/50 backdrop-blur-sm hover:border-[#D856BF]/30 transition-all group"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <div className="flex items-start gap-4">
              <div className="p-3 border border-white/10 group-hover:border-[#D856BF]/50 transition-colors">
                <Cpu className="size-6 text-[#D856BF]" />
              </div>
              <div>
                <h3 className="text-lg font-black uppercase tracking-wide mb-2">AI Component Detection</h3>
                <p className="text-sm text-gray-500 leading-relaxed">
                  Gemini 2.0 Flash identifies UI patterns and suggests optimal component structures with accessibility built-in.
                </p>
                <div className="flex gap-2 mt-4">
                  {['ARIA', 'WCAG 2.1', 'A11y'].map((tag) => (
                    <span key={tag} className="text-[9px] font-mono px-2 py-1 bg-white/5 border border-white/10 text-gray-400">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ========== CODE PREVIEW SECTION ========== */}
      <section id="terminal"className="relative z-10 container mx-auto px-6 pb-32">
        <motion.div
          className="relative rounded-none border border-white/10 bg-black/80 backdrop-blur-3xl overflow-hidden"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          {/* Terminal header */}
          <div className="h-12 border-b border-white/10 flex items-center px-6 justify-between bg-white/[0.03]">
            <div className="flex gap-3">
              <motion.div 
                className="size-3 rounded-full bg-[#D856BF]"
                animate={{ opacity: [1, 0.5, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
              <div className="size-3 rounded-full bg-yellow-500/80" />
              <div className="size-3 rounded-full bg-green-500/80" />
            </div>
            <DecryptedText 
              text="TERMINAL_ENCRYPTION_v4.0" 
              speed={40} 
              className="text-[10px] font-mono text-gray-500 tracking-[0.2em]" 
            />
            <div className="flex items-center gap-2">
              <span className="text-[9px] font-mono text-gray-600">zsh</span>
              <div className="w-[1px] h-3 bg-white/10" />
              <span className="text-[9px] font-mono text-cyan-500">node v20.0</span>
            </div>
          </div>
          
          <div className="grid lg:grid-cols-2 min-h-[500px]">
            {/* Left panel - Info */}
            <div className="p-10 border-r border-white/10 flex flex-col justify-center relative overflow-hidden">
              <motion.div
                className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/10 blur-[100px] rounded-full"
                animate={{ opacity: [0.3, 0.5, 0.3] }}
                transition={{ duration: 4, repeat: Infinity }}
              />
              
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
              >
                <span className="text-[10px] font-mono text-cyan-500 tracking-widest uppercase mb-4 block">
                  Live Preview
                </span>
                <h3 className="text-4xl font-black italic tracking-tighter mb-4 uppercase">
                  Code <span className="text-cyan-400">Stream</span>
                </h3>
                <p className="text-sm text-gray-500 mb-8 font-medium leading-relaxed max-w-md">
                  Watch as our AI deconstructs visual nodes into optimized, production-ready code in real-time.
                </p>
                
                {/* Framework tabs */}
                <div className="flex gap-2 mb-6">
                  {(['react', 'vue', 'svelte'] as const).map((tab) => (
                    <button
                      key={tab}
                      onClick={() => setActiveTab(tab)}
                      className={`px-4 py-2 text-[10px] font-mono uppercase tracking-widest transition-all ${
                        activeTab === tab 
                          ? 'bg-cyan-500 text-black' 
                          : 'bg-white/5 text-gray-400 hover:bg-white/10'
                      }`}
                    >
                      {tab}
                    </button>
                  ))}
                </div>

                <div className="flex items-center gap-4">
                  <motion.div 
                    className="h-[1px] w-20 bg-gradient-to-r from-cyan-500 to-transparent"
                    animate={{ width: ['0%', '100%'] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                  <span className="text-[10px] font-mono text-cyan-500">STREAMING</span>
                </div>
              </motion.div>
            </div>
            
            {/* Right panel - Code */}
            <div className="bg-black/60 p-8 font-mono text-[11px] overflow-hidden relative">
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent z-10 pointer-events-none" />
              <div className="absolute top-4 left-4 flex items-center gap-2 text-gray-600 z-20">
                <Code2 className="size-3" />
                <span className="text-[9px]">component.tsx</span>
              </div>
              <div className="pt-8">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeTab}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.3 }}
                  >
                    <CodeBlock code={codeExamples[activeTab]} />
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* ========== CTA SECTION ========== */}
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

      {/* ========== FOOTER ========== */}
      <footer className="relative z-10 border-t border-white/5 bg-black py-16">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-12 mb-12">
            {/* Brand */}
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
              </div>
            </div>
            
            {/* Links */}
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
          
          {/* Bottom bar */}
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
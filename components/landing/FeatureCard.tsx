"use client"

import { motion } from "framer-motion"
import SpotlightCard from "@/components/ReactBits/SpotlightCard"
import { ChevronRight } from "lucide-react"

interface FeatureCardProps {
  icon: React.ReactNode
  title: string
  description: string
  glowColor?: string // Pass rgba(3, 179, 195, 0.2) or similar
}

export default function EnhancedFeatureCard({ 
  icon, 
  title, 
  description, 
  glowColor = "rgba(3, 179, 195, 0.15)" 
}: FeatureCardProps) {
  return (
    <SpotlightCard 
      className="h-full border-none p-0 bg-transparent"
      //@ts-ignore 
      spotlightColor={glowColor}
    >
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="relative h-full flex flex-col p-8 bg-black/40 border border-white/10 backdrop-blur-md overflow-hidden group transition-all duration-500 hover:border-cyan-500/50 hover:bg-black/60"
      >
        {/* Cyber-Grid Decorative Element (Top Right) */}
        <div className="absolute top-0 right-0 size-16 opacity-10 group-hover:opacity-30 transition-opacity">
          <div className="absolute top-4 right-4 size-2 bg-white" />
          <div className="absolute top-4 right-8 size-[1px] w-8 bg-white" />
          <div className="absolute top-8 right-4 size-[1px] h-8 bg-white" />
        </div>

        {/* Icon Container: Square & High Contrast */}
        <div className="relative z-10 size-14 mb-8 flex items-center justify-center bg-white/[0.03] border border-white/10 group-hover:scale-110 group-hover:border-cyan-400 group-hover:shadow-[0_0_20px_rgba(3,179,195,0.3)] transition-all duration-500">
          <div className="text-2xl">
            {icon}
          </div>
        </div>
        
        {/* Content */}
        <div className="relative z-10 flex-1">
          <h3 className="text-xl font-black italic tracking-tighter uppercase mb-4 bg-clip-text text-transparent bg-gradient-to-r from-white to-white/60 group-hover:to-cyan-400 transition-all">
            {title}
          </h3>
          <p className="text-gray-400 text-sm leading-relaxed font-medium tracking-wide group-hover:text-gray-300 transition-colors">
            {description}
          </p>
        </div>

        {/* Action Indicator: Animated Footer */}
        <div className="relative z-10 mt-8 pt-6 border-t border-white/5 flex items-center justify-between">
          <span className="text-[10px] font-black tracking-[0.2em] text-gray-600 group-hover:text-cyan-400 transition-colors">
            PROTOCOL_0{Math.floor(Math.random() * 9)}
          </span>
          <div className="flex items-center gap-1 text-[10px] font-black tracking-widest text-white opacity-0 group-hover:opacity-100 transform translate-x-2 group-hover:translate-x-0 transition-all duration-300">
            DETAILS <ChevronRight className="size-3 text-[#D856BF]" />
          </div>
        </div>

        {/* Bottom Accent Line */}
        <motion.div 
          className="absolute bottom-0 left-0 h-[2px] bg-gradient-to-r from-cyan-500 to-[#D856BF]" 
          initial={{ width: 0 }}
          whileHover={{ width: "100%" }}
          transition={{ duration: 0.3 }}
        />
      </motion.div>
    </SpotlightCard>
  )
}
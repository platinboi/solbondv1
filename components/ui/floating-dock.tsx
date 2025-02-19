"use client"

import * as React from "react"
import Link from "next/link"
import { useState, useRef, useCallback } from "react"
import { cn } from "@/lib/utils"
import { IconLayoutNavbarCollapse, IconRocket, IconCoin } from "@tabler/icons-react"
import { AnimatePresence, motion, useMotionValue, useTransform, type MotionValue } from "framer-motion"
import { StickyScroll } from "./sticky-scroll-reveal"
import { AnimatedTooltip } from "./animated-tooltip"
import { SparklesCore } from "./sparkles"
import { Tabs } from "./tabs"
import { SolbondOverview } from "./solbond-overview"
import SlidingUp from "@/components/SlidingUp"
import { SolbondRoadmap } from "./solbond-roadmap"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogClose } from "./dialog"
import { ScrollArea } from "@/components/ui/scroll-area"
import { X } from "lucide-react"

import { SolbondStaking } from "./solbond-staking"

const CONTENT_COMPONENTS = {
  solbond: SolbondOverview,
  overview: SolbondOverview,
  community: () => (
    <AnimatedTooltip
      items={[
        { id: 1, name: "Governance", designation: "Vote on Decisions", image: "https://picsum.photos/200" },
        { id: 2, name: "Development", designation: "Contribute Code", image: "https://picsum.photos/201" },
        { id: 3, name: "Advocacy", designation: "Spread the Word", image: "https://picsum.photos/202" }
      ]}
    />
  ),

  staking: () => <SolbondStaking />
};

export const FloatingDock: React.FC<{
  items: { title: string; icon: React.ReactNode; href: string; content: string }[]
  desktopClassName?: string
  mobileClassName?: string
}> = ({ items, desktopClassName, mobileClassName }) => {
  const isMobile = typeof window !== 'undefined' && window.innerWidth <= 768;
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeContent, setActiveContent] = useState<{
    type: string;
    content: React.ReactNode;
  } | null>(null);

  const renderContent = useCallback((title: string, content: string) => {
    const key = title.toLowerCase();
    const Component = CONTENT_COMPONENTS[key as keyof typeof CONTENT_COMPONENTS];
    return Component ? <Component /> : content;
  }, []);

  const handleItemClick = useCallback((title: string, content: string) => {
    setActiveContent({ type: title, content: renderContent(title, content) });
  }, [renderContent]);

  return (
    <>
      <FloatingDockDesktop
        items={items}
        className={desktopClassName}
        onItemClick={handleItemClick}
      />
      <FloatingDockMobile
        items={items}
        className={mobileClassName}
        onItemClick={handleItemClick}
      />
      <SlidingUp
        isOpen={!!activeContent}
        onClose={() => setActiveContent(null)}
        title={activeContent?.type}
      >
        {activeContent?.content}
      </SlidingUp>
    </>
  );
};

const FloatingDockMobile: React.FC<{
  items: { title: string; icon: React.ReactNode; href: string; content: string }[]
  className?: string
  onItemClick: (title: string, content: string) => void
}> = ({ items, className, onItemClick }) => {
  return (
    <div className={cn(
      "fixed bottom-4 left-1/2 transform -translate-x-1/2 z-50",
      "px-4 py-2 rounded-full",
      "bg-black/40 backdrop-blur-[16px] backdrop-saturate-[180%]",
      "ring-1 ring-inset ring-white/[0.15]",
      "hover:ring-white/[0.25]",
      "transition-all duration-300",
      "block md:hidden shadow-lg",
      className
    )}>
      <div className="flex items-center gap-4">
        {items.map((item, index) => (
          <React.Fragment key={index}>
            {item.title.toLowerCase() === 'solbond' ? (
              <div className="relative group" onClick={() => onItemClick(item.title, item.content)}>
                <motion.div
                  className={cn(
                    'relative flex h-10 w-10 items-center justify-center rounded-full',
                    'bg-black/40 backdrop-blur-[16px] backdrop-saturate-[180%]',
                    'ring-1 ring-inset ring-white/[0.15]',
                    'group-hover:bg-black/50',
                    'group-hover:ring-white/[0.25]',
                    'transition-all duration-300'
                  )}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <div className="h-5 w-5 text-white/80 group-hover:text-white transition-colors duration-300">
                    {item.icon}
                  </div>
                </motion.div>
                <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="px-2 py-1 text-sm text-white/90 bg-black/50 backdrop-blur-md rounded-md whitespace-nowrap">
                    {item.title}
                  </div>
                </div>
              </div>
            ) : (
              <div
                className="relative group"
                onClick={() => onItemClick(item.title, item.title.toLowerCase() === 'vision' ? <SolbondRoadmap inDialog /> : item.content)}
              >
                <motion.div
                  className={cn(
                    "relative flex h-10 w-10 items-center justify-center rounded-full",
                    "bg-black/40 backdrop-blur-[16px] backdrop-saturate-[180%]",
                    "ring-1 ring-inset ring-white/[0.15]",
                    "group-hover:bg-black/50",
                    "group-hover:ring-white/[0.25]",
                    "transition-all duration-300"
                  )}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <div className="h-5 w-5 text-white/80 group-hover:text-white">{item.icon}</div>
                </motion.div>
                <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="px-2 py-1 text-sm text-white/90 bg-black/50 backdrop-blur-md rounded-md whitespace-nowrap">
                    {item.title}
                  </div>
                </div>
              </div>
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  )
}

const FloatingDockDesktop: React.FC<{
  items: { title: string; icon: React.ReactNode; href: string; content: string }[]
  className?: string
  onItemClick: (title: string, content: string) => void
}> = ({ items, className, onItemClick }) => {
  const mouseX = useMotionValue<number>(Infinity);

  const variants = {
    container: {
      initial: { opacity: 0, y: 20 },
      animate: { opacity: 1, y: 0 },
      exit: { opacity: 0, y: 20 }
    },
    item: {
      initial: { opacity: 0, scale: 0.8 },
      animate: { opacity: 1, scale: 1 },
      exit: { opacity: 0, scale: 0.8 }
    }
  }

  return (
    <motion.div
      variants={variants.container}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={{ type: "spring", stiffness: 200, damping: 20 }}
      onMouseMove={(e) => mouseX.set(e.pageX)}
      onMouseLeave={() => mouseX.set(Infinity)}
      className={cn(
        'mx-auto hidden md:flex gap-4 items-center justify-center',
        'px-4 py-2 rounded-full',
        'bg-black/40 backdrop-blur-[16px] backdrop-saturate-[180%]',
        'ring-1 ring-inset ring-white/[0.15]',
        'hover:ring-white/[0.25]',
        'transition-all duration-300 shadow-lg',
        className
      )}
    >
      {items.map((item) => (
        <motion.div
          key={item.title}
          variants={variants.item}
          transition={{ type: "spring", stiffness: 200, damping: 20 }}
        >
          <IconContainer mouseX={mouseX} {...item} onItemClick={onItemClick} />
        </motion.div>
      ))}
    </motion.div>
  );
};

const IconContainer: React.FC<{
  mouseX?: MotionValue<number>
  title: string
  icon: React.ReactNode
  href: string
  content: string
  isMobile?: boolean
  onItemClick: (title: string, content: string) => void
}> = ({ mouseX, title, icon, href, content, isMobile = false, onItemClick }) => {
  if (title.toLowerCase() === 'vision') {
    return (
      <div className="relative group cursor-pointer" onClick={() => onItemClick(title, <SolbondRoadmap inDialog />)}>
        <motion.div
          className={cn(
            'relative flex items-center justify-center rounded-full',
            'bg-black/40 backdrop-blur-[16px] backdrop-saturate-[180%]',
            'ring-1 ring-inset ring-white/[0.15]',
            'hover:bg-black/50',
            'hover:ring-white/[0.25]',
            'transition-all duration-300 group',
            'w-10 h-10'
          )}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <motion.div 
            className="text-white/80 group-hover:text-white transition-colors h-5 w-5"
            initial={false}
            animate={{ scale: 1 }}
            whileHover={{ scale: 1.1, rotate: 5 }}
            transition={{ type: 'spring', stiffness: 400, damping: 17 }}
          >
            {icon}
          </motion.div>
        </motion.div>
        <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
          <div className="px-2 py-1 text-sm text-white/90 bg-black/50 backdrop-blur-md rounded-md whitespace-nowrap shadow-lg">
            {title}
          </div>
        </div>
      </div>
    );
  }
  const ref = useRef<HTMLDivElement>(null)

  const distance = useTransform(mouseX || 0, (val: number) => {
    if (!ref.current) return 0
    const bounds = ref.current.getBoundingClientRect()
    return val - bounds.x - bounds.width / 2
  })

  const scale = useTransform(distance, [-120, 0, 120], [0.95, 1, 0.95])
  const brightness = useTransform(distance, [-120, 0, 120], [0.8, 1, 0.8])

  return (
    <div className="relative group cursor-pointer" onClick={() => onItemClick(title, content)}>
      <motion.div
        ref={ref}
        className={cn(
          'relative flex items-center justify-center rounded-full',
          'bg-black/30 backdrop-blur-[16px] backdrop-saturate-[180%]',
          'ring-1 ring-inset ring-white/[0.15]',
          'hover:bg-black/40',
          'hover:ring-white/[0.25]',
          'transition-all duration-300 group',
          'w-10 h-10'
        )}
        style={{
          scale: 1
        }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <motion.div 
          className="text-white/80 group-hover:text-white/90 transition-colors"
          initial={false}
          animate={{ scale: 1 }}
          whileHover={{ scale: 1.1, rotate: 5 }}
          transition={{ type: 'spring', stiffness: 400, damping: 17 }}
        >
          {icon}
        </motion.div>
      </motion.div>
      <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
        <div className="px-2 py-1 text-sm text-white/90 bg-black/50 backdrop-blur-md rounded-md whitespace-nowrap shadow-lg">
          {title}
        </div>
      </div>
    </div>
  )
}

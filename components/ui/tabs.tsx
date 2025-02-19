"use client"

import { motion } from "framer-motion"
import { useState } from "react"
import { cn } from "@/lib/utils"

export const Tabs = ({
  tabs,
  containerClassName,
  activeTabClassName,
  tabClassName,
  contentClassName,
}: {
  tabs: {
    title: string
    value: string
    content?: React.ReactNode
  }[]
  containerClassName?: string
  activeTabClassName?: string
  tabClassName?: string
  contentClassName?: string
}) => {
  const [activeTab, setActiveTab] = useState(tabs[0].value)

  return (
    <div className={cn("flex flex-col", containerClassName)}>
      <div className="flex flex-wrap gap-2 mb-4">
        {tabs.map((tab) => (
          <button
            key={tab.value}
            onClick={() => setActiveTab(tab.value)}
            className={cn(
              "px-4 py-2 rounded-lg text-sm font-medium transition-colors",
              activeTab === tab.value
                ? cn("bg-black text-white", activeTabClassName)
                : cn("text-gray-600 hover:text-gray-900", tabClassName)
            )}
          >
            {tab.title}
          </button>
        ))}
      </div>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className={cn("relative", contentClassName)}
      >
        {tabs.map((tab) => (
          <div
            key={tab.value}
            className={cn(
              "absolute inset-0 transition-opacity",
              activeTab === tab.value ? "opacity-100 z-10" : "opacity-0 z-0"
            )}
          >
            {tab.content}
          </div>
        ))}
      </motion.div>
    </div>
  )
}

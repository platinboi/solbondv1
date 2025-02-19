"use client"

import type React from "react"
import { useEffect, useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogOverlay } from "@/components/ui/dialog"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Button } from "@/components/ui/button"
import { X } from "lucide-react"
import { ProgressCircle } from "@/components/ui/progress-circle"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Chart } from "@/components/ui/chart"
import { motion, AnimatePresence } from "framer-motion"
import { cn } from "@/lib/utils"
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card"
import { IconHelpCircle } from "@tabler/icons-react"
import { Badge } from "@/components/ui/badge"
import { Menubar, MenubarMenu, MenubarTrigger, MenubarContent, MenubarItem } from "@/components/ui/menubar"
import { IconShare, IconTwitter, IconCopy } from "@tabler/icons-react"

interface ChartData {
  type: "bar" | "line"
  data: Array<{ name: string; value: number }>
}

const ProcessedContent: React.FC<{ content: string }> = ({ content }) => {
  const [elements, setElements] = useState<React.ReactNode[]>([])

  useEffect(() => {
    const tempDiv = document.createElement("div")
    tempDiv.innerHTML = content

    const processedElements: React.ReactNode[] = []
    let currentIndex = 0

    const processNode = (node: Node) => {
      if (node.nodeType === Node.ELEMENT_NODE) {
        const element = node as Element
        
        if (element.tagName.toLowerCase() === "progress-circle") {
          const value = Number.parseInt(element.getAttribute("value") || "0", 10)
          const label = element.getAttribute("label") || ""
          processedElements.push(
            <motion.div 
              key={currentIndex++}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: currentIndex * 0.1 }}
              className="progress-circle-container"
            >
              <ProgressCircle value={value} label={label} />
            </motion.div>
          )
          return
        }

        if (element.tagName.toLowerCase() === "card") {
          const title = element.getAttribute("title") || ""
          processedElements.push(
            <motion.div
              key={currentIndex++}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: currentIndex * 0.1 }}
            >
              <Card className="my-4 bg-white/50 backdrop-blur-sm border border-gray-200/50 shadow-sm hover:shadow-md transition-shadow duration-200">
                <CardHeader>
                  <CardTitle className="text-gray-800">{title}</CardTitle>
                </CardHeader>
                <CardContent className="text-gray-600" dangerouslySetInnerHTML={{ __html: element.innerHTML }} />
              </Card>
            </motion.div>
          )
          return
        }

        if (element.tagName.toLowerCase() === "pre" && 
            element.children[0]?.classList.contains("language-chart")) {
          try {
            const chartData: ChartData = JSON.parse(element.textContent || "{}")
            processedElements.push(
              <motion.div
                key={currentIndex++}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: currentIndex * 0.1 }}
                className="chart-container my-6 p-4 bg-white/50 backdrop-blur-sm rounded-xl border border-gray-200/50 shadow-sm"
              >
                <Chart data={chartData.data} type={chartData.type} />
              </motion.div>
            )
            return
          } catch (error) {
            console.error("Error parsing chart data:", error)
          }
        }

        if (element.tagName.toLowerCase() === "security-status") {
          const level = element.getAttribute("level") || "secure";
          processedElements.push(
            <motion.div
              key={currentIndex++}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className={cn(
                "p-4 rounded-lg border-l-4",
                level === "secure" ? "border-green-500 bg-green-50" :
                level === "warning" ? "border-yellow-500 bg-yellow-50" :
                "border-red-500 bg-red-50"
              )}
            >
              {element.innerHTML}
            </motion.div>
          );
          return;
        }

        if (element.classList?.contains('context-help')) {
          const tooltipContent = element.dataset.tooltip || '';
          processedElements.push(
            <HoverCard>
              <HoverCardTrigger className="inline-flex items-center gap-1 text-blue-600 cursor-help">
                {element.textContent}
                <IconHelpCircle className="h-4 w-4" />
              </HoverCardTrigger>
              <HoverCardContent className="text-sm p-3">
                {tooltipContent}
              </HoverCardContent>
            </HoverCard>
          );
          return;
        }

        if (element.tagName.toLowerCase() === "status-indicator") {
          const status = element.getAttribute("status") || "neutral";
          processedElements.push(
            <motion.div
              key={currentIndex++}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className={cn(
                "p-4 rounded-lg border-l-4",
                status === 'active' ? "border-green-500 bg-green-50" :
                "border-gray-200 bg-gray-50"
              )}
            >
              <Badge 
                variant={status === 'active' ? 'default' : 'secondary'}
                className="flex items-center gap-2"
              >
                <span className={`w-2 h-2 rounded-full ${statusColors[status]}`} />
                {element.textContent}
              </Badge>
            </motion.div>
          );
          return;
        }

        // For other elements, keep them as HTML with animations
        processedElements.push(
          <motion.div 
            key={currentIndex++}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: currentIndex * 0.05 }}
            dangerouslySetInnerHTML={{ __html: element.outerHTML }}
            className="my-2"
          />
        )
        return
      }

      if (node.nodeType === Node.TEXT_NODE && node.textContent?.trim()) {
        processedElements.push(
          <motion.div 
            key={currentIndex++}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: currentIndex * 0.05 }}
            className="text-gray-600"
          >
            {node.textContent}
          </motion.div>
        )
      }
    }

    Array.from(tempDiv.childNodes).forEach(processNode)
    setElements(processedElements)
  }, [content])

  return <>{elements}</>
}

export const PopupContent: React.FC<{ 
  title: string
  content: string
  onClose: () => void 
}> = ({ title, content, onClose }) => {
  return (
    <Dialog modal open={true}>
      <DialogOverlay 
        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100]" 
        onClick={onClose}
      />
      <DialogContent 
        onPointerDownOutside={(e) => e.preventDefault()}
        onInteractOutside={(e) => e.preventDefault()}
        className="!fixed !left-[50%] !top-[50%] !translate-x-[-50%] !translate-y-[-50%] !w-full !p-0 !m-0 !border-none !shadow-none !bg-transparent z-[101] max-w-3xl"
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ 
            type: "spring", 
            damping: 25, 
            stiffness: 350,
            duration: 0.2 
          }}
          className={cn(
            "relative w-[95%] mx-auto",
            "h-[85vh]",
            "bg-white/95",
            "backdrop-blur-md",
            "rounded-2xl",
            "shadow-2xl",
            "border border-gray-200/50",
            "flex flex-col"
          )}
        >
          <DialogHeader className="flex-none px-6 py-4 border-b border-gray-200/50 bg-white/90 backdrop-blur-sm">
            <div className="flex items-center justify-between">
              <div className="flex flex-col space-y-1">
                <DialogTitle className="text-xl sm:text-2xl font-bold text-gray-800">
                  <motion.span
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 }}
                  >
                    {title}
                  </motion.span>
                </DialogTitle>
                <div className="flex space-x-2">
                  <Button variant="ghost" size="sm" className="text-gray-500 hover:bg-gray-100/80">
                    Overview
                  </Button>
                  <Button variant="ghost" size="sm" className="text-gray-500 hover:bg-gray-100/80">
                    Analytics
                  </Button>
                  <Button variant="ghost" size="sm" className="text-gray-500 hover:bg-gray-100/80">
                    Actions
                  </Button>
                </div>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={onClose}
                className="rounded-full hover:bg-gray-100/80 transition-colors duration-200"
              >
                <X className="h-5 w-5 sm:h-6 sm:w-6 text-gray-500" />
                <span className="sr-only">Close</span>
              </Button>
            </div>
          </DialogHeader>
          
          <ScrollArea className="flex-1 overflow-y-auto">
            <div className={cn(
              "px-6 py-4",
              "prose prose-sm sm:prose-base md:prose-lg max-w-none",
              "relative after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-full after:h-8 after:bg-gradient-to-t after:from-white/95 after:to-transparent",
              "prose-headings:font-semibold prose-headings:border-b prose-headings:pb-2 prose-headings:mb-4",
              "prose-ul:list-none prose-ul:pl-0 prose-ul:space-y-2",
              "prose-li:bg-gray-50 prose-li:px-3 prose-li:py-2 prose-li:rounded-lg"
            )}>
              <ProcessedContent content={content} />
            </div>
          </ScrollArea>

          <Menubar className="mt-4 border-none bg-transparent">
            <MenubarMenu>
              <MenubarTrigger className="data-[state=open]:bg-gray-100/80">
                <IconShare className="mr-2 h-4 w-4" />
                Share
              </MenubarTrigger>
              <MenubarContent>
                <MenubarItem>
                  <IconTwitter className="mr-2 h-4 w-4" />
                  Twitter
                </MenubarItem>
                <MenubarItem>
                  <IconCopy className="mr-2 h-4 w-4" />
                  Copy Link
                </MenubarItem>
              </MenubarContent>
            </MenubarMenu>
          </Menubar>
        </motion.div>
      </DialogContent>
    </Dialog>
  )
}


"use client"

import type React from "react"
import { useEffect, useRef } from "react"
import mermaid from "mermaid"

mermaid.initialize({
  startOnLoad: false,
  theme: "dark",
  securityLevel: "loose",
})

interface MermaidProps {
  chart: string
}

const Mermaid: React.FC<MermaidProps> = ({ chart }) => {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const renderChart = async () => {
      if (ref.current) {
        ref.current.innerHTML = ""
        const { svg } = await mermaid.render("mermaid-svg", chart)
        ref.current.innerHTML = svg
      }
    }

    renderChart()
  }, [chart])

  return <div ref={ref} className="mermaid-diagram" />
}

export default Mermaid


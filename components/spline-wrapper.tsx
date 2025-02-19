"use client"

import { useState, useEffect, Suspense } from "react"
import dynamic from "next/dynamic"
import type { SplineProps } from '@splinetool/react-spline'

const Spline = dynamic<SplineProps>(() => import('@splinetool/react-spline').then(mod => mod.default), {
  ssr: false,
  loading: () => <LoadingIndicator />
})

function LoadingIndicator() {
  return (
    <div className="flex items-center justify-center w-full h-full bg-gray-100">
      <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-900"></div>
    </div>
  )
}

export default function SplineWrapper() {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Simulate a minimum loading time to prevent flickering
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 1000)

    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="absolute -inset-2 z-0 transform translate-y-[-5%] md:translate-y-[-2%] scale-[1.02]">
      <Suspense fallback={<LoadingIndicator />}>
        {!isLoading && (
          <Spline
            scene="https://prod.spline.design/ffP4kwM5NtrD9Zey/scene.splinecode"
            onLoad={() => setIsLoading(false)}
          />
        )}
      </Suspense>
    </div>
  )
} 
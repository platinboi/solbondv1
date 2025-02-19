import type React from "react"

interface ProgressCircleProps {
  value: number
  label: string
}

export const ProgressCircle: React.FC<ProgressCircleProps> = ({ value, label }) => {
  const circumference = 2 * Math.PI * 45
  const strokeDashoffset = circumference - (value / 100) * circumference

  return (
    <div className="relative inline-flex items-center justify-center">
      <svg className="w-32 h-32 transform -rotate-90">
        <circle
          className="text-gray-200"
          strokeWidth="5"
          stroke="currentColor"
          fill="transparent"
          r="45"
          cx="60"
          cy="60"
        />
        <circle
          className="text-blue-500 transition-all duration-1000 ease-in-out"
          strokeWidth="5"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          stroke="currentColor"
          fill="transparent"
          r="45"
          cx="60"
          cy="60"
        />
      </svg>
      <div className="absolute flex flex-col items-center justify-center">
        <span className="text-2xl font-bold text-gray-700">{value}%</span>
        <span className="text-sm font-medium text-gray-500">{label}</span>
      </div>
    </div>
  )
}


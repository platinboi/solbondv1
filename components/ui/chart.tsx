"use client"

import type React from "react"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from "recharts"

interface ChartProps {
  data: Array<{ name: string; value: number }>
  type: "bar" | "line"
}

export const Chart: React.FC<ChartProps> = ({ data, type }) => {
  const ChartComponent = type === "bar" ? BarChart : LineChart
  const DataComponent = type === "bar" ? Bar : Line

  return (
    <div className="w-full h-[300px] bg-white/50 backdrop-blur-sm rounded-lg p-4 shadow-sm">
      <ResponsiveContainer width="100%" height="100%">
        <ChartComponent data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
          <XAxis dataKey="name" stroke="#6B7280" />
          <YAxis stroke="#6B7280" />
          <Tooltip
            contentStyle={{
              backgroundColor: "rgba(255, 255, 255, 0.8)",
              borderRadius: "0.375rem",
              boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
              backdropFilter: "blur(4px)",
            }}
            itemStyle={{ color: "#374151" }}
            cursor={{ fill: "rgba(107, 114, 128, 0.1)" }}
          />
          <DataComponent type="monotone" dataKey="value" stroke="#3B82F6" fill="rgba(59, 130, 246, 0.5)" />
        </ChartComponent>
      </ResponsiveContainer>
    </div>
  )
}


'use client'

import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts'
import { MOCK_STOCK_CHART_DATA } from '@/lib/mock-data'

interface StockChartProps {
  ticker: string
  data?: { date: string; price: number }[]
  height?: number
}

export function StockChart({ ticker, data = MOCK_STOCK_CHART_DATA, height = 200 }: StockChartProps) {
  const first = data[0]?.price ?? 0
  const last = data[data.length - 1]?.price ?? 0
  const isPositive = last >= first
  const color = isPositive ? '#10b981' : '#ef4444'

  return (
    <div>
      <ResponsiveContainer width="100%" height={height}>
        <AreaChart data={data} margin={{ top: 4, right: 0, left: 0, bottom: 0 }}>
          <defs>
            <linearGradient id={`gradient-${ticker}`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor={color} stopOpacity={0.2} />
              <stop offset="95%" stopColor={color} stopOpacity={0} />
            </linearGradient>
          </defs>
          <XAxis
            dataKey="date"
            tick={{ fill: '#64748b', fontSize: 11 }}
            tickLine={false}
            axisLine={false}
            interval={14}
          />
          <YAxis
            tick={{ fill: '#64748b', fontSize: 11 }}
            tickLine={false}
            axisLine={false}
            tickFormatter={(v) => `$${v}`}
            domain={['auto', 'auto']}
            width={55}
          />
          <Tooltip
            contentStyle={{ background: '#1e293b', border: '1px solid #334155', borderRadius: 8, color: '#f8fafc' }}
            labelStyle={{ color: '#94a3b8', fontSize: 12 }}
            formatter={(value: number | undefined) => [`$${(value ?? 0).toFixed(2)}`, ticker]}
          />
          <Area
            type="monotone"
            dataKey="price"
            stroke={color}
            strokeWidth={2}
            fill={`url(#gradient-${ticker})`}
            dot={false}
            activeDot={{ r: 4, fill: color }}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  )
}

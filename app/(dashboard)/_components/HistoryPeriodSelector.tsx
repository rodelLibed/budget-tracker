"use client"

import { Period, Timeframe } from "@/lib/types"

interface Props {
  period: Period
  setPeriod: (period:Period) => void
  timeframe: Timeframe
  setTimeFrame: (timeframe:Timeframe) => void
}

const HistoryPeriodSelector = ({ period, setPeriod, timeframe, setTimeFrame}:Props) => {
  return (
    <div>
      
    </div>
  )
}

export default HistoryPeriodSelector

"use client"
import { Badge } from "@/components/ui/badge"
import { Card, CardHeader, CardTitle } from "@/components/ui/card"
import { GetFormatterForCurrency } from "@/lib/helper"
import { Period, Timeframe } from "@/lib/types"
import { UserSettings } from "@prisma/client"
import { useMemo, useState } from "react"
import HistoryPeriodSelector from "./HistoryPeriodSelector"



const History = ({userSettings}: {userSettings:UserSettings}) => {
     const [timeframe, setTimeFrame] = useState<Timeframe>("month")
     const [period, setPeriod] = useState<Period>({
        month: new Date().getMonth(),
        year: new Date().getFullYear()
     })

     const formatter = useMemo(()=> {
        return GetFormatterForCurrency(userSettings.currency)
     }, [userSettings.currency])

  return (
    <div>
      <h1 className="mt-12 text-3xl font-bold">History</h1>
      <Card className="col-span-2 mt-2 w-full">
         <CardHeader >
            <CardTitle className="grid grid-flow-row justify-between gap-2 md:grid-flow-col">
              <HistoryPeriodSelector period={period} setPeriod={setPeriod}
                    timeframe={timeframe} setTimeFrame={setTimeFrame}
                /> 
                 <div className="flex gap-2 h-10">
                    <Badge variant={"outline"} className="flex items-center gap-2 text-sm">
                        <div className="h-4 w-4 rounded-full bg-emerald-500"></div>
                        Income
                    </Badge>
                    <Badge variant={"outline"} className="flex items-center gap-2 text-sm">
                        <div className="h-4 w-4 rounded-full bg-red-500"></div>
                        Income
                    </Badge>
                 </div>
            </CardTitle>
         </CardHeader>
      </Card>
    </div>
  )
}

export default History



"use client"
import { GetBalanceStatsResponseType } from '@/app/api/stats/balance/route'
import SkeletonWrapper from '@/components/SkeletonWrapper'
import { Card } from '@/components/ui/card'
import { DatetoUTCDate, GetFormatterForCurrency } from '@/lib/helper'
import { UserSettings } from '@prisma/client'
import { useQuery } from '@tanstack/react-query'
import { TrendingDown, TrendingUp, Wallet } from 'lucide-react'
import  { useCallback, useMemo } from 'react'
import CountUp from "react-countup"

interface Props {
    from: Date,
    to: Date,
    userSettings: UserSettings
}
const StatsCards = ({from, to, userSettings}:Props) => {

    const statsQuery = useQuery<GetBalanceStatsResponseType>({
        queryKey: ["overview", "stats", from, to],
        queryFn: () => fetch(`/api/stats/balance?from=${DatetoUTCDate(from)}&to=${DatetoUTCDate(to)}`).
                 then((res) => res.json())
     })
   

    const formatter = useMemo(()=>{
        return GetFormatterForCurrency(userSettings.currency)
    }, [userSettings.currency])

    const income = statsQuery.data?.income || 0
    const expense = statsQuery.data?.expense || 0
    const balance = income - expense

  return (
    <div className='w-full flex flex-wrap md:flex-nowrap gap-2'>  
       <SkeletonWrapper isLoading={statsQuery.isFetching} >
           <StatCard 
              formatter={formatter} 
              value={income}
              title="Income"
              icon={
                <TrendingUp className='h-12 w-12 text-emerald-500 bg-emerald-400/10' />
              }
            />
       </SkeletonWrapper>

       <SkeletonWrapper isLoading={statsQuery.isFetching} >
           <StatCard 
              formatter={formatter} 
              value={expense}
              title="Expense"
              icon={
                <TrendingDown className='h-12 w-12 text-red-500 bg-red-400/10' />
              }
            />
       </SkeletonWrapper>

       <SkeletonWrapper isLoading={statsQuery.isFetching} >
           <StatCard 
              formatter={formatter} 
              value={balance}
              title="Balance"
              icon={
                <Wallet className='h-12 w-12 text-violet-500 bg-violet-400/10' />
              }
            />
       </SkeletonWrapper>
    </div>
  )
}

export default StatsCards


function StatCard({formatter, value, title, icon}:{
    formatter: Intl.NumberFormat
    value: number
    title: string
    icon: React.ReactNode
}){
    const formatFn = useCallback((value:number) => {
        return formatter.format(value)
    }, [formatter])

     return (
        <Card className='flex h-24 w-full items-center gap-2 p-4'>
           {icon}
           <div className='flex flex-col items-start gap-0'>
              <p className="text-muted-foreground">{title}</p>
              <CountUp
                 preserveValue
                 redraw={false}
                 end={value}
                 decimals={2}
                 formattingFn={formatFn}
                 className='text-2xl'
              />
           </div>
        </Card>
     )
}
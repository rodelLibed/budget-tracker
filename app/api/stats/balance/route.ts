import prisma from "@/lib/prisma";
import { OverviewSchemaType } from "@/schema/overview";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export async function GET(request:Request){
  const user = await currentUser()

  if(!user){
    redirect("/sign-in")
  }

  const { searchParams } = new URL(request.url)
  const from = searchParams.get("from")
  const to = searchParams.get("to")

  const queryParam = OverviewSchemaType.safeParse({ from, to })

  if(!queryParam.success){
     return Response.json(queryParam.error.message, {
         status: 400
     })
  }

  const stats = getBalanceStats(
     user.id,
     queryParam.data.from,
     queryParam.data.to
  )

    return Response.json(stats)
}

export type GetBalanceStatsResponseType = Awaited<
  ReturnType<typeof getBalanceStats>
>

async function getBalanceStats(userId:string, from: Date, to: Date){
   const totals = await prisma.transaction.groupBy({
      by: ["type"],
      where: {
        userId,
        date: {
            gte: from,
            lte: to
        }
      },
      _sum: {
        amount: true
      }
   });

   return {
      expense: totals.find((t) => t.type === "expense")?._sum.amount || 0,
      income: totals.find((t) => t.type === "income")?._sum.amount || 0
   }
}
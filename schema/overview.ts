import { MAX_DAYS_RANGE_DAYS } from "@/lib/constants";
import { differenceInDays } from "date-fns";
import { z } from "zod";

export const OverviewSchemaType = z.object({
      from: z.coerce.date(),
      to: z.coerce.date()
}).refine((args)=>{
    const { from, to } = args
    const days = differenceInDays(to, from)
    const isValidRange = days >= 0 && days <= MAX_DAYS_RANGE_DAYS
    
    return isValidRange
})
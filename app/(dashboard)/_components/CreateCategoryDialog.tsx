"use client"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Form, FormItem, FormField, FormLabel, FormControl, FormDescription } from "@/components/ui/form"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { TransactionType } from "@/lib/types"
import { cn } from "@/lib/utils"
import { CreateCategorySchema, CreateCategorySchemaType } from "@/schema/category"
import { zodResolver } from "@hookform/resolvers/zod"
import { PlusSquareIcon } from "lucide-react"
import { useState } from "react"
import { useForm } from "react-hook-form"

interface Props {
    type: TransactionType
}

const CategoryDialog = ({type}:Props) => {
     const [open, setOpen] = useState(false)
     const form = useForm<CreateCategorySchemaType>({
        resolver: zodResolver(CreateCategorySchema),
        defaultValues: {
        type: "income"
             
        }
     })
  return (
    <Dialog open={open} onOpenChange={setOpen}>
       <DialogTrigger asChild>
          <Button variant={"ghost"} 
             className="flex 
               items-center justify-start
               border-separate rounded-none border-b 
                px-3 py-3
               ">
                 <PlusSquareIcon className="mr-2 h-4 w-4" />
                 Create New
             </Button>
       </DialogTrigger>
       <DialogContent>
           <DialogHeader>
               <DialogTitle>
                  Create <span className={cn(
                    "m-1",
                    type === "income" ? "text-emerald-500" : "text-red-500"
                  )}>{type}</span> category
               </DialogTitle>
               <DialogDescription>
                   Categories are used to group your transactions
               </DialogDescription>
           </DialogHeader>
           <Form {...form} >
           <form action="" className='space-y-4'>
              <FormField 
                control={form.control}
                name="name"
                render={({ field }) => (
                    <FormItem>
                       <FormLabel>Name</FormLabel>
                       <FormControl>
                         <Input defaultValue={""}  {...field} />
                       </FormControl>
                       <FormDescription>
                         Transaction Description (optional)
                       </FormDescription>
                    </FormItem>
                )}
              />
              </form>
        </Form>
       </DialogContent>
    </Dialog>
  )
}

export default CategoryDialog

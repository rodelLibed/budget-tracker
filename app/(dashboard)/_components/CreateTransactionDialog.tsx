"use client"
import React from 'react'
import { TransactionType } from '@/lib/types'
import { cn } from '@/lib/utils'
import { useForm } from 'react-hook-form'
import { CreateTransactionSchema, CreateTransactionSchemaType } from '@/schema/transaction'
import { zodResolver } from "@hookform/resolvers/zod"
import { Dialog, DialogHeader, DialogTitle, DialogTrigger, DialogContent } from '@/components/ui/dialog'
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import CategoryPicker from './CategoryPicker'




interface Props  {
    trigger: React.ReactNode
    type: TransactionType
}
const TransactionDialog = ({trigger, type}:Props) => {
   const form = useForm<CreateTransactionSchemaType>({
     resolver: zodResolver(CreateTransactionSchema),
      defaultValues: {
         type: "expense",
         date: new Date()
         
      }

   })
  return (
    <Dialog>
    <DialogTrigger asChild>{trigger}</DialogTrigger>
    <DialogContent>
        <DialogHeader>
        <DialogTitle>
        Create a new 
            <span className={cn("m-1", type === "income" ? "text-emerald-500" : "text-red-500")}>
               {type}
            </span>
            transaction
        </DialogTitle>
       
        </DialogHeader>
        <Form {...form} >
           <form action="" className='space-y-4'>
              <FormField 
                control={form.control}
                name='description'
                render={({ field }) => (
                    <FormItem>
                       <FormLabel>Description</FormLabel>
                       <FormControl>
                         <Input defaultValue={""}  {...field} />
                       </FormControl>
                       <FormDescription>
                         Transaction Description (optional)
                       </FormDescription>
                    </FormItem>
                )}
              />

              <FormField 
                control={form.control}
                name='amount'
                render={({ field }) => (
                    <FormItem>
                       <FormLabel>Amount</FormLabel>
                       <FormControl>
                         <Input defaultValue={0} type='number'  {...field} />
                       </FormControl>
                       <FormDescription>
                         Transaction Amount (required)
                       </FormDescription>
                    </FormItem>
                )}
              />

              <div className='flex items-center justify-between gap-2'>
                <FormField 
                  control={form.control}
                  name='category'
                  render={({ field }) => (
                      <FormItem>
                        <FormLabel>Category</FormLabel>
                        <FormControl>
                          <CategoryPicker type={type} />
                        </FormControl>
                        <FormDescription>
                           Select a category for this transaction
                        </FormDescription>
                      </FormItem>
                  )}
                />
              </div>
           </form>
        </Form>  
    </DialogContent>
    </Dialog>

  )
}

export default TransactionDialog




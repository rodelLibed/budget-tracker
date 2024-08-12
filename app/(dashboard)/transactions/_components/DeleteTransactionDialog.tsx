"use client"

import { useMutation, useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner"
import { AlertDialog, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger, AlertDialogCancel, AlertDialogAction } from "@/components/ui/alert-dialog"
import React from 'react'
import { DeleteTransaction } from "../_actions/deleteTransaction"
interface Props {
    open: boolean
    setOpen: (open:boolean) => void
    transactionId: string
}

const DeleteTransactionDialog = ({open, setOpen, transactionId}:Props) => {
   
    const queryClient = useQueryClient()
    const deleteMutation = useMutation({
      mutationFn: DeleteTransaction,
      onSuccess: async () => {
         toast.success("Transaction Deleted Successfully", {
          id: transactionId,
         })
         await queryClient.invalidateQueries({
          queryKey: ["transactions"]
         })
      },
      onError: () => {
         toast.error("Something went wrong", {
           id: transactionId,
         })
      }
    })

    return (
     <AlertDialog open={open} onOpenChange={setOpen}>
       <AlertDialogContent>
         <AlertDialogHeader>
           <AlertDialogTitle>Are you absolutety sure</AlertDialogTitle>
           <AlertDialogDescription>This action cannot be undone. This permanently delete your transaction</AlertDialogDescription>
         </AlertDialogHeader>
         <AlertDialogFooter>
           <AlertDialogCancel>Cancel</AlertDialogCancel>
           <AlertDialogAction onClick={() => {
             toast.loading("Deleting transction...", {
               id: transactionId
             })
             deleteMutation.mutate(transactionId)
           }}>Continue</AlertDialogAction>
         </AlertDialogFooter>
       </AlertDialogContent>
     </AlertDialog>
    )
}

export default DeleteTransactionDialog

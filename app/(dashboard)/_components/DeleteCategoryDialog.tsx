"use client"

import { Category } from "@prisma/client"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { DeleteCategory } from "../_actions/categories"
import { toast } from "sonner"
import { AlertDialog, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger, AlertDialogCancel, AlertDialogAction } from "@/components/ui/alert-dialog"
import { TransactionType } from "@/lib/types"

interface Props  {
  trigger: React.ReactNode
  category: Category
}

const DeleteCategoryDialog = ({category, trigger}:Props) => {
  const categoryIdentifier = `${category.name}-${category.type}`
  const queryClient = useQueryClient()
  const deleteMutation = useMutation({
    mutationFn: DeleteCategory,
    onSuccess: async () => {
       toast.success("Category Deleted Successfully", {
        id: categoryIdentifier,
       })
       await queryClient.invalidateQueries({
        queryKey: ["categories"]
       })
    },
    onError: () => {
       toast.error("Something went wrong", {
         id: categoryIdentifier,
       })
    }
  })
  return (
   <AlertDialog>
     <AlertDialogTrigger asChild>{trigger}</AlertDialogTrigger>
     <AlertDialogContent>
       <AlertDialogHeader>
         <AlertDialogTitle>Are you absolutety sure</AlertDialogTitle>
         <AlertDialogDescription>This action cannot be undone. This permanently delet your category</AlertDialogDescription>
       </AlertDialogHeader>
       <AlertDialogFooter>
         <AlertDialogCancel>Cancel</AlertDialogCancel>
         <AlertDialogAction onClick={() => {
           toast.loading("Deleting category...", {
             id: categoryIdentifier
           })
           deleteMutation.mutate({
             name: category.name,
             type: category.type as TransactionType
           })
         }}>Continue</AlertDialogAction>
       </AlertDialogFooter>
     </AlertDialogContent>
   </AlertDialog>
  )
}

export default DeleteCategoryDialog

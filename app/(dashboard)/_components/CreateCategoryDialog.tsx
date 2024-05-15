"use client"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Form, FormItem, FormField, FormLabel, FormControl, FormDescription } from "@/components/ui/form"
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { TransactionType } from "@/lib/types"
import { cn } from "@/lib/utils"
import { CreateCategorySchema, CreateCategorySchemaType } from "@/schema/category"
import { zodResolver } from "@hookform/resolvers/zod"
import { CircleOff, Loader2, PlusSquareIcon } from "lucide-react"
import { useCallback, useState } from "react"
import { useForm } from "react-hook-form"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import Picker from "@emoji-mart/react"
import data from "@emoji-mart/data"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { CreateCategory } from "../_actions/categories"
import { Category } from "@prisma/client"
import { toast } from "sonner"
import { useTheme } from "next-themes"

interface Props {
    type: TransactionType
    onSuccessCallback: (category:Category) => void
}

const CreateCategoryDialog = ({type, onSuccessCallback}:Props) => {
     const [open, setOpen] = useState(false)

     const theme = useTheme()
    
     const form = useForm<CreateCategorySchemaType>({
        resolver: zodResolver(CreateCategorySchema),
        defaultValues: {
          type,
        }
     })

     const queryClient = useQueryClient()

     const { mutate, isPending } = useMutation({
        mutationFn: CreateCategory,
        onSuccess: async (data:Category) => {
            form.reset({
                name: "",
                icon: "",
            })
            toast.success(`Category ${data.name} created Successfully 🥳`,{
               id: "create-category",
            }) 

            onSuccessCallback(data)

           await queryClient.invalidateQueries({
               queryKey: ["categories"]
            }),
            setOpen(false)
         },
        onError: () =>{
           toast.error("Something went wrong", {
             id: "create-category"
           })
        }
     })

    
     const onSubmit = useCallback((values:CreateCategorySchemaType) => {
        toast.loading("Create category...", {
           id:  "create-category"
        })
        mutate(values)
      }, [mutate])

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
           <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
              <FormField 
                control={form.control}
                name="name"
                render={({ field }) => (
                    <FormItem>
                       <FormLabel>Name</FormLabel>
                       <FormControl>
                         <Input placeholder="Category"  {...field} />
                       </FormControl>
                       <FormDescription>
                         This is how your category will appear in the app
                       </FormDescription>
                    </FormItem>
                )}
              />
              <FormField 
                control={form.control}
                name="icon"
                render={({ field }) => (
                    <FormItem>
                       <FormLabel>Icon</FormLabel>
                       <FormControl>
                        <Popover>
                           <PopoverTrigger asChild>
                               <Button variant={"outline"} className="h-[100px] w-full">
                                   {form.watch("icon") ? (
                                       <div className="flex flex-col items-center gap-2">
                                            <span className="text-5xl" role="img">
                                                {field.value}
                                            </span>
                                          <p className="text-xs text-foreground">
                                              Click to change
                                          </p>
                                       </div>
                                   ) : <div className="flex flex-col items-center gap-2">
                                          <CircleOff className="h-[48px] w-[48px]" />
                                          <p className="text-xs text-foreground">
                                             Click to select
                                          </p>
                                      </div> 
                                    }
                               </Button>
                           </PopoverTrigger>
                           <PopoverContent className="w-full h-full relative flex justify-center " >
                             <div className="absolute bottom-3">
                                <Picker  theme={theme.resolvedTheme} data={data} onEmojiSelect={(emoji:{ native:string })=> {
                                        field.onChange(emoji.native)
                                    }} />
                              </div>  
                           </PopoverContent>
                        </Popover>
                       </FormControl>
                       <FormDescription>
                          This is how your category will appear 
                          in the app
                       </FormDescription>
                    </FormItem>
                )}
              />
              </form>
        </Form>
          <DialogFooter>
            <DialogClose>
                <Button type="button" variant={"secondary"} onClick={()=>{
                  form.reset()
                }}>
                  Cancel
                </Button>
                <Button onClick={form.handleSubmit(onSubmit)} disabled={isPending}>
                  {!isPending && "Create"}
                  {isPending && <Loader2 className="animate-spin" />}
                </Button>
            </DialogClose>
        </DialogFooter>
       </DialogContent>
    </Dialog>
  )
}

export default CreateCategoryDialog

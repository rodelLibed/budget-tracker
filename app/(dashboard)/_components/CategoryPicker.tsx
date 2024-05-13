"use client"

import { Button } from "@/components/ui/button"
import { Command, CommandInput } from "@/components/ui/command"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { TransactionType } from "@/lib/types"
import { Category } from "@prisma/client"
import { useQuery } from "@tanstack/react-query"
import { useState } from "react"
import CategoryDialog from "./CreateCategoryDialog"

interface Props {
    type: TransactionType
}
const CategoryPicker = ({ type } : Props) => {
    const [open, setOpen] = useState(false)
    const [value, setValue] = useState("")

    const categoriesQuery = useQuery({
        queryKey: ["categories", type],
        queryFn: () => fetch(`/api/categories?type=${type}`).then((response) => response.json())

    })

    const selectedCategory = categoriesQuery.data?.find((category : Category) => {
         return category.name === value
    })
  return (
    <Popover open={open} onOpenChange={setOpen}>
       <PopoverTrigger asChild>
          <Button variant={"outline"} role={"combobox"}
           aria-expanded={open}
           className=" flex justify-between"
           >
            {selectedCategory ? <CategoryRow category={selectedCategory} /> : "Select Category"}
           </Button>
       </PopoverTrigger>
       <PopoverContent className="w-[200px] p-0">
          <Command onSubmit={e =>{
             e.preventDefault()
          }} >
              <CommandInput placeholder="Search category" />
              <CategoryDialog type={type} />

          </Command>
       </PopoverContent>
    </Popover>
  )
}

export default CategoryPicker

function CategoryRow ({category}:{category: Category}){
     return (
        <div className="flex items-center gap-2">
           <span role="img">{category.icon}</span>
           <span>{category.name}</span>
        </div>
     )
}

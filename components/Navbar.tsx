"use client"
import { useState } from 'react'
import Logo from './Logo'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import { Button, buttonVariants } from './ui/button'
import { UserButton } from '@clerk/nextjs'
import { ThemeSwitchBtn } from './ThemeSwitchBtn'
import { Sheet, SheetTrigger } from './ui/sheet'
import { Menu, MenuIcon } from 'lucide-react'

const Navbar = () => {
  return (
    <>
       <NavbarDesktop />
       <MobileNavbar />
    </>
  )
}

const NavbarDesktop = () => {
    
  return (
     <div className='hidden border-separate border-b bg-background md:block'>
        <nav className='container flex items-center justify-center px-0'>
          <div className='flex items-center gap-x-4 h-[80px] min-h-[60px] '>
             <Logo />
             <div className='flex h-full'>
                  {items.map((item)=> {
                    const pathname = usePathname()
                    const isActive = pathname === item.link
                     return (
                        <div key={item.label} className='relative flex items-center'>
                           <Link className={cn(
                                buttonVariants({ variant: "ghost" }),
                                "w-full text-lg text-muted-foreground hover:text-foreground",
                                isActive && "text-foreground"
                            )} href={item.link}>
                                {item.label}
                            </Link> 
                            {isActive && 
                              <div className='absolute -bottom-[2px] left-1/2
                                hidden h-[1px] w-[80%] -translate-x-1/2 rounded-xl md:block bg-foreground'>

                              </div>
                            }
                        </div>
                     )
                  })}
             </div>
             <div className='flex items-center gap-2'>
              <ThemeSwitchBtn />
              <UserButton afterSignOutUrl='/sign-in' />
             </div>
          </div>
          
        </nav>
     </div>
  )
}

const MobileNavbar = () => {
      const [isOpen, setIsOpen] = useState(false)
    return (
        <div className='block border-separate bg-background md:hidden'>
           <nav className='container flex items-center justify-between px-8'>
              <Sheet open={isOpen} onOpenChange={setIsOpen}>
                  <SheetTrigger asChild>
                      <Button variant={"ghost"} size={"icon"}>
                         <Menu />
                      </Button>
                  </SheetTrigger>
              </Sheet>
           </nav>
        </div>
    )
}

const items = [
    { label: "Dashboard", link: "/" },
    { label: "Transactions", link: "/transactions" },
    { label: "Manage", link: "/manage" }
]

export default Navbar

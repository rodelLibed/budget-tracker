import Logo from '@/components/Logo'
import React from 'react'

const Layout = ({children}:{children:React.ReactNode}) => {
  return (
    <div className='relative flex h-screen w-full flex-col justify-center items-center'>
      <Logo />
     <div className='mt-9'>
       {children}
     </div>
    </div>
  )
}

export default Layout

import Navbar from '@/components/Navbar'
import React from 'react'

const DashboardLayout = ({children}:{children:React.ReactNode}) => {
  return (
    <div className='relative w-full h-screen flex flex-col'>
      <Navbar />
       <div className='w-full'>{children}</div>
    </div>
  )
}

export default DashboardLayout

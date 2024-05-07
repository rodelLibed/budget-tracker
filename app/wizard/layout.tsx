import React from 'react'

const WizardLayout = ({children}:{children:React.ReactNode}) => {
  return (
    <div className='relative flex h-screen w-full flex-col items-center justify-center'>
       {children} 
    </div>
  )
}

export default WizardLayout

import React from 'react'
import Alluser from './Alluser'
import Homenavbar from '../../../components/Homenavbar'
import Profiledisplay from '../Profiledisplay'


export default function NetworkUser() {
  return (
    <>
    
          <Homenavbar/>
    
          <div className="h-[calc(100vh-64px)] flex px-4 ">
            {/* Left Column - Profiledisplay */}
            <div className="hidden md:block w-[20%] sticky top-[64px] self-start h-[calc(100vh-64px)] overflow-hidden">
              <Profiledisplay/>
            </div>
    
            {/* Center Column - Uploadpost and Post */}
            <div className="w-full md:w-[80%] h-[calc(100vh-64px)] overflow-y-scroll px-4 space-y-6">
              <Alluser/>
            </div>
    
           
          </div>
        </>
  )
}

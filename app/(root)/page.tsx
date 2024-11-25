import Header from '@/components/Header,'
import { ModeToggle } from '@/components/ToggleTheme'
import React from 'react'
import BodyHome from '@/components/BodyHome'    

const Home = () => {
  return (

    <section>
        <div className="w-full container h-screen max-h-screen min-h-screen flex flex-col bg-black " >
           <div className="">
           <Header />
           </div>

           <div className="">
            <BodyHome />
           </div>

        </div>

    </section>
  )
}

export default Home

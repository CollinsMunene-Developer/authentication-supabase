import React from 'react'
import Link from 'next/link'
import Image from 'next/image'

const Header = () => {
  return (
    <div className='flex justify-between '  >
        <div className="w-full h-20 align-middle justify-center  ">
            <Link href="/">
            <Image   src="/Icons/logo.svg" alt='logo' width={50} height={20} className='ml-20 '     />
            </Link>

        </div> 
      <div className=" flex gap-8 mr-12 rounded-sm border-purple-400 w-29 h-10 mt-5 ">
        <button className=' w-24 ' >    
            <Link href="/sign-in" className=' text-purple-400'>Log In</Link>
        </button>
        <button className= 'rounded-md w-24 h-10 bg-purple-600 '>
            <Link href="/sign-up" className='text-white'>Sign Up</Link>
        </button>


      </div>
    </div>
  )
}

export default Header

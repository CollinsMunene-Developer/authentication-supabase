import React from 'react'
import Image from 'next/image'
import { background } from '@/public/Images/Images'
import Link from 'next/link'

const BodyHome = () => {
  return (
    <section className="w-full h-screen flex  items-center justify-center ">
      <nav className="w-full flex flex-col items-center">
        {/* Intro Text */}
        <div className="text-center mb-6 ">
          <h1 className="text-5xl font-bold text-purple-700">
            Welcome to Our CloudMagic
          </h1>
          <p className="text-white mt-2 gap-12">
            Seamlessly deploy your projects with ease and efficiency. <br />
            Across all cloud platformms which includes <br />
            AWS, Azure, Google Cloud, and more 
            <br />
            with single Clicks
           </p>
        </div>

        {/* Buttons Section */}
        <div className="flex space-x-6">
          <button className="bg-purple-600 text-white px-6 py-3 rounded-lg shadow-lg hover:bg-purple-700 transition duration-300">
            <Link href="/sign-up">Start Deploying Now</Link>
          </button>
          <button className="bg-gray-200 text-purple-700 px-6 py-3 rounded-lg shadow-lg hover:bg-gray-300 transition duration-300">
            <Link href="/learn-more">Learn More</Link>
          </button>
        </div>
      </nav>

      {/* Image Section */}
      <div className="mt-8">
        <Image
          src={background}
          width={1200}
          height={200}
          alt="Background illustration of deployment tools"
          className="rounded-lg shadow-md"
        />
      </div>
    </section>
  )
}

export default BodyHome

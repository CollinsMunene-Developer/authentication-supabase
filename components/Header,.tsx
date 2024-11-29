"use client"

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { LogIn, LogOut, UserPlus, User } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { User as SupabaseUser } from '@supabase/supabase-js'
import { createSupabaseClient } from '@/utils/HeaderSupabase'

const Header = () => {
  // State to track user authentication
  
  const [user, setUser] = useState<SupabaseUser | null>(null)
  const supabase = createSupabaseClient()
  const router = useRouter()

  // Effect to check user authentication status on component mount
  useEffect(() => {
    const checkUser = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      setUser(user)
    }

    checkUser()

    // Listen for authentication changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setUser(session?.user || null)
      }
    )

    // Cleanup subscription
    return () => {
      subscription.unsubscribe()
    }
  }, [])

  // Handle sign out functionality
  const handleSignOut = async () => {
    try {
      const { error } = await supabase.auth.signOut()
      if (error) {
        console.error('Error signing out:', error)
      }
      // Redirect to home or login page after sign out
      router.push('/')
    } catch (error) {
      console.error('Unexpected error during sign out:', error)
    }
  }

  return (
    <header className="flex items-center justify-between px-6 py-4 shadow-sm bg-white">
      <div className="flex items-center">
        <Link href="/" className="flex items-center">
          <Image 
            src="/Icons/logo.svg" 
            alt='Company Logo' 
            width={50} 
            height={50} 
            className="transition-transform hover:scale-105"
          />
        </Link>
      </div>
      
      <nav className="flex items-center space-x-4">
        <Link 
          href="/" 
          className="flex items-center text-gray-600 hover:text-purple-600 transition-colors"
        >
          <User className="mr-2" size={20} />
          Home
        </Link>
        
        {/* Conditional rendering based on authentication state */}
        {!user ? (
          <>
            <Link 
              href="/sign-in" 
              className="flex items-center text-purple-500 hover:text-purple-700 transition-colors"
            >
              <LogIn className="mr-2" size={20} />
              Log In
            </Link>
            
            <Link 
              href="/sign-up" 
              className="flex items-center px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition-colors"
            >
              <UserPlus className="mr-2" size={20} />
              Sign Up
            </Link>
          </>
        ) : (
          <button 
            onClick={handleSignOut}
            className="flex items-center px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors"
          >
            <LogOut className="mr-2" size={20} />
            Sign Out
          </button>
        )}
      </nav>
    </header>
  )
}

export default Header
'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { createClient } from '@/utils/supabase/client'; // Adjust the import path as needed

const Header = () => {
  const [user, setUser] = useState<{first_name?: string, last_name?: string} | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const supabase = createClient();
        
        // Get the current user
        const { data: { user: authUser } } = await supabase.auth.getUser();
        
        if (authUser) {
          // Fetch user profile from profiles table
          const { data: profileData, error } = await supabase
            .from('profiles')
            .select('first_name, last_name')
            .eq('user_id', authUser.id)
            .single();

          if (profileData) {
            setUser(profileData);
          }
        }
      } catch (error) {
        console.error('Error fetching user profile:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserProfile();
  }, []);

  return (
    <div className='flex justify-between'>
      <div className="w-full h-20 align-middle justify-center">
        <Link href="/">
          <Image 
            src="/Icons/logo.svg" 
            alt='logo' 
            width={50} 
            height={20} 
            className='ml-20'
          />
        </Link>
      </div>
      
      <div className="flex gap-8 mr-12 rounded-sm border-purple-400 w-29 h-10 mt-5">
        {isLoading ? (
          <div className="flex items-center">Loading...</div>
        ) : user ? (
          <div className="flex items-center gap-4">
            <span className="text-purple-600">
              Welcome, {user.first_name} {user.last_name}
            </span>
            <button className='w-24 text-purple-400'>
              <Link href="/logout">Log Out</Link>
            </button>
          </div>
        ) : (
          <>
            <button className='w-24'>    
              <Link href="/sign-in" className='text-purple-400'>Log In</Link>
            </button>
            <button className='rounded-md w-24 h-10 bg-purple-600'>
              <Link href="/sign-up" className='text-white'>Sign Up</Link>
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default Header;
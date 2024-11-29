import { createServerClient } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

export async function updateSession(request: NextRequest) {
  try {
    // Explicitly validate and parse the URL
    const supabaseUrl = new URL(
      process.env.NEXT_PUBLIC_SUPABASE_URL || "https://agtgnobybbjdysjzzzxs.supabase.co"
    ).toString();

    const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFndGdub2J5YmJqZHlzanp6enhzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzI1NDkzMTYsImV4cCI6MjA0ODEyNTMxNn0.BRF9pi1blrLgeZ-mVDP_tzkx6KtuCp_g-ZngfhQ6mBU";

    // Additional logging for debugging
    console.log('Supabase URL:', supabaseUrl);
    console.log('Supabase Anon Key Length:', supabaseAnonKey.length);

    let supabaseResponse = NextResponse.next({
      request,
    })

    const supabase = createServerClient(
      supabaseAnonKey,
      supabaseUrl,
      {
        cookies: {
          getAll() {
            return request.cookies.getAll()
          },
          setAll(cookiesToSet) {
            cookiesToSet.forEach(({ name, value, options }) => {
              try {
                request.cookies.set(name, value)
              } catch (error) {
                console.error('Error setting cookie:', error)
              }
            })
            
            supabaseResponse = NextResponse.next({
              request,
            })
            
            cookiesToSet.forEach(({ name, value, options }) => {
              try {
                supabaseResponse.cookies.set(name, value, options)
              } catch (error) {
                console.error('Error setting response cookie:', error)
              }
            })
          },
        },
      }
    )

    try {
      const {
        data: { user },
      } = await supabase.auth.getUser()

      if (
        !user &&
        !request.nextUrl.pathname.startsWith('/login') &&
        !request.nextUrl.pathname.startsWith('/auth')
      ) {
        // No user, redirect to login page
        const url = request.nextUrl.clone()
        url.pathname = '/login'
        return NextResponse.redirect(url)
      }
    } catch (error) {
      console.error('Error in user authentication:', error)
      // Fallback to next response in case of any authentication errors
      return NextResponse.next()
    }

    return supabaseResponse
  } catch (error) {
    console.error('Critical error in updateSession:', error)
    return NextResponse.next()
  }
}
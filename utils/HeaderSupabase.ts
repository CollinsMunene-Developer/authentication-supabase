import { Database } from '@/types/supabase'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'


export const createSupabaseClient = () => 
  createClientComponentClient<Database>({
    supabaseUrl: process.env.NEXT_PUBLIC_SUPABASE_URL! || "https://agtgnobybbjdysjzzzxs.supabase.co", 
    supabaseKey: process.env.PUBLIC_ANON_KEY! || "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFndGdub2J5YmJqZHlzanp6enhzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzI1NDkzMTYsImV4cCI6MjA0ODEyNTMxNn0.BRF9pi1blrLgeZ-mVDP_tzkx6KtuCp_g-ZngfhQ6mBU"
  })
import {createClient} from '@supabase/supabase-js'
const supabase_url = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://agtgnobybbjdysjzzzxs.supabase.co";
const anon_key = process.env.PUBLIC_ANON_KEY || "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFndGdub2J5YmJqZHlzanp6enhzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzI1NDkzMTYsImV4cCI6MjA0ODEyNTMxNn0.BRF9pi1blrLgeZ-mVDP_tzkx6KtuCp_g-ZngfhQ6mBU";
;

const supabase = createClient(supabase_url, anon_key)

export default supabase;
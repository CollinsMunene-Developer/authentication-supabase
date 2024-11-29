export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string         // UUID
          user_id: string    // UUID from auth.users
          email: string | null
          first_name: string | null
          last_name: string | null
          username: string | null
          phone_number: string | null
          gender: string | null
          role: string | null
          company: string | null
          created_at: string // TIMESTAMP WITH TIME ZONE
        }
        Insert: {
          id?: string        // Optional during insert
          user_id: string    // Required
          email?: string | null
          first_name?: string | null
          last_name?: string | null
          username?: string | null
          phone_number?: string | null
          gender?: string | null
          role?: string | null
          company?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          email?: string | null
          first_name?: string | null
          last_name?: string | null
          username?: string | null
          phone_number?: string | null
          gender?: string | null
          role?: string | null
          company?: string | null
          created_at?: string
        }
      }
    }
    Views: {
      // Future views can be added here
    }
    Functions: {
      // Future database functions can be added here
    }
  }
}
import { useState } from 'react';
import { createClient } from '@supabase/supabase-js';

// Supabase client configuration
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

// Authentication hooks and logic
export const useSupabaseAuth = () => {
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const [emailVerified, setEmailVerified] = useState(false);

  // Initialize Supabase client
  const supabase = createClient(supabaseUrl, supabaseAnonKey);

  // Login with email and password
  const loginWithEmailPassword = async (email: string, password: string) => {
    setLoading(true);
    setError(null); 

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        setError(error.message);
        return { success: false, error: error.message };
      }

      // Check email verification status
      if (data.user?.email_confirmed_at) {
        setUser(data.user);
        setEmailVerified(true);
        return { 
          success: true, 
          user: data.user,
          emailVerified: true 
        };
      } else {
        setEmailVerified(false);
        return { 
          success: false, 
          error: 'Email not verified',
          emailVerified: false 
        };
      }
    } catch (err: any) {
      setError(err.message);
      return { 
        success: false, 
        error: err.message 
      };
    } finally {
      setLoading(false);
    }
  };

  // Sign up with email and password
  const signUpWithEmailPassword = async (email: string, password: string) => {
    setLoading(true);
    setError(null);

    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: `${window.location.origin}/verify-email`
        }
      });

      if (error) {
        setError(error.message);
        return { success: false, error: error.message };
      }

      // User created, but not yet verified
      setUser(data.user);
      setEmailVerified(false);
      return { 
        success: true, 
        user: data.user,
        message: 'Verification email sent' 
      };
    } catch (err: any) {
      setError(err.message);
      return { 
        success: false, 
        error: err.message 
      };
    } finally {
      setLoading(false);
    }
  };

  // Resend verification email
  const resendVerificationEmail = async (email: string) => {
    setLoading(true);
    setError(null);

    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/verify-email`
      });

      if (error) {
        setError(error.message);
        return { success: false, error: error.message };
      }

      return { 
        success: true, 
        message: 'Verification email resent' 
      };
    } catch (err: any) {
      setError(err.message);
      return { 
        success: false, 
        error: err.message 
      };
    } finally {
      setLoading(false);
    }
  };

  // OAuth Login methods
  const loginWithGoogle = async () => {
    setLoading(true);
    setError(null);

    try {
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: window.location.origin
        }
      });

      if (error) {
        setError(error.message);
        return { success: false, error: error.message };
      }

      return { 
        success: true, 
        data 
      };
    } catch (err: any) {
      setError(err.message);
      return { 
        success: false, 
        error: err.message 
      };
    } finally {
      setLoading(false);
    }
  };

  const loginWithGithub = async () => {
    setLoading(true);
    setError(null);

    try {
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: 'github',
        options: {
          redirectTo: window.location.origin
        }
      });

      if (error) {
        setError(error.message);
        return { success: false, error: error.message };
      }

      return { 
        success: true, 
        data 
      };
    } catch (err: any) {
      setError(err.message);
      return { 
        success: false, 
        error: err.message 
      };
    } finally {
      setLoading(false);
    }
  };

  const loginWithMicrosoft = async () => {
    setLoading(true);
    setError(null);

    try {
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: 'azure',
        options: {
          redirectTo: window.location.origin
        }
      });

      if (error) {
        setError(error.message);
        return { success: false, error: error.message };
      }

      return { 
        success: true, 
        data 
      };
    } catch (err: any) {
      setError(err.message);
      return { 
        success: false, 
        error: err.message 
      };
    } finally {
      setLoading(false);
    }
  };

  // Logout method
  const logout = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      
      if (error) {
        setError(error.message);
        return { success: false, error: error.message };
      }

      setUser(null);
      setEmailVerified(false);
      return { success: true };
    } catch (err: any) {
      setError(err.message);
      return { 
        success: false, 
        error: err.message 
      };
    }
  };

  return {
    loginWithEmailPassword,
    signUpWithEmailPassword,
    resendVerificationEmail,
    loginWithGoogle,
    loginWithGithub,
    loginWithMicrosoft,
    logout,
    user,
    loading,
    error,
    emailVerified
  };
};
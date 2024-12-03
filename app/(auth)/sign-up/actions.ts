'use server';

import { redirect } from 'next/navigation';

import { createClient } from '@/utils/supabase/server';

export async function handleRegister(formData: FormData) {
  const supabase = await createClient();

  // Extract data from the form
  const data = {
    email: formData.get('email') as string,
    password: formData.get('password') as string,
    first_name: formData.get('firstName') as string,
    last_name: formData.get('lastName') as string,
    username: formData.get('username') as string,
    phone: formData.get('phoneNumber') as string,
    role: formData.get('role') as string,
    company: formData.get('company') as string,
    gender: formData.get('gender') as string,
  };

  // Sign up the user
  const { error } = await supabase.auth.signUp({
    email: data.email,
    password: data.password,
    options: {
      data: {
        first_name: data.first_name,
        last_name: data.last_name,
        username: data.username,
        phone: data.phone,
        role: data.role,
        company: data.company,
        gender: data.gender,
      },
    },
  });

  if (error) {
    // Redirect to error page if sign-up fails
    redirect('/error');
  }

  // Redirect to success page after successful sign-up
  redirect('/sign-in?signup=success');
}

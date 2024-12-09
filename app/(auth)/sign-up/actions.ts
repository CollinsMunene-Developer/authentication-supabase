'use server';

import { redirect } from 'next/navigation';
import { createClient } from '@/utils/supabase/server';
import { createServiceClient } from '@/utils/supabase/service';

export async function handleRegister(formData: FormData) {
  const supabase = await createClient();
  const serviceSupabase = createServiceClient();

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
  const { data: authData, error: authError } = await supabase.auth.signUp({
    email: data.email,
    password: data.password,
  });

  if (authError) {
    console.error('Authentication error:', authError);
    redirect('/error');
  }

  // Check if the user was created successfully
  if (!authData.user) {
    console.error('User creation failed');
    redirect('/error');
  }

  // Insert user profile details using service role
  const { error: profileError } = await serviceSupabase
    .from('profiles')
    .insert({
      user_id: authData.user.id,
      email: data.email,
      first_name: data.first_name,
      last_name: data.last_name,
      username: data.username,
      phone: data.phone,
      role: data.role,
      company: data.company,
      gender: data.gender,
    });

  if (profileError) {
    console.error('Profile insertion error:', profileError);
    
    // Optionally, delete the user if profile insert fails
    await supabase.auth.admin.deleteUser(authData.user.id);
    
    redirect('/error');
  }

  // Redirect to success page after successful sign-up
  redirect('/sign-in?signup=success');
}
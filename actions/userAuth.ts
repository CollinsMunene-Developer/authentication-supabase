import supabase from '../utils/supabase';

export async function signUpUser(userData: {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    username: string;
    phoneNumber: string;
    gender: string;
    role: string;
    company: string;
}) {
    try {
        // Step 1: First, check if username or email already exists
        const { data: existingUser, error: checkError } = await supabase
            .from('profiles')
            .select('*')
            .or(`email.eq.${userData.email},username.eq.${userData.username}`)
            .single();

        if (existingUser) {
            if (existingUser.email === userData.email) {
                return { 
                    data: null, 
                    error: { message: 'Email already in use', code: 'EMAIL_EXISTS' } 
                };
            }
            if (existingUser.username === userData.username) {
                return { 
                    data: null, 
                    error: { message: 'Username already in use', code: 'USERNAME_EXISTS' } 
                };
            }
        }

        // Step 2: If no existing user, proceed with authentication signup
        const { data, error: authError } = await supabase.auth.signUp({
            email: userData.email,
            password: userData.password,
            options: {
                emailRedirectTo: `${process.env.NEXT_PUBLIC_BASE_URL}/verify-email`,
                data: {
                    first_name: userData.firstName,
                    last_name: userData.lastName,
                    username: userData.username,
                    phone_number: userData.phoneNumber,
                    gender: userData.gender,
                    role: userData.role,
                    company: userData.company
                }
            }
        });

        // Check for authentication errors
        if (authError) {
            return { data: null, error: authError };
        }

        // Step 3: Insert user profile into the database
        const { data: profileData, error: profileError } = await supabase
            .from('profiles')
            .insert({
                user_id: data.user?.id,
                email: userData.email,
                first_name: userData.firstName,
                last_name: userData.lastName,
                username: userData.username,
                phone_number: userData.phoneNumber,
                gender: userData.gender,
                role: userData.role,
                company: userData.company
            })
            .select()
            .single();

        // Check for profile insertion errors
        if (profileError) {
            // If profile insertion fails, we should also delete the auth user
            await supabase.auth.admin.deleteUser(data.user?.id || '');
            return { data: null, error: profileError };
        }

        // Return successful signup data
        return { 
            data: {
                user: data.user,
                profile: profileData
            }, 
            error: null 
        };
    }
    catch(error) {
        console.error('Signup error:', error);
        return { 
            data: null, 
            error: error instanceof Error 
                ? error 
                : new Error('An unknown error occurred during signup') 
        };
    }
}
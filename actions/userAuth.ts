import Supabase from './utils/supabase.js';

//signup user with additiona data
export async function signUpUser(userData:
    {
        email: string;
        password: string;
        firstName: string;
        lastName: string;
        username: string;
        phoneNumber: string;
        gender: string;
        role: string;
        company: string;
    }
)
{
    try{
        const {data, error}= await Supabase.auth.signUp({
            email: userData.email,
            password: userData.password,
            options: {
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
        if(error) throw error;
        return {data, error : null};
    }
    catch(error){
        return {data: null, error};
    }
}
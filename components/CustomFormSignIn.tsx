'use client';

import React, { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";

import { Form, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";

// Import icons
import { Email, Lock, Googleimg, Microsoft, Github } from "@/public/Icons/Icons";

// Import custom Supabase auth hook
import { useSupabaseAuth } from '@/app/(auth)/sign-in/EmailVerified'; // Adjust the import path

// Zod validation schema
const signInSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string()
    .min(8, "Password must be at least 8 characters")
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
      "Password must include uppercase, lowercase, number, and special character"
    ),
});

// Type for form inputs
type SignInInputs = z.infer<typeof signInSchema>;

const CustomFormSignIn = () => {
  const router = useRouter();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isEmailVerified, setIsEmailVerified] = useState<boolean | null>(null);

  const {
    loginWithEmailPassword,
    loginWithGoogle,
    loginWithGithub,
    loginWithMicrosoft,
    resendVerificationEmail,
    loading
  } = useSupabaseAuth();

  // Initialize form with zod resolver
  const form = useForm<SignInInputs>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  // Handle form submission
  const onSubmit: SubmitHandler<SignInInputs> = async (data) => {
    try {
      const result = await loginWithEmailPassword(data.email, data.password);

      if (result.success && result.emailVerified) {
        router.push("/");
      } else if (!result.emailVerified) {
        setErrorMessage("Email not verified");
        setIsEmailVerified(false);
      } else {
        setErrorMessage("Login failed. Please try again.");
        setIsEmailVerified(null);
      }
    } catch (err) {
      setErrorMessage("An unexpected error occurred during login.");
      setIsEmailVerified(null);
    }
  };

  // Resend verification email
  const handleResendVerification = async () => {
    try {
      const email = form.getValues('email');
      if (email) {
        await resendVerificationEmail(email);
        setErrorMessage("Verification email resent. Please check your inbox.");
      } else {
        setErrorMessage("Please enter your email first.");
      }
    } catch (err) {
      setErrorMessage("Failed to send verification email. Please try again.");
    }
  };

  // OAuth Login Handlers
  const handleGoogleLogin = async () => {
    try {
      const result = await loginWithGoogle();
      if (result.success) {
        router.push("/dashboard");
      } else {
        setErrorMessage("Google login failed. Please try again.");
      }
    } catch (err) {
      setErrorMessage("An error occurred with Google login.");
    }
  };

  const handleGithubLogin = async () => {
    try {
      const result = await loginWithGithub();
      if (result.success) {
        router.push("/dashboard");
      } else {
        setErrorMessage("GitHub login failed. Please try again.");
      }
    } catch (err) {
      setErrorMessage("An error occurred with GitHub login.");
    }
  };

  const handleMicrosoftLogin = async () => {
    try {
      const result = await loginWithMicrosoft();
      if (result.success) {
        router.push("/dashboard");
      } else {
        setErrorMessage("Microsoft login failed. Please try again.");
      }
    } catch (err) {
      setErrorMessage("An error occurred with Microsoft login.");
    }
  };

  return (
    <Form {...form}>
      <Card className="h-screen w-full max-w-xl mx-auto">
        <CardHeader className="bg-gray-100 rounded-lg w-full">
          <CardTitle className="text-3xl font-bold text-center">
            Welcome Back
          </CardTitle>
          <p className="items-center justify-center flex text-gray-800">
            Provide your credentials to access your account
          </p>
        </CardHeader>
        <CardContent className="w-full flex flex-col px-12 justify-center">
          {errorMessage && (
            <Alert variant="destructive" className="mb-4">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>
                {errorMessage}
                {isEmailVerified === false && (
                  <div className="mt-2">
                    <Button 
                      variant="outline" 
                      size="sm" 
                      onClick={handleResendVerification}
                      className="mr-2"
                    >
                      Resend Verification Email
                    </Button>
                    <Link href="/sign-up" className="underline">
                      Verify Email
                    </Link>
                  </div>
                )}
              </AlertDescription>
            </Alert>
          )}

          <form onSubmit={form.handleSubmit(onSubmit)} className="w-full">
            <div className="grid grid-cols-1 gap-4">
              {/* Email Input */}
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <div className="flex items-center gap-2">
                    <div className="flex-shrink-0">
                      <Image src={Email} alt="email" width={20} height={20} />
                    </div>
                    <Input
                      type="email"
                      placeholder="collins.munene@shipht.it"
                      {...form.register("email")}
                    />
                  </div>
                </FormControl>
                {form.formState.errors.email && (
                  <FormMessage>
                    {form.formState.errors.email.message}
                  </FormMessage>
                )}
              </FormItem>

              {/* Password Input */}
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <div className="flex items-center gap-2">
                    <div className="flex-shrink-0">
                      <Image src={Lock} alt="lock" width={20} height={20} />
                    </div>
                    <Input
                      type="password"
                      placeholder="Enter password"
                      {...form.register("password")}
                    />
                  </div>
                </FormControl>
                {form.formState.errors.password && (
                  <FormMessage>
                    {form.formState.errors.password.message}
                  </FormMessage>
                )}
              </FormItem>

              {/* Login Button */}
              <div className="flex items-center justify-center">
                <Button
                  type="submit"
                  disabled={loading}
                  className="bg-blue-500 w-72 items-center hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                >
                  {loading ? "Logging in..." : "Login"}
                </Button>
              </div>
            </div>
          </form>

          {/* Additional Links */}
          <div>
            <p className="text-center text-gray-500">
              Don't have an account?{" "}
              <Link href="/sign-up" className="text-purple-700">
                Sign Up
              </Link>
            </p>

            <p className="text-center text-gray-500 mt-4">
              Forgot your password?{" "}
              <Link href="/reset-password" className="text-purple-700">
                Reset Password
              </Link>
            </p>
          </div>

          <span className="justify-center text-center -mt-1">Or</span>

          {/* OAuth Login Buttons */}
          <div className="flex flex-col items-center justify-center gap-2 mt-4">
            <Button
              type="button"
              onClick={handleGoogleLogin}
              className="bg-white text-black w-72 outline-gray-800 hover:bg-slate-400"
            >
              <div className="flex gap-4 items-center">
                <Image src={Googleimg} alt="google" width={20} height={20} />
                Continue with Google
              </div>
            </Button>
            <Button
              type="button"
              onClick={handleGithubLogin}
              className="bg-white text-black outline-gray-800 w-72 hover:bg-slate-400"
            >
              <div className="flex gap-4 items-center">
                <Image src={Github} alt="github" width={20} height={20} />
                Continue with Github
              </div>
            </Button>
            <Button
              type="button"
              onClick={handleMicrosoftLogin}
              className="h-10 outline-black bg-white text-black w-72 hover:bg-slate-400"
            >
              <div className="flex gap-4 items-center">
                <Image src={Microsoft} alt="microsoft" width={20} height={20} />
                Continue with Microsoft
              </div>
            </Button>
          </div>
        </CardContent>
      </Card>
    </Form>
  );
};

export default CustomFormSignIn;
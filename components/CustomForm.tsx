"use client"
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { toast } from 'react-hot-toast';
import { handleRegister } from "@/app/(auth)/sign-up/actions";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import Link from "next/link";
import Image from "next/image";
import { Email, Googleimg, User, Lock, Github, Microsoft } from "@/public/Icons/Icons";
import { Check, X } from 'lucide-react';
import { z } from "zod";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

const formSchema = z.object({
  firstName: z.string().min(2, "First name must be at least 2 characters"),
  lastName: z.string().min(2, "Last name must be at least 2 characters"),
  username: z.string().min(3, "Username must be at least 3 characters"),
  phoneNumber: z.string().regex(/^\+?[1-9]\d{1,14}$/, "Please enter a valid phone number"),
  email: z.string().email("Please enter a valid email address"),
  password: z.string()
    .min(8, "Password must be at least 8 characters")
    .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
    .regex(/[a-z]/, "Password must contain at least one lowercase letter")
    .regex(/[0-9]/, "Password must contain at least one number")
    .regex(/[^A-Za-z0-9]/, "Password must contain at least one special character"),
  confirmPassword: z.string(),
  role: z.string().min(1, "Please select a role"),
  company: z.string().min(2, "Company name must be at least 2 characters"),
  gender: z.string().min(1, "Please select your gender"),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match, Enter the same password",
  path: ["confirmPassword"],
});

const CustomForm = ({ onSubmit = (data: any) => console.log(data) }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      username: "",
      phoneNumber: "",
      email: "",
      password: "",
      confirmPassword: "",
      role: "",
      company: "",
      gender: "",
    },
    mode: "onChange", // Enable live validation
  });

  const ValidationStatus = ({ isValid }: { isValid: boolean }) => (
    isValid ? (
      <Check className="h-4 w-4 text-green-500" />
    ) : (
      <X className="h-4 w-4 text-red-500" />
    )
  );

  // Password validation checks
  const passwordChecks = {
    length: (password: string) => password.length >= 8,
    uppercase: (password: string) => /[A-Z]/.test(password),
    lowercase: (password: string) => /[a-z]/.test(password),
    number: (password: string) => /[0-9]/.test(password),
    special: (password: string) => /[^A-Za-z0-9]/.test(password),
  };

  const handleFormSubmit = async (data: z.infer<typeof formSchema>) => {
    setErrorMessage(null);
    setIsLoading(true);
  
    try {
      // Convert the data into FormData to be sent to the server
      const formData = new FormData();
      formData.append('firstName', data.firstName);
      formData.append('lastName', data.lastName);
      formData.append('username', data.username);
      formData.append('phoneNumber', data.phoneNumber);
      formData.append('email', data.email);
      formData.append('password', data.password);
      formData.append('role', data.role);
      formData.append('company', data.company);
      formData.append('gender', data.gender);
  
      // Call the server action
      await handleRegister(formData);
  
      // Redirect the user after successful registration
      window.location.href = '/sign-in?signup=success';
    } catch (error) {
      // Handle unexpected errors
      const errorMessage =
        error instanceof Error
          ? error.message
          : 'An unexpected error occurred during signup';
  
      setErrorMessage(errorMessage);
    } finally {
      // Ensure loading state is reset
      setIsLoading(false);
    }
  };
  
  
  
  return (
    <FormProvider {...form}>
          <Card className="w-full h-screen max-w-2xl    mx-auto">
      <CardHeader>
        <CardTitle className="text-3xl mt-6 font-bold text-center">
          Sign Up
        </CardTitle>
        <p className="text-center" > Sign up to access our platform</p>
      </CardHeader> 
      <CardContent className="w-full flex flex-col h-screen min-h-screen">
        <Form {...form}>
          <form onSubmit={form.handleSubmit( handleFormSubmit )} className="space-y-6">
            <div className="grid grid-cols-3 gap-4">
              <FormField
                control={form.control}
                name="firstName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>First Name</FormLabel>
                    <div className="flex gap-2 items-center">
                      <FormControl>
                        <Input placeholder="John" {...field} />
                      </FormControl>
                      <ValidationStatus isValid={field.value.length >= 2} />
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="lastName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Last Name</FormLabel>
                    <div className="flex gap-2 items-center">
                      <FormControl>
                        <Input placeholder="Doe" {...field} />
                      </FormControl>
                      <ValidationStatus isValid={field.value.length >= 2} />
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Username</FormLabel>
                    <div className="flex gap-2 items-center">
                      <FormControl>
                        <Input placeholder="collins" {...field} />
                      </FormControl>
                      <ValidationStatus isValid={field.value.length >= 3} />
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="phoneNumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Phone Number</FormLabel>
                  <div className="flex gap-2 items-center">
                    <Image src={User} alt="phone" width={20} height={20} />
                    <FormControl>
                      <Input type="tel" placeholder="+1 (555) 000-0000" {...field} />
                    </FormControl>
                    <ValidationStatus isValid={/^\+?[1-9]\d{1,14}$/.test(field.value)} />
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <div className="flex gap-2 items-center">
                    <Image src={Email} alt="email" width={20} height={20} />
                    <FormControl>
                      <Input type="email" placeholder="collins.munene@shipht.it" {...field} />
                    </FormControl>
                    <ValidationStatus isValid={/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(field.value)} />
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <div className="flex gap-2 items-center">
                    <Image src={Lock} alt="lock" width={20} height={20} />
                    <FormControl>
                      <Input type="password" placeholder="Enter password" {...field} />
                    </FormControl>
                  </div>
                  <div className="space-y-2 mt-2 justify-center flex">
                    <div className="flex items-center gap-2">
                      <ValidationStatus isValid={passwordChecks.length(field.value)} />
                      <span className="text-sm">At least 8 characters</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <ValidationStatus isValid={passwordChecks.uppercase(field.value)} />
                      <span className="text-sm">One uppercase letter</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <ValidationStatus isValid={passwordChecks.lowercase(field.value)} />
                      <span className="text-sm">One lowercase letter</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <ValidationStatus isValid={passwordChecks.number(field.value)} />
                      <span className="text-sm">One number</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <ValidationStatus isValid={passwordChecks.special(field.value)} />
                      <span className="text-sm">One special character</span>
                    </div>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Confirm Password</FormLabel>
                  <div className="flex gap-2 items-center">
                    <Image src={Lock} alt="lock" width={20} height={20} />
                    <FormControl>
                      <Input type="password" placeholder="Re-enter password" {...field} />
                    </FormControl>
                    <ValidationStatus 
                      isValid={
                        field.value === form.getValues("password") && 
                        field.value.length > 0
                      } 
                    />
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-3 gap-4">
              <FormField
                control={form.control}
                name="role"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Role</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select role in technology" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="softwaredeveloper">Software Developer</SelectItem>
                        <SelectItem value="cloudengineer">Cloud Engineer</SelectItem>
                        <SelectItem value="frontendengineer">Solutions Engineer</SelectItem>
                        <SelectItem value="backend">Backend Engineer</SelectItem>
                        <SelectItem value="cloud">Cloud Architect</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="company"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Company</FormLabel>
                    <div className="flex gap-2 items-center">
                      <FormControl>
                        <Input placeholder="Company name" {...field} />
                      </FormControl>
                      <ValidationStatus isValid={field.value.length >= 2} />
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="gender"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Gender</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select gender" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="male">Male</SelectItem>
                        <SelectItem value="female">Female</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="mt-6 flex justify-center">
              <Button className="w-72" type="submit" disabled={!form.formState.isValid || isLoading} >
              {isLoading ? "Signing Up..." : "Signup"}
              </Button>
            </div>
          </form>
        </Form>

        <FormDescription className="justify-center items-center flex ">
          Already have an account?{" "}
          <span className="font-bold">
            <Link href="/sign-in">Log In</Link>
          </span>
        </FormDescription>
        
        <span className="justify-center text-center -mt-2   ">Or</span>

        <div className="flex flex-col items-center justify-center gap-1 ">
          <Button className="bg-white text-black w-72 outline-gray-800 hover:bg-slate-400 ">
            <Link href="#" className="flex gap-4">
              <Image src={Googleimg} alt="google" width={20} height={20} />
              Continue with Google
            </Link>
          </Button>
          <Button className="bg-white text-black outline-gray-800 w-72  hover:bg-slate-400">
            <Link href="#" className="flex gap-4">
              <Image src={Github} alt="github" width={20} height={20} />
              Continue with Github
            </Link>
          </Button>
          <Button className="h-10 outline-black bg-white text-black w-72  hover:bg-slate-400">
            <Link href="#" className="flex gap-4">
              <Image src={Microsoft} alt="google" width={20} height={20} />
              Continue with Microsoft
            </Link>
          </Button>
        </div>
      </CardContent>
    </Card>
    </FormProvider>

  );
};

export default CustomForm;
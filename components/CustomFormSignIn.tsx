'use client';

import React from "react";
import { login, signup } from "@/app/(auth)/sign-in/actions";
import { useFormContext, FieldValues } from "react-hook-form";
import {
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Email, Lock, Googleimg, Microsoft, Github } from "@/public/Icons/Icons";
import Link from "next/link";
import Image from "next/image";
const CustomFormSignIn = () => {
  const form = useFormContext();
  
  if (!form) {
    return null; // or some loading state/fallback UI
  }

  const { register, formState } = form;
  const { errors } = formState;

  return (
    <Card className=" h-screen w-full  max-w-xl mx-auto">
      <CardHeader className="bg-gray-100  rounded-lg w-full">
        <CardTitle className="text-3xl font-bold text-center ">
          Welcome Back
        </CardTitle>
        <p className="items-center justify-center flex text-gray-800">
          Provide your credentials to access your account
        </p>
      </CardHeader>
      <CardContent className="w-full  flex mt-40 flex-col px-12  justify-center ">
        <div className="grid grid-cols-1 gap-2">
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
                  className="w-full"
                  {...register("email")}
                />
              </div>
            </FormControl>
            {errors?.email && (
              <FormMessage>{errors.email.message as string}</FormMessage>
            )}
          </FormItem>

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
                  className="w-full"
                  {...register("password")}
                />
              </div>
            </FormControl>
            {errors?.password && (
              <FormMessage>{errors.password.message as string}</FormMessage>
            )}
          </FormItem>
          
        <div className="justify-center flex">
            
          <button formAction={login} className="w-72   ">
            Log in
      
          </button>
          <button formAction={signup}>Sign up</button>
        </div>

        <div>
            <p className="text-center text-gray-500 ">
                Don't have an account?{" "}
                <a href="/sign-up" className="text-purple-700">
                Sign Up
                </a>
            </p>
           
           <p className="text-center text-gray-500 mt-4">
                Forgot your password?{" "}
                <a href="/reset-password" className="text-purple-700">
                Reset Password
                </a>
            </p>
        </div>
        <span className="justify-center text-center -mt-1">Or</span>

<div className="flex flex-col items-center justify-center gap-2 mt-4">
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
        

        </div>
      </CardContent>
    </Card>
  );
};

export default CustomFormSignIn;
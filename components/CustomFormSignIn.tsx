'use client';

import React from "react";
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
import Image from "next/image";
import { Email, Lock } from "@/public/Icons/Icons";

const CustomFormSignIn = () => {
  const form = useFormContext();
  
  if (!form) {
    return null; // or some loading state/fallback UI
  }

  const { register, formState } = form;
  const { errors } = formState;

  return (
    <Card className=" h-screen w-full  max-w-2xl mx-auto">
      <CardHeader className="bg-gray-100  rounded-lg w-full">
        <CardTitle className="text-3xl font-bold text-center ">
          Welcome Back
        </CardTitle>
        <p className="items-center justify-center flex text-gray-800">
          Provide your credentials to access your account
        </p>
      </CardHeader>
      <CardContent className="w-full  flex mt-40 flex-col px-12  justify-center ">
        <div className="grid grid-cols-1 gap-4">
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
            
          <Button type="submit" className="w-72   ">
            Sign In
          </Button>
        </div>

        <div>
            <p className="text-center text-gray-500 mt-4">
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
        

        </div>
      </CardContent>
    </Card>
  );
};

export default CustomFormSignIn;
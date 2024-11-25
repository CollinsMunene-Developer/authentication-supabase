"use client";
import React from "react";
import { Button } from "@/components/ui/button";
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
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import CustomForm from "./CustomForm";

const formSchema = z.object({
  username: z.string().min(2).max(50),
  Email: z.string().email(),
});

interface AuthFormProps {
  type: string;
  userDetails?: {
    firstname?: string;
  };
}

const AuthForm: React.FC<AuthFormProps> = ({ type, userDetails }) => {
  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
    },
  });

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
  }
  return (
    <section className="">
      <div className="flex h-full  container flex-col items-center align-middle justify-center bg-black-700 border-none mt--16 w-full h-screen outline-none gap-2">
        <h1 className="text-white font-bold  text-3xl ">
          {type === "signin"
            ? `Welcome Back, ${userDetails?.firstname || "User" }!`
            : "Welcome to CloudMagic"}
        </h1>
        <p className="text-gray-500">
          {type === "signin"
            ? "Sign in to your account"
            : "please sign up to continue"}
        </p>

        <div className="   w-1/2  items-center justify-center rounded-md  ">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className=" w-full align-middle justify-center items-center  translate-x-33   "
            >
              <CustomForm />
            </form>
          </Form>
        </div>
      </div>
    </section>
  );
};

export default AuthForm;

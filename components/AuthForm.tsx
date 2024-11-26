"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import CustomForm from "./CustomForm";

const formSchema = z.object({
  username: z.string().min(2).max(50),
  email: z.string().email(),
});

interface AuthFormProps {
  type: string;
  userDetails?: { 
    firstname?: string;
  };
}

const AuthForm: React.FC<AuthFormProps> = ({ type, userDetails }) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      email: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
  }

  return (
    <section className="w-full h-screen  flex justify-center items-center bg-black">
      <div className="w-1/2">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
            <CustomForm />

          </form>
        </Form>
      </div>
    </section>
  );
};

export default AuthForm;

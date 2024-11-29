'use client';

import React from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, FormProvider } from "react-hook-form";
import CustomFormSignIn from "@/components/CustomFormSignIn";
import { Form } from "@/components/ui/form";
import {login, signup} from './actions'

const formSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

type FormData = z.infer<typeof formSchema>;

const SignIn = () => {
    const methods = useForm<FormData>({
      mode: "onChange",
      resolver: zodResolver(formSchema),
      defaultValues: {
        email: "",
        password: "",
      },
    });

  const onSubmit = (data: FormData) => {
    console.log("Form values:", data);
    // Handle form submission (e.g., API call)
  };

  return (
    <div className="w-full flex justify-center items-center h-screen bg-black p-4">
<FormProvider {...methods}>
  <form onSubmit={methods.handleSubmit(onSubmit)} className="w-full ">
    <CustomFormSignIn />
  </form>
</FormProvider>

    </div>
  );
};

export default SignIn;
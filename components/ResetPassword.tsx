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
import { Email } from "@/public/Icons/Icons";
import Image from "next/image";
const ResetPassword = () => {
  return (
    <Card className="w-full max-w-2xl flex flex-col items-center  h-screen">
                <CardHeader className="w-full bg-gray-500 items-center rounded-md gap-6" >
            <CardTitle className="font-bold text-2xl " >Reset Password</CardTitle>
            <  p className="text-white" >   Enter your email address to reset your password</p>
        </CardHeader>
        <CardContent className="justify-center flex flex-col items-center py-64 ">
        <div className="grid grid-cols-1 gap-2">
          <FormItem className="w-full  ">
            <FormLabel >Email</FormLabel>
            <FormControl>
              <div className="flex items-center gap-2   ">
                <div className=" ">
                  <Image src={Email} alt="email" width={20} height={20} />
                </div>
                <Input
                  type="email"
                  placeholder="collins.munene@shipht.it"
                  className="w-full"
                />
              </div>
            </FormControl>
            <div className="justify-center flex">
            <Button className="w-72">Reset Password</Button>
            </div>
            </FormItem>
            </div>


        </CardContent>
    </Card>

  )
}

export default ResetPassword

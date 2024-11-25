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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import Link from "next/link";
import Image from "next/image";
import { Email, Googleimg, User, Lock, Github, Microsoft } from "@/public/Icons/Icons";

const CustomForm = ({ onSubmit = (data: any) => console.log(data) }) => {
  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-center">
          Profile Details
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols1 gap-6">
          <div className="space-y-4">
            <div className="grid grid-cols-3 gap-4">
              <FormItem>
                <FormLabel>First Name</FormLabel>
                <FormControl>
                  <Input placeholder="John" className="w-full" />
                </FormControl>
              </FormItem>

              <FormItem>
                <FormLabel>Last Name</FormLabel>
                <FormControl>
                  <Input placeholder="Doe" className="w-full" />
                </FormControl>
              </FormItem>

              <FormItem>
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input placeholder="collins " className="w-full" />
                </FormControl>
              </FormItem>
            </div>

            <FormItem>
              <FormLabel>Phone Number</FormLabel>
              <FormControl>
                <div className=" flex gap-2">
                    <Image src={User} alt="phone" width={20} height={20} />
                <Input
                  type="tel"
                  placeholder="+1 (555) 000-0000"
                  className="w-full"
                />
                </div>

              </FormControl>
            </FormItem>

            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <div className=" flex gap-2">
                    <Image src={Email} alt="email" width={20} height={20} />
                <Input
                  type="email"
                  placeholder="collins.munene@shipht.it"
                  className="w-full"
                />
                </div>

              </FormControl>
            </FormItem>
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <div className=" flex gap-2">
                    <Image src={Lock} alt="lock" width={20} height={20} />
                <Input
                  type="password"
                  placeholder=" Enter password" 
                  className="w-full"
                />
                </div>

              </FormControl>
            </FormItem>
            <FormItem>
              <FormLabel>Confirm Password</FormLabel>
              <FormControl>
              <div className=" flex gap-2">
                    <Image src={Lock} alt="lock" width={20} height={20} />
                <Input
                  type="password"
                  placeholder=" re-enter password"
                  className="w-full"
                />
                </div>
              </FormControl>
            </FormItem>
          </div>

          <div className="space-y-4">
            <FormItem>
              <FormLabel>Role</FormLabel>
              <Select>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="softwaredeveloper">
                    Software Developer
                  </SelectItem>
                  <SelectItem value="cloudengineer">
                    {" "}
                    Cloud Engineer{" "}
                  </SelectItem>
                  <SelectItem value="frontendengineer">
                    {" "}
                    Solutions engineer{" "}
                  </SelectItem>
                  <SelectItem value="backend"> Backend engineer </SelectItem>
                  <SelectItem value="cloud"> Cloud Archtect </SelectItem>
                </SelectContent>
              </Select>
            </FormItem>

            <FormItem>
              <FormLabel>Company</FormLabel>
              <FormControl>
                <Input placeholder="Company name" className="w-full" />
              </FormControl>
            </FormItem>
            {/*selecting gender */}
            <FormItem>
              <FormLabel>Gender</FormLabel>
              <Select>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select gender" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="male">Male</SelectItem>
                  <SelectItem value="female">Female</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </FormItem>
          </div>
        </div>

        <div className="mt-6 flex justify-center">
          <Button className="w-72" type="submit" onClick={() => onSubmit({})}>
            Signup
          </Button>
        </div>
        <FormDescription className="justify-center items-center   flex">
          Already have an account?{" "}
          <span className="font-bold">
            <Link href="/sign-in">Log In</Link>
          </span>{" "}
        </FormDescription>
        <span className="justify-center ml-12"> Or </span>

        {/* selecting to continue with google, github or Microsoft*/}
        <div className="flex flex-col items-center justify-center gap-2">
          <Button  className="bg-white text-black w-72 outline-gray-800 ">
            <Link href="#" className="flex gap-4  ">
              {" "}
              <Image src={Googleimg} alt="google" width={20} height={20} />{" "}
              Continue with Google
            </Link>
          </Button>
          <Button  className=" bg-white text-black outline-gray-800 w-72">
            <Link href="#" className="flex gap-4  ">
              {" "}
              <Image src={Github} alt="github" width={20} height={20} />{" "}
              Continue with Github
            </Link>
          </Button>
          <Button className="  h-10 outline-black bg-white text-black w-72 ">
            <Link href="#" className="flex gap-4">
              {" "}
              <Image src={Microsoft} alt="google" width={20} height={20} />{" "}
              Continue with Microsoft
            </Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default CustomForm;

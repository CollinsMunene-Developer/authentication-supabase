"use client";
import ResetPassword from "@/components/ResetPassword";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, FormProvider } from "react-hook-form";
import Image from "next/image";
import { Home } from "@/public/Icons/Icons";
import { Router } from "lucide-react";
import { useRouter } from "next/navigation";
const formSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

type FormData = z.infer<typeof formSchema>;
const page = () => {
    const methods = useForm<FormData>({
        mode: "onChange",
        resolver: zodResolver(formSchema),
        defaultValues: {
          email: "",
          password: "",
        },
      });

      const router = useRouter();
      const onSubmit = (data: FormData) => {
        console.log("Form values:", data);
        // Handle form submission (e.g., API call)  
      };    

       
      const handleHome = () => {
        router.push("/");
      }
  return (

    <div className="container bg-black max-w-full flex flex-col justify-center fixed px-4 ">
                <div className=" bg-white w-12 h-12 justify-start    items-center  flex" >
            <Image src={Home} width={30} height={30} alt="home" className=" items-center flex justify-center " onClick={handleHome} />
        </div>

    
      <div className=" items-center flex justify-center w-full mt-0 relative ">
      <FormProvider {...methods}>
  <form onSubmit={methods.handleSubmit(onSubmit)} className="w-1/2 items-center flex flex-col justify-center ">
  <ResetPassword />
  </form>
</FormProvider>
      </div>
      
    </div>
  );
};

export default page;

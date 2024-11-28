"use client";
import React from "react";
import CustomForm from "./CustomForm";

interface AuthFormProps {
  type: string;
  userDetails?: { 
    firstname?: string;
  };
}

const AuthForm: React.FC<AuthFormProps> = ({ type, userDetails }) => {
  return (
    <section className="w-full h-screen flex justify-center items-center bg-black">
      <div className="w-1/2">
        <CustomForm />
      </div>
    </section>
  );
};

export default AuthForm;
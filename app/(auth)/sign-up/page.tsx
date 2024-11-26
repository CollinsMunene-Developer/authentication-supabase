import AuthForm from "@/components/AuthForm";
import React from "react";

const SignUp = () => {
  return (
    <div className="bg-black h-screen m overflow-y-scroll ">
      <AuthForm type="signup"  />
    </div>
  );
};

export default SignUp;

"use client"
import { signIn } from "next-auth/react";
import { useState } from "react";

interface SideBarLoginButtonProps {
    loginPage: string;
    setLoginPage: (value: string) => void;
  }

const SideBarLoginButton = ({loginPage, setLoginPage}: SideBarLoginButtonProps) => {
    

  const handleLogin = () => {
    signIn(); // Chama o processo de login via NextAuth
  };

  return (
    <button
      onClick={handleLogin}
      className="px-4 py-2 bg-blue-500 text-white rounded-full mr-2 font-medium hover:bg-blue-600 transition"
    >
      Login
    </button>
  );
};

export default SideBarLoginButton;

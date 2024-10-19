"use client"

import { useServerAction } from 'zsa-react';
import { Register } from '@/actions/Register.Action';
import { signIn } from 'next-auth/react';
import { LoaderCircle } from 'lucide-react';
import { redirect } from 'next/navigation';

interface SideBarLoginFormProps {
    isLogin: boolean
    setIsLogin: (login: boolean) => void
    className?: string
}

export function SideBarLoginForm({ isLogin, setIsLogin, className }: SideBarLoginFormProps) {

    const { executeFormAction, error, isPending, isSuccess } = useServerAction(Register)
    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        const form = event.currentTarget as HTMLFormElement;
        // Use FormData para capturar os valores do formulário
        const formData = new FormData(form);
        const email = formData.get('email') as string; // Converta para string
        const password = formData.get('password') as string; // Converta para string
    
        
        

        if (isLogin) return await signIn("credentials", {
            redirect: false,
            email,
            password,
        });


        await executeFormAction(formData);
        if(isSuccess) return await signIn("credentials", {
            redirect: false,
            email,
            password,
        });;

    };
    
    return (
        <form onSubmit={handleSubmit} className={ `flex flex-col w-80 gap-2 ${className}`}>
        <h2 className={`${isLogin ? 'font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-green-500' : 'font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-500 to-green-500'}`}>{isLogin ? "Login" : "Register"}</h2>

        {error && <p style={{ color: "red" }}>{error.message}</p>}

        {!isLogin && ( 
          <>
          <div>
          <input
            id="username"
            type="text"
            name="username"
            className="p-2 rounded-lg w-full border-2 border-[#222] text-white bg-[#000000de]"
            placeholder="@Username"
            required />
          </div>
              <input
                id="firstName"
                type="text"
                name="displayname"
                className="p-2 rounded-lg w-full border-2 border-[#222] text-white bg-[#000000de]"
                placeholder="First Name"
                required />
                </>
        )}

        <input
          id="email"
          type="email"
          name="email"
          placeholder="Email"
          className="p-2 rounded-md border-2 border-[#222] text-white bg-[#000000de]"
          required
        />

        <input
          id="password"
          type="password"
          name="password"
          placeholder="Password"
          className="p-2 rounded-lg border-2 border-[#222] text-white bg-[#000000de]"
          required
        />

        <button type="submit" disabled={isPending} className={`mt-2 p-2 rounded-full flex items-center justify-center ${isLogin ? "bg-blue-500 hover:bg-blue-600" : "bg-green-500 hover:bg-green-600"}`}>
        {isPending ? <LoaderCircle className="animate-spin" /> : (isLogin ? "Login" : "Register")}
        </button>

        <p style={{ marginTop: "10px", cursor: "pointer", color: "white" }} onClick={() => setIsLogin(!isLogin)}>
            {isLogin ? 'Don\'t have an account? Register here' : 'Already have an account? Login here'}
        </p>
      </form>
    )
}
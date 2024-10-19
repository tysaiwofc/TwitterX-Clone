"use client"

import { useServerAction } from 'zsa-react';
import { Register } from '@/actions/Register.Action';
import { signIn } from 'next-auth/react';
import { LoaderCircle } from 'lucide-react';
import { redirect } from 'next/navigation';

interface SideBarLoginFormProps {
    isLogin: boolean
    setIsLogin: (login: boolean) => void
}

export function SideBarLoginForm({ isLogin, setIsLogin }: SideBarLoginFormProps) {

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
        <form onSubmit={handleSubmit} className="flex flex-col w-80 gap-2">
        <h2>{isLogin ? "Login" : "Register"}</h2>

        {error && <p style={{ color: "red" }}>{error.message}</p>}

        {!isLogin && ( 
          <>
          <div>
          <input
            id="username"
            type="text"
            name="username"
            className="p-2 rounded-lg w-full"
            placeholder="@Username"
            required />
          </div>
              <input
                id="firstName"
                type="text"
                name="displayname"
                className="p-2 rounded-lg w-full"
                placeholder="First Name"
                required />
                </>
        )}

        <input
          id="email"
          type="email"
          name="email"
          placeholder="Email"
          className="p-2 rounded-lg "
          required
        />

        <input
          id="password"
          type="password"
          name="password"
          placeholder="Password"
          className="p-2 rounded-lg text-black"
          required
        />

        <button type="submit" disabled={isPending} className={`mt-2 p-2 rounded-full flex items-center justify-center ${isLogin ? "bg-blue-500 hover:bg-blue-600" : "bg-purple-500 hover:bg-purple-600"}`}>
        {isPending ? <LoaderCircle className="animate-spin" /> : (isLogin ? "Login" : "Register")}
        </button>

        <p style={{ marginTop: "10px", cursor: "pointer" }} onClick={() => setIsLogin(!isLogin)}>
            {isLogin ? "Don't have an account? Register here" : "Already have an account? Login here"}
        </p>
      </form>
    )
}
"use client"; // Coloque isto no topo do arquivo para indicar que é um componente do cliente

import { useState } from "react";
import { SideBarLoginForm } from "@/components/leftsidebar/SideBarLoginForm";
import FeedAllPostLoading from "@/components/feed/FeedAllPostLoading";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";

const AuthPage = () => { 
  const [isLogin, setIsLogin] = useState<boolean>(true);
  const { data: session, status } = useSession();
  if(session?.user) return redirect('/')


  return (
    <div className="flex  content-center h-screen ">
      <div className={`flex-grow justify-center items-center content-center p-11 bg-gradient-to-r ${isLogin ? 'from-blue-400 to-blue-600' : 'from-green-400 to-green-600'} bg-cover bg-center transition-all duration-500`}>
        <div className="bg-black overflow-y-auto h-[calc(100vh-56px)] rounded-xl backdrop-blur-md">
          <FeedAllPostLoading />
        </div>
      </div>
  

      <div className="max-w-96 w-full border-l-[1px] border-l-[#252525] bg-black flex flex-col content-center items-center justify-center">
        <SideBarLoginForm setIsLogin={setIsLogin} isLogin={isLogin} className="p-2 " />
      </div>
    </div>
  );
};

export default AuthPage;

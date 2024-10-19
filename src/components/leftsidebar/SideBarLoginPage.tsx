"use client"; // Coloque isto no topo do arquivo para indicar que é um componente do cliente

import { useState } from "react";
import { SideBarLoginForm } from "./SideBarLoginForm";

const AuthPage = () => { 
  const [isLogin, setIsLogin] = useState<boolean>(true);


  return (
    <div className="max-w-72 bg-black h-screen ml-4 border-r-[0.5px] border-r-[#333333] p-2 flex gap-2">
      <SideBarLoginForm isLogin={isLogin} setIsLogin={setIsLogin}/>
    </div>
  );
};

export default AuthPage;

"use client"
import { useSession, signIn, signOut } from "next-auth/react";
import SideBarProfileCard from "./SidebarProfileCard";
import SideBarIcon from "./SideBarIcon";
import SideBarContent from "./SideBarContent";
import SideBarLoginButton from "./SideBarLoginButton";
import { CircleAlert, LoaderCircle } from "lucide-react";
import { useState } from "react";
import SideBarLoginPage from "./SideBarLoginPage";
import Popup from "../popup";


const LeftSideBar = () => {
  const { data: session, status } = useSession();
  const [loginPage, setLoginPage ] = useState("login");
  const [showPopup, setShowPopup] = useState<boolean>(false);



  if (status === "loading") {
    return (
      <div className="sidebar-items w-full bg-black h-screen ml-4 border-r-[0.5px] border-r-[#333333] items-center flex justify-center gap-2">
      <LoaderCircle className="animate-spin" />
  </div>
    ) 
  }

  if(!session) {
    if(loginPage === "login") return (
    <SideBarLoginPage/>

      
    )
  }

  if (!session) {
    return (
      <div className="w-full sidebar-items bg-black h-screen ml-4 border-r-[0.5px] border-r-[#333333] items-center flex justify-center gap-2">
        <div className="flex flex-col h-screen gap-2 ">
            <SideBarIcon/>
            <div className="flex flex-row gap-2">
            <CircleAlert />
            You must be logged in to perform some actions on Twitter/X
            </div>
            <SideBarLoginButton setLoginPage={setLoginPage} loginPage={loginPage}/>
        </div>
    </div>
    );
  }

  console.log(session.user)
  return (
    <div className="w-full sidebar-items bg-black h-screen pl-4 pr-4  border-r-[0.5px] border-r-[#333333] ">
        <div className="flex flex-col h-screen">
            <SideBarIcon/>
            <Popup setShowPopup={setShowPopup} showPopup={showPopup} />
            <SideBarContent username={session.user?.username} setShowPopup={setShowPopup} showPopup={showPopup}/>
            <SideBarProfileCard avatar={session.user?.avatar || ""} username={session.user?.username} fname={session.user?.fname} verified={session?.user?.verified} />
        </div>
    </div>
  );
};

export default LeftSideBar;

// src/app/[username]/page.js

import LeftSideBar from "@/components/leftsidebar";
import Profile from "@/components/profile";
import RightSideBar from "@/components/rightsidebar";

interface UserPageProps {
    params: {
        username: string
    }
}

export const generateMetadata = ({ params }: UserPageProps) => {
    const { username } = params; // Obtém o parâmetro username da URL
    return {
      title: `Profile / ${username || 'User'}`, // Define o título dinamicamente
      description: `profile`,
    };
  };
  
  const UserPage = ({ params }: UserPageProps) => {
    const { username } = params; // Obtém o parâmetro username da URL diretamente dos parâmetros
  
    return (
        <div className="flex flex-row h-screen overflow-hidden">
        <LeftSideBar  />
        <Profile username={username}/>
        <RightSideBar />
      </div>
      
    );
  };
  
  export default UserPage;
  
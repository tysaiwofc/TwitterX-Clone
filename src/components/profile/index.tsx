"use client";
import { useEffect, useState } from "react";
import { ArrowLeft } from "lucide-react";
import ProfileBarTop from "./ProfileBarTop";
import Link from "next/link";
import { CgSpinner } from "react-icons/cg";
import { MdVerified } from "react-icons/md";
import Image from "next/image";
import FeedPost from "../feed/FeedPost";
import ProfileLayout from "./ProfileLayout";

interface ProfileProps {
  username: string;
}

interface Post {
  id: number;
  user: {
    fname: string;
    lname: string;
    username: string;
    complete_name: string;
    verified: boolean;
    avatar: string;
  };
  content?: string;
  video?: string;
  images?: string;
  reference?: number;
  replys: number;
  likes: number;
  reposts: number;
  type: string;
  views: number;
  createdAt: Date;
}

interface UserData {
  avatar: string;
  lname: string;
  fname: string;
  verified: boolean;
  id: number;
  username: string;
  posts: number;
  postFeed: Post[];
  cover: string
  followers: number
  following: number
  createdAt: Date
  country_id: number
}

const Profile = ({ username }: ProfileProps) => {
  const [userData, setUserData] = useState<UserData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch(`/api/user?username=${username}`);
        if (!response.ok) {
          throw new Error('Erro ao buscar dados do usuário');
        }

        const data: UserData = await response.json();
        document.title = `${data.fname} (@${data.username}) / X`
        setUserData(data);
      } catch (err: any) {
        setError(err?.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [username]); // Executa o efeito quando o username muda

  if (loading) {
    return (
      <div className="bg-black flex-grow items-start p-2 justify-center flex overflow-hidden border-r-[0.5px] border-r-[#333333]">
        <CgSpinner className="animate-spin text-4xl text-blue-500" />
      </div>
    ); // Exibe uma mensagem de carregamento
  }

  if (error) {
    return (
      <div className="bg-black flex-grow items-center p-4 justify-center flex flex-col overflow-hidden border-r-[0.5px] border-r-[#333333]">
        <Image src="/images/usernotfound.webp" width={320} height={420} alt="User Not Found" />
        <p className="max-w-80 w-full">We could not find any user with username "{username}". Continue browsing for the best experience.</p>
        <Link href="/" className="bg-[#1a76ff] p-2 pl-4 pr-4 rounded-full hover:bg-[#285dad]">Explore</Link>
      </div>
    );
  }

  return (
    <div className="bg-black flex-grow flex flex-col border-r-[0.5px] border-r-[#333333] min-h-screen"> 
      <ProfileBarTop>
        <Link href="/" className="flex items-center">
          <ArrowLeft size={40} className="hover:bg-[#2e2e2e77] rounded-full p-2" />
        </Link>
        <div className="text-white flex flex-col">
          <div className="text-white flex flex-row gap-2 items-center">
            {userData ? `${userData.fname} ${userData.lname}` : "User Not Found"}
            {userData?.verified && <MdVerified />}
          </div>
          <p className="text-[#3d3d3d]">{userData?.posts || 0} posts</p>
        </div>
      </ProfileBarTop>
  
      
      {/* Controle de overflow na área de posts */}
      <div className="flex-grow overflow-y-auto no-scrollbar min-h-0">
        <ProfileLayout 
        avatar={userData?.avatar  || ""} 
        cover={userData?.cover  || ""} 
        verified={userData?.verified || false} 
        createdAt={userData?.createdAt || new Date()} 
        country_id={userData?.country_id || 0} 
        followers={userData?.followers || 0}
        fname={userData?.fname || ""}
        following={userData?.following || 0}
        lname={userData?.lname  || ""}
        username={userData?.username  || ""}
        key={userData?.username} 
        />

{userData?.postFeed
  ?.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
  .map((post, index) => (
    <FeedPost
      username={username}
      id={post.id}
      key={`${post.id}-${index}`}
      complete_name={`${userData.fname} ${userData.lname}`}
      verified={userData.verified}
      avatar={userData.avatar}
      content={post.content}
      video={post.video}
      images={post.images}
      reference={post.reference}
      replys={post.replys}
      likes={post.likes}
      reposts={post.reposts}
      type={post.type}
      views={post.views}
      createdAt={new Date(post?.createdAt)}
    />
  ))}

      </div>
    </div>
  );
  
  
};

export default Profile;

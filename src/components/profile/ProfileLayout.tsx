import Image from 'next/image'
import ProfileAbout from '@/components/profile/ProfileAbout'
import FeedCategorie from '../feed/FeedCategorie';
import { useSession } from 'next-auth/react';


interface ProfileLayoutProps {
    fname: string;
    lname: string;
    verified: boolean;
    username: string;
    followers: number;
    following: number;
    createdAt: Date;
    country_id: number;
    avatar: string
    cover: string
    hasUser: boolean
}

const ProfileLayout = ({
    country_id,
    createdAt,
    fname,
    followers,
    following,
    lname,
    username,
    verified,
    cover,
    avatar,
    hasUser = true
}: ProfileLayoutProps) => {
  const { data: session, status } = useSession();

  
  return (
    <div className="w-full relative border-b border-b-[#353535]">
      {/* Primeira imagem de fundo */}
      {hasUser ? <Image src={cover || "/images/echo.png"} className="max-w-full max-h-48 h-full" width={1280} height={520} alt="test" />
       : 
       <div className="bg-[#2c2c2c]  text-[#4b4a4a] h-48 w-full flex items-center justify-center content-center" >User Not Found</div>
       }
      {/* Segunda imagem redonda, com tamanho ajustado e posicionamento */}
      <div className="relative flex flex-row items-center p-2">
        <div className="absolute left-4 bottom-1 z-10">
          {hasUser ? <Image
            src={avatar || "/images/echo.png"}
            className="h-32 w-32 rounded-full border border-black"
            width={120}
            height={120} 
            alt="Profile Picture"
          /> : <div className='h-32 w-32 rounded-full border border-black bg-[#2c2c2c]'></div>}
        </div>

        {/* OBS: Lembrar de fazer a função pra ver se o user já é um follow ou não. */}
        {hasUser ? <button className={`ml-auto ${session?.user?.username === username ? 'bg-black hover:bg-[#131313d8] border-2 border-[#747373bd]' : 'bg-white hover:bg-[#ecececc4] text-black font-semibold'}   rounded-full pl-5 pr-5 py-2 z-20 relative`}>
          {session?.user?.username === username ? 'Edit Profile' : "Follow"}
        </button> : <button disabled={true} className={`ml-auto text-[#747373bd] bg-black hover:bg-[#131313d8] border-2 border-[#747373bd]   rounded-full pl-5 pr-5 py-2 z-20 relative`}>
          Invalid User
        </button>}
      </div>
      <ProfileAbout fname={fname} lname={lname} verified={verified} username={username} followers={followers} following={following} createdAt={createdAt} country_id={country_id} />
    {hasUser ?
    <div className="sticky top-0 flex flex-row w-full border-b-[0.5px] border-b-[#333333] h-14 bg-black z-10 text-[#5a5a5a] ">
    <FeedCategorie href={`/${username}`} name='Posts'/>
    <FeedCategorie href={`/${username}/replies`} name='Replies'/>
    <FeedCategorie href={`/${username}/highlights`} name='Highlights'/>
    <FeedCategorie href={`/${username}/articles`} name='Articles'/>
    <FeedCategorie href={`/${username}/media`} name='Media'/>
    <FeedCategorie href={`/${username}/likes`} name='Likes'/>
  </div>
  : ''
  }
    </div>
  );
};

export default ProfileLayout;

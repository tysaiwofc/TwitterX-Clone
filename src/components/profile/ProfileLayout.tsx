import Image from 'next/image'
import ProfileAbout from '@/components/profile/ProfileAbout'
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
    avatar
}: ProfileLayoutProps) => {
  return (
    <div className="w-full relative">
      {/* Primeira imagem de fundo */}
      <Image src={cover || "/images/echo.png"} className="max-w-full max-h-48 h-full" width={1280} height={520} alt="test" />
      
      {/* Segunda imagem redonda, com tamanho ajustado e posicionamento */}
      <div className="relative flex flex-row items-center p-2">
        <div className="absolute left-4 bottom-1 z-10">
          <Image
            src={avatar || "/images/echo.png"}
            className="h-32 w-32 rounded-full border border-black"
            width={120}
            height={120} 
            alt="Profile Picture"
          />
        </div>
        <button className="ml-auto bg-black hover:bg-[#131313d8] border-2 border-[#747373bd] rounded-full pl-5 pr-5 py-2 z-20 relative">
          Edit Profile
        </button>
      </div>
      <ProfileAbout fname={lname} lname={lname} verified={verified} username={username} followers={followers} following={following} createdAt={createdAt} country_id={country_id} />
    </div>
  );
};

export default ProfileLayout;

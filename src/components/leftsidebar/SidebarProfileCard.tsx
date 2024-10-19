import Image from "next/image";
import { LogOut } from "lucide-react";
import { signOut } from "next-auth/react";
import { MdVerified } from "react-icons/md";

interface SideBarProfileCardsProps {
  username: string | null | undefined;
  fname: string | null | undefined;
  verified: number | null | undefined;
  avatar: string
}

const SideBarProfileCard = ({
  username,
  fname,
  verified,
  avatar
}: SideBarProfileCardsProps) => {
    return (
    <div className="p-2 max-h-16 h-full flex flex-row rounded-full items-center hover:bg-[#302f2f91] mb-2 cursor-pointer">
      <Image
        src={avatar}
        width={47}
        height={45}
        alt="test"
        className="rounded-full h-full"
      />
      <div className="flex flex-col ml-2">
        <strong className="flex flex-row gap-2 items-center">
          {fname} {verified ? <MdVerified color="#1a6aff"/> : ""}
        </strong>
        <p className="text-[#858383]">@{username}</p>
      </div>
      <button className="ml-auto cursor-pointer hover:bg-[#ff5555e1] rounded-full p-2" onClick={() => signOut()}>
      <LogOut/>
      </button>
    </div>
  );
};

export default SideBarProfileCard;

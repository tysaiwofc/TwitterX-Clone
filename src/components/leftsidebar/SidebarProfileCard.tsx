import Image from "next/image";
import { LogOut } from "lucide-react";
import { signOut } from "next-auth/react";

interface SideBarProfileCardsProps {
  username: string | null | undefined;
  fname: string | null | undefined;
  lname: string | null | undefined;
  avatar: string
}

const SideBarProfileCard = ({
  username,
  fname,
  lname,
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
        <strong>
          {fname} {lname}
        </strong>
        <p className="text-[#858383]">@{username}</p>
      </div>
      <button className="ml-auto cursor-pointer hover:bg-[#ff5555e1] rounded-full p-2" onClick={() => signOut()}>
      <LogOut
         // Adicione 'cursor-pointer' para indicar que é clicável
         // Chame a função dentro de uma função anônima
      />
      </button>
    </div>
  );
};

export default SideBarProfileCard;

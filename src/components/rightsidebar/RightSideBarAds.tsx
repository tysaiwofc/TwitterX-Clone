
import { MdVerified } from "react-icons/md";
import Image from "next/image";
import Link from "next/link";
import { ElementType } from "react";

interface RightSideBarAdsProps {
    sponsor: string
    cover: string
    button: string
    icon: ElementType
}

const RightSideBarAds = ({sponsor, button, cover, icon: Icon}: RightSideBarAdsProps) => {
    return (
        <div className="relative w-full max-h-24 h-full ">
        {/* Usando a classe 'object-cover' para garantir que a imagem preencha a div */}
        <Image
          src={cover}
          fill={true} // Isso faz a imagem preencher toda a div pai
          alt="ads"
          className="rounded-2xl border-white border-[1px] object-cover"
        />
        {/* Botão posicionado no canto inferior direito */}
        <button className="flex gap-2 items-center absolute bottom-2 right-2 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-full">
        <Icon size={20}/>{button}
        </button>
        <p className="absolute up-2 left-2  text-white  p-1 rounded-full flex gap-1 justify-center items-center">Sponsored by <Link href="/">{sponsor}</Link> <MdVerified /></p>
      </div>
    )
}

export default RightSideBarAds;
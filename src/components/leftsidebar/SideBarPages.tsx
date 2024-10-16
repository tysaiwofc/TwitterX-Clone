import Link from "next/link";
import { ElementType } from "react";
import { usePathname } from "next/navigation"; // Importa o hook usePathname

interface SideBarPagesProps {
  href: string;
  name: string;
  icon: ElementType;
}

const SideBarPages = ({ href, name, icon: Icon }: SideBarPagesProps) => {
  const pathname = usePathname(); // Obtém o caminho atual
  const isActive = pathname === href; // Verifica se o caminho atual corresponde ao href
  
  return (
    <Link href={href} className="  hover:bg-[#302f2f91] transition-all duration-300 ease-in-out mr-2 flex flex-row gap-5 p-4 rounded-full items-center font-light text-xl">
        <Icon/>
        <strong className={`left-sidebar ${isActive ? 'text-[#ffffff] font-semibold ' : 'text-[#bebdbd]'}`}>{name}</strong>
    </Link>
)
};

export default SideBarPages;

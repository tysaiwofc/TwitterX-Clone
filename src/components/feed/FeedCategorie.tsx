import Link from "next/link";
import { usePathname } from "next/navigation";

interface FeedCategorieProps {
    name: string
    href: string
}

const FeedCategorie = ({name, href}: FeedCategorieProps) => {
    const pathname = usePathname(); // Obtém o caminho atual
    const isActive = pathname === href; // Verifica se o caminho atual corresponde ao href
    
    
    return (
        <Link href={href} className={`cursor-pointer flex-col hover:bg-[#302f2f91] transition-all duration-300 ease-in-out w-full flex justify-center items-center ${isActive ? 'font-semibold' : 'font-medium'}`}>
    <span className={`${isActive ? "leading-none mt-auto" : "leading-none "}`}>{name}</span> {/* Reduz o espaçamento entre o texto e a linha */}
    {isActive ? <div className="h-1 max-w-14 w-full rounded-full bg-blue-500 mt-auto"></div> : ''} {/* mt-0 para garantir que a margem superior é zero */}
    </Link>

    )
}

export default FeedCategorie;
import Link from "next/link";

interface RightSideBarFooterItemProps {
    name: string;
    href: string;
}

const RightSideBarFooterItem = ({ name, href }: RightSideBarFooterItemProps) => {
    return (
        <Link href={href} className="hover:underline">
            {name}
        </Link>
    );
};

const RightSideBarFooter = () => {
    return (
        <div className="flex flex-wrap gap-2 p-2 text-[#838282] whitespace-nowrap">
            <RightSideBarFooterItem name="Terms of Service" href="/tos" />
            <RightSideBarFooterItem name="Privacy Policy" href="/privacy" />
            <RightSideBarFooterItem name="Cookie Policy" href="/cookie-policy" />
            <RightSideBarFooterItem name="Accessibility" href="/accessibility" />
            <RightSideBarFooterItem name="Ads info" href="/ads-info" />
            <RightSideBarFooterItem name="More ..." href="/" />
            <span>© 2024 ECHO.</span>
        </div>
    );
};

export default RightSideBarFooter;

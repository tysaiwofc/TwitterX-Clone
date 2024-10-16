import { House, Search, Bell, Mail, User } from "lucide-react";
import SideBarPages from "./SideBarPages";
import SideBarPost from "./SideBarPost";


interface SideBarContentProps {
  username: string
  setShowPopup: (show: boolean) => void;
  showPopup: boolean;
}
const SideBarContent = ({username = "Unknown", setShowPopup, showPopup}: SideBarContentProps) => {
    return (
        <div className="flex-grow overflow-hidden mr-2">
        <div className="content-wrapper h-full overflow-auto no-scrollbar">
          <SideBarPages href="/" name="Home" icon={House}/>
          <SideBarPages href="/explore" name="Explore" icon={Search}/>
          <SideBarPages href="/notifications" name="Notifications" icon={Bell}/>
          <SideBarPages href="/messages" name="Messages" icon={Mail}/>
          <SideBarPages href={`/${username}`} name="Profile" icon={User}/>
          <SideBarPost setShowPopup={setShowPopup} showPopup={showPopup}/>
        </div>
      </div>
    )
}

export default SideBarContent;
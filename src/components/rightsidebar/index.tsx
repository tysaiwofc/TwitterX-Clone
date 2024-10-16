
import RightSideBarAds from "./RightSideBarAds";
import { OctagonAlert } from "lucide-react";
import RightSideBarFooter from "./RightSideBarFooter";
import RightSideBarSuggestions from "./RightSideBarSuggestions";

const RightSideBar = () => {
  return (
    <div className="right-sidebar max-w-96 w-full bg-black border-r-[0.5px] border-r-[#333333] p-2 gap-4 flex flex-col">
      <RightSideBarAds icon={OctagonAlert} sponsor="ECHO" cover="/images/echo.png" button="Join Now"/>
      <RightSideBarSuggestions />
      <RightSideBarFooter />
    </div>
  );
};

export default RightSideBar;

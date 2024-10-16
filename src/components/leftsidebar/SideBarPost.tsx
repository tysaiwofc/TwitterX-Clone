"use client"
interface SideBarPostProps {
    setShowPopup: (show: boolean) => void;
    showPopup: boolean;
}

const SideBarPost = ({ setShowPopup, showPopup }: SideBarPostProps) => {
    return (
        <div className="flex">
            <button onClick={() => { setShowPopup(!showPopup) }} className="mt-2 w-full bg-[#1c96fa] hover:bg-[#3185ca] flex flex-row gap-2 p-4 rounded-full items-center justify-center font-normal text-xl">
                Post
            </button>
        </div>
    )
}

export default SideBarPost;
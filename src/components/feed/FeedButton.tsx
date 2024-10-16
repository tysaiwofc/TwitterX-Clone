"use client"
import { ElementType } from "react";

interface FeedButtonTypes {
    icon: ElementType;
    value: number | string;
    className?: string;
    action?: (...args: any[]) => void;
}

const FeedButton = ({value, icon: Icon, className, action }: FeedButtonTypes) => {
    return (
        <button onClick={() => action ? action() : null} className={`transition-colors duration-200 ease-in-out flex flex-row gap-2 items-center hover:bg-[#a4dafa5b] rounded-full p-2 hover:text-blue-600 ${className || ""}`}>
            <Icon className="w-5 h-5" /> {value || 0}
        </button>
    )
}

export default FeedButton;

import Image from 'next/image'
import { useEffect, useState } from 'react'
import { MdVerified, MdBookmarkBorder } from 'react-icons/md'
import { FaRegHeart } from "react-icons/fa";
import { IoStatsChart } from "react-icons/io5";
import { ChartNoAxesColumn, MessageCircle, Repeat2, Upload } from 'lucide-react';
import ImageWithFallback from './FeedImage';
import CustomVideoPlayer from './FeedVideo';
interface FeedPostProps {
  type?: string
  username: string
  likes?: number
  reposts?: number
  replys?: number
  reference?: number
  views?: number
  content?: string
  images?: string
  id: number
  video?: string
  complete_name: string
  avatar: string
  verified: boolean
}

const FeedPost = ({
  id,
  type,
  username,
  likes,
  replys,
  reference,
  reposts,
  views,
  content,
  images,
  video,
  avatar,
  complete_name,
  verified
}: FeedPostProps) => {

  return (
    <div className="flex flex-row p-4 w-full h-auto border-b border-[#25252560] ">
  <Image
    src={avatar || "/images/default.jpg"}
    width={50}
    height={50}
    alt="User Avatar"
    className="rounded-full object-cover max-h-14 h-full max-w-14 w-full"
  />
  <div className="flex flex-col gap-2 w-full pl-4">
    {/* User Information */}
    <div className="flex flex-row gap-2 items-center">
      <p className="font-semibold">{complete_name}</p>
      {verified && <MdVerified className="text-blue-500" />}
      <p className="text-sm text-gray-500">@{username}</p>
    </div>

    {/* Post Content */}
    <div className="w-full bg-black p-2 rounded-md flex flex-col">
      {content && (
        <p className="break-words overflow-hidden overflow-ellipsis select-text">
          {content}
        </p>
      )}

      {/* Display image if present */}
      {images && (
        <ImageWithFallback src={images || ""}/>
      )}

      {/* Display video if present */}
      {video && (
        <CustomVideoPlayer video={video || "/videos/output.mp4"}/>
      )}
    </div>

    {/* Post Stats */}
    <div className="flex flex-row text-gray-500 text-sm pt-2 items-center">
    <div className='flex flex-row gap-7'>
    <button className="transition-colors duration-200 ease-in-out flex flex-row gap-2 items-center hover:bg-[#728bfc5b] rounded-full p-2 hover:text-blue-600">
  <MessageCircle className="w-5 h-5" /> {replys || 0}
</button>
<button className="transition-colors duration-200 ease-in-out flex flex-row gap-2 items-center hover:bg-[#a4fab75b] rounded-full p-2 hover:text-green-600">
  <Repeat2 className="w-5 h-5" /> {reposts || 0}
</button>
<button className="transition-colors duration-200 ease-in-out flex flex-row gap-2 items-center hover:bg-[#fc72725b] rounded-full p-2 hover:text-red-600">
  <FaRegHeart className="w-5 h-5" /> {likes || 0}
</button>
<button className="transition-colors duration-200 ease-in-out flex flex-row gap-2 items-center hover:bg-[#728bfc5b] rounded-full p-2 hover:text-blue-600">
  <IoStatsChart className="w-5 h-5" /> {views || 0}
</button>
    </div>
<button className="transition-colors duration-200 ease-in-out flex ml-auto flex-row gap-2 items-center hover:bg-[#728bfc5b] rounded-full p-2 hover:text-blue-600">
<ChartNoAxesColumn />
</button>
<button className="transition-colors duration-200 ease-in-out flex flex-row gap-2 items-center hover:bg-[#728bfc5b] rounded-full p-2 hover:text-blue-600">
  <Upload />
</button>
 </div>
  </div>
</div>

  )
}

export default FeedPost

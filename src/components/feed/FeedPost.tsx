import Image from 'next/image'
import { MdVerified } from 'react-icons/md'
import { FaRegHeart } from "react-icons/fa";
import { IoStatsChart } from "react-icons/io5";
import { ChartNoAxesColumn, MessageCircle, Repeat2, Upload } from 'lucide-react';
import ImageWithFallback from './FeedImage';
import CustomVideoPlayer from './FeedVideo';
import FeedButton from './FeedButton';
import { useState } from 'react';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
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
  createdAt: Date
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
  verified,
  createdAt
}: FeedPostProps) => {
  const [localLikes, setLocalLikes] = useState(likes);
  const { data: session, status } = useSession();

  const DateAgo = (createdAt: Date) => {
    const now = new Date();
    if(!createdAt) return;
    const differenceInMilliseconds = now.getTime() - new Date(createdAt)?.getTime();
    const differenceInHours = Math.floor(differenceInMilliseconds / (1000 * 60 * 60)); // Convertendo de milissegundos para horas
    const differenceInDays = Math.floor(differenceInHours / 24); // Calcula a diferença em dias
    const differenceInMonths = Math.floor(differenceInDays / 30); // Aproximadamente 30 dias em um mês

    if (differenceInHours < 1) {
        return "Less than an hour ago";
    } else if (differenceInHours <= 24) {
        return `${differenceInHours}h ago`;
    } else if (differenceInDays < 30) {
        return `${differenceInDays}d ago`;
    } else {
        return `${differenceInMonths}m ago`;
    }
};

    const date = DateAgo(createdAt);

  async function handleIncrementLikes(has: boolean) {
    if(!session) return;

    console.log("FUNCTION HANDLER TYPE", has)
    try {
      setLocalLikes(prevLikes => {
        if (!has) {
          return prevLikes as number + 1; // Incrementa se has for true
        } else {
          return Math.max((prevLikes as number) - 1, 0); // Decrementa se has for false, mas não permite valores negativos
        }
      });
    } catch (error) {
      console.error('Failed to increment/decrement likes:', error);
    }
  }

  async function patchIncrementField(postId: number, field: string, incrementBy: number = 1, userId: string) {
    if(userId?.length < 1) return;
    
    const url = `/api/posts`;

    try {
        const response = await fetch(url, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                postId,
                field,
                incrementBy,
                userId
            }),
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        console.log(data.message || 'Campo incrementado com sucesso.');
        return data?.type || false;
    } catch (error) {
        console.error('There was an error incrementing the field:', error);
        throw error;
    }
}


  return (
    <div className="flex flex-row p-4 w-full h-auto border-b-2 border-[#2525258e] ">
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
      <Link className="font-semibold hover:underline" href={`/${username}`}>{complete_name}</Link>
      {verified && <MdVerified className="text-blue-500" />}
      <p className="text-sm text-gray-500">@{username}</p>
      <p className='text-gray-500'>-</p>
      <p data-tooltip-target="tooltip-top" data-tooltip-placement="top"  title={`${new Date(createdAt).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
})}`} className='hover:underline text-gray-500' >{date}</p>

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
      <FeedButton value={replys || 0} icon={MessageCircle}/>
      <FeedButton value={reposts || 0} icon={Repeat2}/>
      <FeedButton value={localLikes || 0} icon={FaRegHeart} action={async () => { 
        const va = await patchIncrementField(id, 'likes', 1, session?.user?.id || "")
        console.log("BUTTON ACTION RESPONSE", va)
        handleIncrementLikes(va) }}/>
      <FeedButton value={views || 0} icon={IoStatsChart}/>
    </div>
    <FeedButton value={views || 0} icon={ChartNoAxesColumn} className='ml-auto'/>
    <FeedButton value={views || 0} icon={Upload}/>
 </div>
  </div>
  </div>
  )
}

export default FeedPost;

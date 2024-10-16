import { useState } from 'react';
import Image from 'next/image';
interface ImageWithFallbackProps {
    src: string
}

const ImageWithFallback = ({src}: ImageWithFallbackProps) => {
  const [imageError, setImageError] = useState(false);

  return (
    <div className="relative w-full h-auto">
      {imageError ? (
        <div className="flex items-center justify-center w-full h-[300px] bg-black rounded-2xl border border-[#5f5e5e60]">
          <p className="text-gray-600">Failed to load image</p>
        </div>
      ) : (
        <Image
          src={src}
          alt="Post Image"
          width={500}
          height={300}
          className="rounded-2xl border-[#5f5e5e60] border-2 object-cover w-full h-auto"
          onError={() => setImageError(true)}
        />
      )}
    </div>
  );
};

export default ImageWithFallback;

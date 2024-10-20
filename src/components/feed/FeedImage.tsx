import { useState } from 'react';
import Image from 'next/image';
import { IoMdDownload } from 'react-icons/io';

interface ImageWithFallbackProps {
    src: string;
}

const ImageWithFallback = ({ src }: ImageWithFallbackProps) => {
    const [imageError, setImageError] = useState(false);

    const handleDownload = () => {
        const link = document.createElement('a');
        link.href = src; // URL da imagem
        link.download = src.split('/').pop() || 'download.png'; // Nome do arquivo para download
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    return (
        <div className="relative w-full h-auto">
            {imageError ? (
                <div className="flex items-center justify-center w-full h-[300px] bg-black rounded-2xl border border-[#5f5e5e60]">
                    <p className="text-gray-600">Failed to load image</p>
                </div>
            ) : (
                <>
                    <Image
                        src={src}
                        alt="Post Image"
                        width={500}
                        height={300}
                        className="rounded-2xl border-[#5f5e5e60] border-2 object-cover w-full h-auto"
                        onError={() => setImageError(true)}
                    />
                    <div className="absolute flex content-end justify-end p-2 top-0 left-0 w-full">
                        <button 
                            className='hover:bg-[#00000081] p-2 rounded-full' 
                            onClick={handleDownload} // Adiciona o evento de clique
                        >
                            <IoMdDownload />
                        </button>
                    </div>
                </>
            )}
        </div>
    );
};

export default ImageWithFallback;

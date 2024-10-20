"use client";
import { useState } from 'react';
import { Transition } from '@headlessui/react';
import { X, Image as ImageIcon, Smile, Video } from 'lucide-react';
import { FaPoll, FaVideo } from "react-icons/fa";
import { CgSpinner } from 'react-icons/cg';
import Image from 'next/image'
import { useSession } from 'next-auth/react';

interface PopupProps {
  showPopup: boolean;
  setShowPopup: (show: boolean) => void;
}

const Popup = ({ showPopup, setShowPopup }: PopupProps) => {
  const [content, setContent] = useState<string>('');  // Para o texto do post
  const [selectedImage, setSelectedImage] = useState<File | null>(null);  // Para a imagem
  const [selectedVideo, setSelectedVideo] = useState<File | null>(null);  // Para o vídeo
  const [loading, setLoading] = useState<boolean>(false);  // Estado de loading
  const [imageUrl, setImageUrl] = useState<string | null>(null); // URL da imagem
  const [videoUrl, setVideoUrl] = useState<string | null>(null); // URL do vídeo
  const [fileType, setFileType] = useState<'image' | 'video' | null>(null); // Para rastrear o tipo de arquivo selecionado
  const [FileSize, setFileSize] = useState("0")
  const [uploadProgress, setUploadProgress] = useState(0); // Adicione um estado para o progresso


  const { data: session, status } = useSession();

  // Função para fazer upload da imagem
  const uploadImage = async (file: File) => {
    setLoading(true); // Ativa o loading antes do upload
    const formData = new FormData();
    formData.append('file', file);

    const xhr = new XMLHttpRequest(); // Usando XMLHttpRequest para monitorar o progresso

    xhr.upload.addEventListener('progress', (e) => {
      if (e.lengthComputable) {
          const percentComplete = (e.loaded / e.total) * 100;
          setUploadProgress(percentComplete); // Atualiza o estado do progresso
          console.log(`Progresso do upload: ${Math.round(percentComplete)}%`);
      }
  });

    xhr.onload = async () => {
        if (xhr.status === 200) {
            const imageData = await JSON.parse(xhr.responseText);
            setImageUrl(imageData.file.url);
            console.log('Image URL:', imageData.file.url);
        } else {
            console.error('Failed to upload image');
        }
        setLoading(false); // Desativa o loading após o upload
    };

    xhr.onerror = () => {
        console.error('Erro durante o upload da imagem');
        setLoading(false); // Desativa o loading após erro
    };

    xhr.open('POST', '/api/upload', true);
    xhr.send(formData);
};

// Função para fazer upload do vídeo
const uploadVideo = async (file: File) => {
    setLoading(true); // Ativa o loading antes do upload
    const formData = new FormData();
    formData.append('file', file);

    const xhr = new XMLHttpRequest(); // Usando XMLHttpRequest para monitorar o progresso

    xhr.upload.addEventListener('progress', (e) => {
      if (e.lengthComputable) {
          const percentComplete = (e.loaded / e.total) * 100;
          setUploadProgress(percentComplete); // Atualiza o estado do progresso
          console.log(`Progresso do upload: ${Math.round(percentComplete)}%`);
      }
  });

    xhr.onload = async () => {
        if (xhr.status === 200) {
            const videoData = await JSON.parse(xhr.responseText);
            setVideoUrl(videoData.file.url);
            console.log('Video URL:', videoData.file.url);
        } else {
            console.error('Failed to upload video');
        }
        setLoading(false); // Desativa o loading após o upload
    };

    xhr.onerror = () => {
        console.error('Erro durante o upload do vídeo');
        setLoading(false); // Desativa o loading após erro
    };

    xhr.open('POST', '/api/upload', true);
    xhr.send(formData);
};
  

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setFileSize((file.size / 1048576).toFixed(2))
      setSelectedImage(file);
      setSelectedVideo(null); // Limpa a seleção de vídeo
      setFileType('image'); // Define o tipo de arquivo como imagem
      await uploadImage(file); // Chama a função de upload e aguarda
    }
  };

  // Função para lidar com a seleção de vídeo
  const handleVideoChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setFileSize((file.size / 1048576).toFixed(2))
      setSelectedVideo(file);
      setSelectedImage(null); // Limpa a seleção de imagem
      setFileType('video'); // Define o tipo de arquivo como vídeo
      await uploadVideo(file); // Chama a função de upload e aguarda
    }
  };

  // Função para lidar com o envio do post
  const handleSubmit = async () => {
    setLoading(true);
  
    // Define o tipo do post
    let postType = 'CONTENT';
    if (selectedImage && content) postType = 'IMAGE_CONTENT';
    else if (selectedImage) postType = 'IMAGE';
    else if (selectedVideo) postType = 'VIDEO'; // Adiciona o caso do vídeo
  
    // Cria o objeto JSON
    const payload = {
      content,
      type: postType,
      image: imageUrl, // Usa a URL da imagem armazenada
      video: videoUrl,
      userId: session?.user?.id
    };
  
    console.log('Payload antes de enviar:', payload);
  
    // Envia o post para a API
    const response = await fetch('/api/posts', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });
  
    if (response.ok) {
      console.log('Post created successfully');
      setShowPopup(false); // Fecha o popup ao finalizar
    } else {
      console.error('Failed to create post');
    }
  
    setLoading(false); // Finaliza o loading
  };

  return (
    <Transition show={showPopup}>
      <div className="fixed inset-0 flex items-start justify-center z-50 p-2">
        <div className="fixed inset-0 bg-black bg-opacity-50" />
        <div className="relative bg-[#000] rounded-2xl z-10 max-w-[600px] max-h-[80vh] w-full mt-6 shadow-[0_0_4px_rgba(255,255,255,0.5)]">
          <div className='flex flex-row items-center p-2'>
            <button className="p-1 hover:bg-[#333333c7] rounded-full m-1 cursor-pointer" onClick={() => setShowPopup(false)}>
              <X />
            </button>
            <button className='ml-auto mr-2 text-blue-500 hover:bg-[#3284ff2f] pl-4 pr-4 pt-1 pb-1 rounded-full'>Drafts</button>
          </div>

          <div className='h-44 overflow-hidden p-4'>
            <textarea
              className='w-full h-full bg-black resize-none outline-none'
              placeholder="Digite aqui..."
              value={content}
              maxLength={320}
              onChange={(e) => setContent(e.target.value)}
            />
          </div>
          <div className='p-2 '>
            {imageUrl && (
              <div className='flex flex-row gap-2 bg-slate-800 rounded-md'>
              <Image src={imageUrl || ""} width={50} height={50} alt="image_preview" className='rounded-md'/>
              <div className='flex flex-col'>
                <p className='text-slate-400'>{imageUrl}</p>
                <p className='text-slate-600'>{FileSize}MB</p>
              </div>
            </div>
            )}

            {videoUrl && (
              <div className='flex flex-row gap-2 bg-slate-800 rounded-md'>
              <div className='h-[50px] w-[50px] flex items-center justify-center bg-slate-900 rounded-md'>
                <Video />
              </div>
              <div className='flex flex-col'>
                <p className='text-slate-400'>{videoUrl}</p>
                <p className='text-slate-600'>{FileSize}MB</p>
              </div>
            </div>
            )}
            
          </div>
          <div className='gap-4 flex flex-row border-t-[1px] ml-2 mr-2 border-[#757575] items-center text-blue-600 p-2'>
            <label className={`hover:bg-[#7daef815] rounded-full p-2 cursor-pointer ${fileType === 'video' ? 'opacity-50 cursor-not-allowed' : ''}`}>
              <ImageIcon/>
              <input type="file" accept="image/*" className="hidden" onChange={handleImageChange} disabled={fileType === 'video'} />
            </label>

            <label className={`hover:bg-[#7daef815] rounded-full p-2 cursor-pointer ${fileType === 'image' ? 'opacity-50 cursor-not-allowed' : ''}`}>
              <FaVideo />
              <input type="file" accept="video/*" className="hidden" onChange={handleVideoChange} disabled={fileType === 'image'} />
            </label>

            <button className='hover:bg-[#7daef815] rounded-full p-2'>
              <Smile />
            </button>

            <button
              className="ml-auto rounded-full mt-4 bg-blue-500 hover:bg-blue-600 text-white pl-5 pr-5 px-4 py-2"
              onClick={handleSubmit}
              disabled={loading} // Desabilita se loading for true
            >
              {loading ? <div className='flex flex-row gap-1'>{uploadProgress}<CgSpinner className="animate-spin text-4xl text-blue-900" /></div> : 'Post'}
            </button>
          </div>
        </div>
      </div>
    </Transition>
  );
};

export default Popup;

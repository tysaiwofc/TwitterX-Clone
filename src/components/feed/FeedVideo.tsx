import { ArrowDownToLine } from 'lucide-react';
import { useRef, useState } from 'react';
import { FaPause, FaPlay } from 'react-icons/fa';

interface VideoProps {
  video: string;
}

const CustomVideoPlayer = ({ video }: VideoProps) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [error, setError] = useState(false);

  // Função para alternar play/pause
  const togglePlayPause = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  // Atualizar a barra de progresso e duração
  const handleTimeUpdate = () => {
    if (videoRef.current) {
      setProgress((videoRef.current.currentTime / videoRef.current.duration) * 100);
    }
  };

  // Definir a duração do vídeo quando ele carrega
  const handleLoadedMetadata = () => {
    if (videoRef.current) {
      setDuration(videoRef.current.duration);
    }
  };

  // Mudar o tempo do vídeo via barra de progresso
  const handleProgressClick = (event: any) => {
    const rect = event.target.getBoundingClientRect();
    const clickPosition = event.clientX - rect.left;
    const clickPercentage = clickPosition / rect.width;
    if (videoRef.current) {
      videoRef.current.currentTime = clickPercentage * videoRef.current.duration;
      setProgress(clickPercentage * 100);
    }
  };

  // Função para download
  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = video;
    link.download = 'XCloneVideoDownload.mp4';
    link.click();
  };

  // Exibir erro ao falhar no carregamento do vídeo
  const handleError = () => {
    setError(true);
  };

  return (
    <div className="mt-4">
      {error ? (
        <div className="flex justify-center items-center h-64 rounded-md border border-[#5f5e5e60]">
          <p className="text-gray-600">Failed to load the video</p>
        </div>
      ) : (
        <div className="relative w-full max-w-2xl rounded-md overflow-hidden border border-[#5f5e5e60]">
          {/* Elemento de vídeo */}
          <video
            ref={videoRef}
            className="rounded-md w-full max-h-80"
            onTimeUpdate={handleTimeUpdate}
            onLoadedMetadata={handleLoadedMetadata}
            onError={handleError}
          >
            <source src={video} type="video/mp4" />
            Your browser does not support the video tag.
          </video>

          {/* Controles e barra de progresso sobrepostos */}
          <div className="absolute bottom-0 left-0 w-full bg-[#0f0f0f4d]">
            {/* Barra de progresso personalizada */}
            
            <div className='flex flex-row items-center'>
            <button
                onClick={togglePlayPause}
                className="hover:bg-[#00000069] text-white rounded-full transition p-2"
              >
                {isPlaying ? <FaPause className='h-5 w-5'/> : <FaPlay className='h-5 w-5'/>}
              </button>
            <div className="text-sm text-gray-400 mt-1 w-full">
              {Math.floor((progress / 100) * duration)}s / {Math.floor(duration)}s
            </div>
            
            <button
                onClick={handleDownload}
                className="hover:bg-[#34ff7875] p-2 ml-auto text-white rounded-full transition"
              >
                <ArrowDownToLine className='h-5 w-5' />
              </button>
            </div>
            <div className="flex p-2">
            <div
              className="w-full h-[6px] bg-[#ffffffb7] rounded cursor-pointer"
              onClick={handleProgressClick}
            >
              <div
                className="h-[6px] bg-blue-600 rounded"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
              
            </div>
            

            {/* Controles personalizados */}
            
          </div>
        </div>
      )}
    </div>
  );
};

export default CustomVideoPlayer;

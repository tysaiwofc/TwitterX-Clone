import React from 'react';

interface ProfileBarTopProps {
  children: React.ReactNode; // Aceita qualquer nó React como children
}

const ProfileBarTop = ({ children }: ProfileBarTopProps) => {
  return (
    <div
      className={`sticky top-0 items-center left-0 right-0 flex-row gap-4 transition-all duration-300 ease-in-out w-full p-4 border-b border-[#333333] backdrop-blur-md bg-black bg-opacity-60 z-10 flex`} // Adicione `flex` aqui
    >
      {children}
    </div>
  );
};

export default ProfileBarTop;

"use client"
import { LoaderCircle } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { MdVerified } from "react-icons/md";
interface User {
  username: string;
  avatar: string;
  fname: string;
  lname: string;
  verified: boolean;
}

const RightSideBarSuggestions: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch('/api/random-users');
        
        if (!response.ok) {
          throw new Error('Erro ao buscar usuários');
        }

        const data = await response.json();
        setUsers(data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  if (loading) {
    return (
        <div className='border-[0.5px] border-[#333333] rounded-2xl p-2 flex flex-col gap-2 min-h-20  items-center justify-center content-center'>
            <LoaderCircle className='animate-spin'/>
        </div>
    );
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className='border-[0.5px] border-[#333333] rounded-2xl p-2 flex flex-col gap-2 min-h-20 '>
      <h2 className='font-semibold'>You might like</h2>
      <ul>
        {users.map((user, index) => (
          <li key={index} className="flex flex-row items-center w-full gap-2">
          <img src={user.avatar} alt={`${user.fname} ${user.lname}`} className="w-10 h-10 rounded-full" />
          <div className="flex-grow"> {/* Adicionando flex-grow aqui */}
          <p className="flex items-center">
  {user.fname}
  {user.verified && <MdVerified className="ml-1" color="#1a6aff" />}
</p>

            <p className='text-[#807e7e]'>@{user.username}</p>
          </div>
          <button className='bg-white hover:bg-[#b4b4b4] p-2 rounded-full text-black pl-4 pr-4 font-semibold'>Follow</button>
        </li>
        
        ))}
      </ul>
    </div>
  );
};

export default RightSideBarSuggestions;

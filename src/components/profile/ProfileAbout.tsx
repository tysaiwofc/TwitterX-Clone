import { CalendarDays, MapPin } from 'lucide-react';
import { MdVerified } from 'react-icons/md';
import CountryIds from './CountryIds'; // Importa o objeto com os países

interface ProfileAboutProps {
    fname: string;
    lname: string;
    verified: boolean;
    username: string;
    followers: number;
    following: number;
    createdAt: Date;
    country_id: number;
}

const ProfileAbout = ({
    country_id,
    createdAt,
    fname,
    followers,
    following,
    lname,
    username,
    verified
}: ProfileAboutProps) => {
    // Formatação da data
    const date = createdAt instanceof Date ? createdAt : new Date(createdAt);

    // Formatação da data
    const createdUserDate = date.toLocaleDateString('en-US', {
        month: 'long', // Para exibir o mês por extenso
        year: 'numeric' // Para exibir o ano
    });

    // Busca o país correspondente ao country_id
    const userCountry = CountryIds.find(country => country.id === country_id)?.name || ""; // Usa o country_id para encontrar o nome do país

    return (
        <div className="w-full p-4">
            <div className='flex flex-row gap-2 items-center '>
                <p>{fname} {lname}</p>
                {verified && <MdVerified color='#3654ff' />}
            </div>
            <p className='text-[#4b4a4a]'>@{username}</p>
            <div className='flex flex-row gap-4 mt-2'>
                <div className='flex items-center gap-1 text-[#4b4a4a]'>
                    <CalendarDays />
                    <p>Joined {createdUserDate || ""}</p>
                </div>
                <div className='flex items-center gap-1 text-[#4b4a4a]'>
                    <MapPin />
                    <p>{userCountry}</p> {/* Exibe o país correspondente ao country_id */}
                </div>
            </div>
            <div className='flex flex-row gap-2 mt-4'>
                <p className='text-[#4b4a4a]'><strong className='text-white'>{followers}</strong> followers</p>
                <p className='text-[#4b4a4a]'><strong className='text-white'>{following}</strong> following</p>
            </div>
        </div>
    );
};

export default ProfileAbout;

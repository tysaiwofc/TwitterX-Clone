import { useEffect, useState } from 'react';
import FeedPost from './FeedPost';
import { CgSpinner } from 'react-icons/cg';

// Define a interface Post
interface Post {
  id: number;
  user: {
    fname: any;
    lname: any;
    username: string;
    complete_name: string;
    verified: boolean;
    avatar: string;
  };
  content?: string;
  video?: string;
  images?: string;
  reference?: number;
  replys: number;
  likes: number;
  reposts: number;
  type: string;
  views: number;
  createdAt: Date;
}

const FeedAllPostLoading = () => {
  const [posts, setPosts] = useState<Post[]>([]); // Usa a interface Post
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  // Função para buscar os posts da API
  const fetchPosts = async (pageNumber: number) => {
    try {
      const response = await fetch(`/api/posts?page=${pageNumber}&limit=10`);
      if (!response.ok) {
        throw new Error('Failed to fetch posts');
      }
      const data: Post[] = await response.json();
  
      console.log('API response:', data); // Verifique aqui quantos posts estão vindo
  
      if (data.length === 0) {
        setHasMore(false);
      } else {
        setPosts(prevPosts => [...prevPosts, ...data]);
      }
      setTimeout(() => {
        setLoading(false);
      }, 2000)
    } catch (err) {
      setLoading(false);
    }
  };
  

  useEffect(() => {
    if (page === 1) {
      setPosts([]); // Limpa os posts ao carregar a primeira página
    }
    fetchPosts(page);
  }, [page]);
  

  // Função para carregar mais posts
  const loadMorePosts = () => {
    setPage(prevPage => prevPage + 1); // Incrementa a página
  };

  if (loading && page === 1) {
    return <div className='flex items-center justify-center content-center w-full'>
        <CgSpinner className="animate-spin text-4xl text-blue-500" />
      </div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="content-wrapper h-full overflow-auto no-scrollbar flex flex-col">
      {posts.map((post, index) => (
        <FeedPost
          username={post.user.username}
          id={post.id}
          key={`${post.id}-${index}`}
          complete_name={`${post.user.fname} ${post.user.lname}`}
          verified={post.user.verified}
          avatar={post.user.avatar}
          content={post.content}
          video={post.video}
          images={post.images}
          reference={post.reference}
          replys={post.replys}
          likes={post.likes}
          reposts={post.reposts}
          type={post.type}
          views={post.views}
          createdAt={post.createdAt}
        />
      ))}

      {hasMore && (
        <button
          className="p-2 bg-black hover:bg-[#1d1d1dce] text-[#747373]"
          onClick={loadMorePosts}
          disabled={loading}
        >
          {loading ? <CgSpinner className="animate-spin text-4xl text-blue-500" /> : 'Load more'}
        </button>
      )}
    </div>
  );
};

export default FeedAllPostLoading;

// src/app/api/posts/route.ts
import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/app/api/auth/[...nextauth]/route'; // Certifique-se de ter sua configuração de NextAuth aqui
import prisma from '@/lib/prisma'; // Prisma client

// Função para lidar com requisições GET
export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const page = parseInt(searchParams.get('page') || '1');
  const limit = parseInt(searchParams.get('limit') || '10');
  const skip = (page - 1) * limit;

  try {
    const posts = await prisma.posts.findMany({
      skip,
      take: limit,
      orderBy: {
        createdAt: 'desc',
      },
      include: {
        user: true,
      },
    });

    console.log(posts);

    return NextResponse.json(posts, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: 'Error fetching posts' }, { status: 500 });
  }
}

// Função para lidar com requisições POST
export async function POST(req: Request) {
  console.log('Handling POST request'); // Log para indicar o início do processamento do POST

  // Verifica a sessão (usuário autenticado)
  const session = await getServerSession(authOptions);
  if (!session) {
    console.error('No session found'); // Log se a sessão não for encontrada
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  console.log('Session:', session); // Log da sessão para garantir que está pegando o usuário corretamente

  try {
    const { type, content, image, video, reference } = await req.json();
    console.log('Request body:', { type, content, image, video, reference }); // Log do corpo da requisição

    // Validação do campo "type"
    if (!['IMAGE', 'VIDEO', 'CONTENT', 'IMAGE_CONTENT'].includes(type)) {
      console.error('Invalid post type:', type); // Log se o tipo for inválido
      return NextResponse.json({ message: 'Invalid type' }, { status: 400 });
    }

    // Valida as combinações de content, images e video
    if (type === 'VIDEO' && (image)) {
      console.error('Video posts cannot have content or images'); // Log para erro de validação
      return NextResponse.json({ message: 'Video posts cannot have content or images' }, { status: 400 });
    }

    if (type === 'IMAGE_CONTENT' && (!content || !image)) {
      console.error('Image and content are required for IMAGE_CONTENT type'); // Log para erro de validação
      return NextResponse.json({ message: 'Image and content are required for IMAGE_CONTENT type' }, { status: 400 });
    }

    if (type === 'IMAGE' && !image) {
      console.error('Images are required for IMAGE type'); // Log para erro de validação
      return NextResponse.json({ message: 'Images are required for IMAGE type' }, { status: 400 });
    }

    if (type === 'CONTENT' && !content) {
      console.error('Content is required for CONTENT type'); // Log para erro de validação
      return NextResponse.json({ message: 'Content is required for CONTENT type' }, { status: 400 });
    }

    // Insere o novo post no banco de dados usando Prisma
    // Primeiro, cria o novo post
const newPost = await prisma.posts.create({
  data: {
    type,
    userId: Number(session.user.id), // Supondo que o ID do usuário está na sessão
    content: content || null,
    images: image || null,
    video: video || null,
    likes: 0,
    reposts: 0,
    replys: 0,
    reference: reference || 0,
    views: 0,
  },
});

// Depois, atualiza o usuário para incrementar o número de posts
await prisma.cl_users.update({
  where: {
    id: Number(session.user.id), // Identifique o usuário que você quer atualizar
  },
  data: {
    posts: {
      increment: 1, // Incrementa o campo posts
    },
  },
});


    console.log('New post created:', newPost); // Log confirmando a criação do post

    return NextResponse.json(newPost, { status: 201 });
  } catch (error) {
    console.error('Error creating post:', error); // Log detalhado do erro
    return NextResponse.json({ message: 'Failed to create post', error }, { status: 500 });
  }
}

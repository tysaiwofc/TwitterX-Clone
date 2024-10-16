// src/app/api/posts/route.ts
import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma'; // Prisma client

async function incrementField(postId: number, field: string, has: boolean) {
  const operation = has ? 'decrement' : 'increment';
  const adjustment = has ? -1 : 1;

  try {
    await prisma.posts.update({
      where: {
        id: postId,
      },
      data: {
        [field]: {
          [operation]: 1, // Usa 1 para incrementar ou decrementar, pode ser ajustado
        },
      },
    });
    console.log(`Successfully ${operation === 'decrement' ? 'decremented' : 'incremented'} ${field} by ${Math.abs(adjustment)} for post with id: ${postId}`);
  } catch (error) {
    console.error(`Failed to ${operation} ${field} for post with id: ${postId}. Error:`, error);
    throw error; // Re-throw para que o erro possa ser tratado no chamador, se necessário.
  }
}

export async function PATCH(req: Request) {
  const body = await req.json();
  const { postId, field, userId } = body;

  if (!postId || !field) {
    return NextResponse.json({ error: 'postId e field são obrigatórios' }, { status: 400 });
  }

  const likeExists = await prisma.likeds.findFirst({
    where: {
      postId: Number(postId),
      userId: Number(userId),
    },
  });
  
  try {
    await incrementField(Number(postId), field, likeExists ? true : false);
    const uniqueType = likeExists ? true : false
    console.log('API RESPONSE', uniqueType)

    if(!likeExists) {
      await prisma.likeds.create({
        data: {
          postId,
          userId: Number(userId)
        }
      })
    } else {
      await prisma.likeds.delete({
        where: {id: likeExists.id }
      })
    }

    return NextResponse.json({ message: `Campo ${field} incrementado com sucesso.`, type: uniqueType }, { status: 200 });
  } catch (error) {
    console.error('Erro ao incrementar o campo:', error);
    return NextResponse.json({ error: 'Falha ao incrementar campo' }, { status: 500 });
  }
}

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

  try {
    const { type, content, image, video, reference, userId } = await req.json();
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
    userId: Number(userId), // Supondo que o ID do usuário está na sessão
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
    id: Number(userId), // Identifique o usuário que você quer atualizar
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

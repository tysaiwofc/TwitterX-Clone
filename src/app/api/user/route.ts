import prisma from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function GET(req: Request): Promise<NextResponse> {
  // Extrair os parâmetros da URL (query string)
  const { searchParams } = new URL(req.url);
  const userId = searchParams.get('userId');
  const username = searchParams.get('username');

  // Validar se pelo menos um dos parâmetros é fornecido
  if (!userId && !username) {
    return NextResponse.json({ error: 'Parâmetro userId ou username é necessário' }, { status: 400 });
  }

  try {
    // Configurar a condição de busca com base nos parâmetros fornecidos
    const userQuery = userId 
      ? { id: Number(userId) } 
      : { username }; // Busca pelo username caso userId não seja fornecido

    // Buscar os dados do usuário no Prisma
    const userData = await prisma.cl_users.findFirst({
      where: userQuery,
      include: {
        postFeed: true
      }
    });

    if (!userData) {
      return NextResponse.json({ error: 'Usuário não encontrado' }, { status: 404 });
    }

    // Retornar os dados do usuário como JSON
    return NextResponse.json(userData);
  } catch (error) {
    console.error('Erro ao buscar usuário:', error);
    return NextResponse.json({ error: 'Erro ao buscar usuário' }, { status: 500 });
  }
}

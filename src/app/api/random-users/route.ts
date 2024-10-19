import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma'; // ajuste o caminho para onde o Prisma está configurado

export async function GET(): Promise<NextResponse> {
  try {
    const users = await prisma.cl_users.findMany({
      take: 5,
    });

    return NextResponse.json(users); // Retorna os dados em JSON
  } catch (error) {
    console.error('Erro ao buscar usuários:', error);
    return NextResponse.json({ error: 'Erro ao buscar usuários' }, { status: 500 });
  }
}

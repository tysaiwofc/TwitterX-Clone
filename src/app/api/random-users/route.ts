import { NextResponse } from 'next/server';

export async function GET(): Promise<NextResponse> {
  try {
    const users = [{
        fname: "John",
        lname: "Doe",
        username: "johndoe",
        avatar: "/images/default.jpg"
    }]
    return NextResponse.json(users);
  } catch (error) {
    console.error('Erro ao buscar usuários:', error);
    return NextResponse.json({ error: 'Erro ao buscar usuários' }, { status: 500 });
  }
}


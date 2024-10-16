// src/app/api/register/route.ts

import { NextResponse } from "next/server";
import prisma from "@/lib/prisma"; // Ajuste o caminho para o seu cliente Prisma
import countryCodeToNumber from  "@/app/api/register/CountryIDNumber"
import bcrypt from 'bcrypt'
const DEFAULT_COUNTRY_ID = 1; 




export async function POST(req: Request) {
  // Obter o corpo da requisição
  const { email, password, fname, lname, username } = await req.json();

  // Obter o IP do usuário
  const ip = req.headers.get("x-forwarded-for") || req.headers.get("host") || "unknown";


  let countryID = DEFAULT_COUNTRY_ID;


  try {
    const existingUser = await prisma.cl_users.findFirst({
      where: {
        OR: [
          { email: email },
          { username: username },
          { ip_address: ip}
        ],
      },
    });

    if (existingUser) {
      return NextResponse.json({ message: "User with this email or username already exists." }, { status: 409 });
    }

     if (ip && ip !== "unknown") {
      // Usar uma API para obter o CountryID
      const response = await fetch(`http://ip-api.com/json/${ip}`).catch(() => {});

      // Se a resposta estiver ok e retornar um país
      if (response) {
        const countryCode = (await response.json()).countryCode; // Obtenha o código do país
        countryID = countryCodeToNumber[countryCode] || DEFAULT_COUNTRY_ID;
      }
        
    }

    const hashedPassword = await bcrypt.hash(password, 10); // O segundo parâmetro é o salt rounds


    const newUser = await prisma.cl_users.create({
      data: {
        email,
        password: hashedPassword,
        fname,
        lname,
        ip_address: ip,
        country_id: countryID,
        username,
        avatar: "/images/default.jpg",
        cover: "/images/echo.png", // Tentando descobrir por que isso aqui está dando erro no typescript, mas continua funcionando.
      },
    });

    return NextResponse.json({ message: "User created successfully", user: newUser }, { status: 201 });
  } catch (error: any) {
    console.log(error.message)
    return NextResponse.json({ message: "Failed to register", error: error.message }, { status: 500 });
  }
}

// Para métodos não permitidos
export async function OPTIONS() {
  return NextResponse.json({ message: "Method Not Allowed" }, { status: 405 });
}

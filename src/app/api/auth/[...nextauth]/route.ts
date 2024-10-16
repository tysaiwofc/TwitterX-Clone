import { PrismaAdapter } from "@next-auth/prisma-adapter";
import NextAuth, { AuthOptions, User } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '@/lib/prisma';
import bcrypt from 'bcrypt';

export const authOptions: AuthOptions = {
  secret: process.env.SECRET,
  adapter: PrismaAdapter(prisma),
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials) {
          throw new Error("Missing credentials");
        }

        const user = await prisma.cl_users.findFirst({
          where: { email: credentials.email },
          include: {
            postFeed: true, // Inclui as postagens do usuário
            sessions: true,  // Inclui as sessões do usuário
          },
        });

        if (user) {
          const isPasswordValid = await bcrypt.compare(credentials.password, user.password || "");
          if (isPasswordValid) {
            const { password, id, ...userWithoutPassword } = user;
            return { ...userWithoutPassword, id: id.toString() } as User;
          } else {
            throw new Error('Invalid password.');
          }
        } else {
          throw new Error('User does not exist.');
        }
      }
    })
  ],
  pages: {
    signIn: '/login',
    error: '/auth/error',
  },
  jwt: {
    secret: process.env.SECRET,
  },
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60,
  },
  callbacks: {
    async redirect({ url, baseUrl }) {
      return baseUrl;
    },
    async jwt({ token, user }) {
      if (user) {
        token.user = user ; // Adiciona o usuário ao token
      }
      return token;
    },
    async session({ session, token }) {
      if (token?.user) {
        session.user = token.user as User;

      }
      return session;
    }
  }
};

// Adicione os métodos HTTP
export async function POST(req: NextApiRequest, res: NextApiResponse) {
  return await NextAuth(req, res, authOptions);
}

export async function GET(req: NextApiRequest, res: NextApiResponse) {
  return await NextAuth(req, res, authOptions);
}

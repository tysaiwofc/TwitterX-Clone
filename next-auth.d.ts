// next-auth.d.ts
import NextAuth from "next-auth";

declare module "next-auth" {
  interface Post {
    id: number;                 // ID da postagem
    type: string;               // Tipo da postagem
    userId: number;             // ID do usuário que criou a postagem
    likes: number;              // Número de likes
    reposts: number;            // Número de reposts
    replys: number;             // Número de respostas
    reference: number;          // ID da postagem de referência
    views: number;              // Número de visualizações
    content?: string | null;    // Conteúdo da postagem (opcional)
    images?: string | null;     // URLs das imagens (opcional)
    video?: string | null;      // URL do vídeo (opcional)
    createdAt?: Date;           // Data de criação (opcional)
    updatedAt?: Date;           // Data de atualização (opcional)
  }

  interface User {
    id: string;                  // ID do usuário
    username: string;            // Nome de usuário
    fname: string;               // Primeiro nome
    lname: string;               // Sobrenome
    about?: string | null;       // Sobre o usuário
    gender?: string | null;      // Gênero
    email: string;               // Email do usuário
    phone?: string | null;       // Telefone
    joined?: number | null;      // Data de entrada
    ip_address?: string | null;  // Endereço IP
    language?: string | null;    // Linguagem preferida
    avatar?: string | null;      // URL do avatar
    verified?: number | null;    // Verificação
    admin?: number | null;       // Nível de administrador
    posts?: number | null;       // Número de posts
    followers?: number | null;    // Número de seguidores
    following?: number | null;    // Número de seguidos
    website?: string | null;     // Website do usuário
    country_id?: number | null;  // ID do país
    city?: string | null;        // Cidade
    last_post?: bigint | null;   // Último post
    profile_privacy?: string | null; // Privacidade do perfil
    follow_privacy?: string | null;  // Privacidade de seguir
    contact_privacy?: string | null; // Privacidade de contato
    wallet?: number | null;      // Wallet
    refresh_token?: string | null; // Token de atualização
    settings?: string | null;    // Configurações
    display_settings?: string | null; // Configurações de exibição
    is_premium?: number | null;  // Se é premium
    premium_settings?: string | null; // Configurações premium
    premium_ex_date?: bigint | null; // Data de expiração premium
    web_device_id?: string | null; // ID do dispositivo web
    cont_monetization?: string | null; // Monetização
    subscription_price?: string | null; // Preço da assinatura
    feed?: string | null;        // Feed
    cover?: string | null;
    is_online?: string | null;   // Status online
    postFeed?: Post[];          // Array de postagens do usuário
    sessions?: any[];           // Array de sessões do usuário
  }

  interface Session {
    user: User;  // Certifique-se de que a propriedade user contém o tipo User personalizado
  }

  interface JWT {
    user: User;  // Atributos do usuário no JWT
    postFeed?: Post[]; // Array de postagens do usuário
    sessions?: any[]; // Array de sessões do usuário
  }
}

// next.config.js

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['localhost'], // Add other domains as needed
  },
  async rewrites() {
    return [
      {
        source: '/api/upload', // O caminho que você usará no seu código
        destination: 'http://localhost:80/upload', // O destino da sua API
      },
    ];
  },
}

export default nextConfig;

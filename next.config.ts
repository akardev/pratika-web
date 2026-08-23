import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
  async redirects() {
    return [
      {
        source: '/arac/sosyal-medya-gorsel-boyutlari',
        destination: '/arac/sosyal-medya-gorsel-boyutlandirici',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;

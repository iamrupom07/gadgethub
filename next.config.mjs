/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "img.garagepotti.xyz",
        port: "",
        pathname: "/upload/0000126/**",
        search: "",
      },
      {
        protocol: "http",
        hostname: "img.garagepotti.xyz",
        port: "",
        pathname: "/upload/0000126/**",
        search: "",
      },
      {
        protocol: "https",
        hostname: "ecommerce-saas-server-wine.vercel.app",
      },
    ],
  },
};

export default nextConfig;

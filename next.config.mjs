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
    ],
  },
};

export default nextConfig;

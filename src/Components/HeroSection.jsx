import Image from "next/image";
import React from "react";

async function getBanners() {
  try {
    const res = await fetch(
      "https://ecommerce-saas-server-wine.vercel.app/api/v1/banner/website?status=active&sort=position",
      {
        headers: {
          "store-id": "0000126",
        },
        cache: "no-store",
      },
    );
    const json = await res.json();
    return json?.data?.data || [];
  } catch (error) {
    console.error("Banner fetch failed:", error);
    return [];
  }
}

const HeroSection = async () => {
  const banners = await getBanners();

  // Separate banners by type
  const mainBanner = banners.find((b) => b.type === "main");
  const sideBanners = banners.filter((b) => b.type === "side").slice(0, 2);

  return (
    <div className="grid grid-cols-3 max-lg:grid-cols-2 gap-3 max-w-7xl mx-auto px-4 pt-6 justify-center items-center">
      <div className="w-full rounded-2xl col-span-2 overflow-hidden shadow-sm">
        {mainBanner ? (
          <Image
            src={mainBanner.image}
            alt={mainBanner.title}
            width={1600}
            height={800}
            className="rounded-2xl object-cover w-full h-auto hover:scale-[1.01] transition-transform duration-500"
            priority
          />
        ) : (
          <div className="bg-gray-200 aspect-[16/8] rounded-2xl animate-pulse" />
        )}
      </div>

      <div className="flex flex-col gap-2 col-span-1 max-lg:flex-row justify-center max-lg:col-span-2">
        {sideBanners.map((banner) => (
          <div
            key={banner._id}
            className="w-full rounded-2xl overflow-hidden shadow-sm"
          >
            <Image
              src={banner.image}
              alt={banner.title}
              width={700}
              height={400}
              className="rounded-2xl object-cover w-full h-auto hover:brightness-90 transition-all duration-300"
            />
          </div>
        ))}

        {sideBanners.length === 0 && (
          <div className="bg-gray-100 w-full h-40 rounded-2xl flex items-center justify-center text-gray-400">
            No side banners active
          </div>
        )}
      </div>
    </div>
  );
};

export default HeroSection;

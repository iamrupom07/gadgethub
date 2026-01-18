import Image from "next/image";
import React from "react";

const HeroSection = () => {
  return (
    <div className="grid grid-cols-3 max-lg:grid-cols-2 gap-3 max-w-7xl mx-auto px-4 justify-center items-center">
      <div className="w-full rounded-2xl col-span-2">
        <Image
          src="https://img.garagepotti.xyz/upload/0000126/cropped-image_51f84d4c.webp"
          alt="hero"
          width={1600}
          height={800}
          className="rounded-2xl "
        />
      </div>
      <div className="flex flex-col gap-2 col-span-1 max-lg:flex-row justify-center max-lg:col-span-2">
        <div className="">
          <Image
            src="https://img.garagepotti.xyz/upload/0000126/cropped-image_e5761622.png"
            alt="hero"
            width={700}
            height={400}
            className="rounded-2xl flex-1"
          />
        </div>
        <div className="">
          {" "}
          <Image
            src="https://img.garagepotti.xyz/upload/0000126/cropped-image_e5761622.png"
            alt="hero"
            width={700}
            height={400}
            className="rounded-2xl flex-1"
          />
        </div>
      </div>
    </div>
  );
};

export default HeroSection;

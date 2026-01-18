import Image from "next/image";
import React from "react";

const Logo = () => {
  return (
    <div>
      <Image
        src="https://img.garagepotti.xyz/upload/0000126/gemini-3-pro-image-preview-2k__nano-banana-pro__b_create_a_logo_for_my-removebg-preview_517e8301.png"
        alt="GadgetHub Logo"
        width={100}
        height={30}
        className="w-36"
      />
    </div>
  );
};

export default Logo;

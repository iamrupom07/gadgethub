import Category from "@/Components/Category";
import HeroSection from "@/Components/HeroSection";
import Card from "@/shared/Card";
import Image from "next/image";

export default function Home() {
  return (
    <div className="bg-blue-50">
      <div className="mx-auto max-w-7xl">
        <div className="py-6">
          <HeroSection />
        </div>
        <div className="py-6">
          <Category></Category>
        </div>
        <div>
          <p className="my-6 text-2xl font-semibold">New Arrivals</p>
          <Card />
        </div>
        <div>
          <p className="my-6 text-2xl font-semibold">Just For You</p>
          <Card />
        </div>
      </div>
    </div>
  );
}

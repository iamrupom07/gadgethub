import { notFound } from "next/navigation";
import Image from "next/image";
import ProductGallery from "./ProductGallery";
import ProductInfo from "./ProductInfo";
import ProductTabs from "./ProductTabs";
import RelatedProducts from "./RelatedProducts";

async function getProducts() {
  const res = await fetch("http://localhost:3000/products.json");

  if (!res.ok) return [];
  return res.json();
}

export default async function ProductPage({ params }) {
  const { id } = await params;
  const products = await getProducts();

  const product = products.find((p) => p.id === Number(id));

  if (!product) {
    notFound();
  }

  return (
    <main className="max-w-7xl mx-auto p-6">
      <div className="max-w-7xl mx-auto px-4 py-10 space-y-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 bg-base-100 p-6 rounded-xl shadow">
          <ProductGallery images={product.gallery} />
          <ProductInfo product={product} />
        </div>

        <ProductTabs product={product} />

        <RelatedProducts
          products={products}
          category={product.category}
          currentId={product.id}
        />
      </div>
    </main>
  );
}

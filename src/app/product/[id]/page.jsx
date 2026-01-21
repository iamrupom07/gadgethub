import { notFound } from "next/navigation";
import ProductGallery from "./ProductGallery";
import ProductInfo from "./ProductInfo";
import ProductTabs from "./ProductTabs";
import RelatedProducts from "./RelatedProducts";

async function getProduct(id) {
  const res = await fetch(
    `https://ecommerce-saas-server-wine.vercel.app/api/v1/product/${id}`,
    {
      headers: { "store-id": "0000126" },
      cache: "no-store",
    },
  );
  if (!res.ok) return null;
  const json = await res.json();
  return json.data;
}

async function getAllProducts() {
  const res = await fetch(
    "https://ecommerce-saas-server-wine.vercel.app/api/v1/product/website",
    {
      headers: { "store-id": "0000126" },
      next: { revalidate: 3600 },
    },
  );
  if (!res.ok) return [];
  const json = await res.json();
  return json?.data?.data || [];
}

export default async function ProductPage(props) {
  const params = await props.params;
  const product = await getProduct(params.id);

  if (!product) notFound();

  const allProducts = await getAllProducts();
  const currentCategory = product.category?.[0];

  const relatedItems = allProducts.filter(
    (item) =>
      item.category?.includes(currentCategory) && item._id !== product._id,
  );

  return (
    <main className="max-w-7xl mx-auto px-4 py-10 space-y-10">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 bg-base-100 p-6 rounded-xl shadow">
        <ProductGallery images={product.imageURLs || []} />
        <ProductInfo product={product} />
      </div>

      <ProductTabs product={product} />

      <RelatedProducts
        products={relatedItems.slice(0, 4)}
        currentId={product._id}
      />
    </main>
  );
}

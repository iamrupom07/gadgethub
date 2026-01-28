// page.js (Server Component)
import FilterSection from "./FilterSection";

async function getProducts(page = 1) {
  const limit = 8;
  const res = await fetch(
    `https://ecommerce-saas-server-wine.vercel.app/api/v1/product/website?page=${page}&limit=${limit}`,
    {
      headers: { "store-id": "0000126" },
      next: { revalidate: 60 },
    },
  );
  if (!res.ok) return { products: [], meta: { total: 0, totalPage: 1 } };

  const json = await res.json();
  return {
    products: json?.data?.data || [],
    meta: json?.data?.meta || { total: 0, totalPage: 1 },
  };
}

export default async function Page({ searchParams }) {
  const params = await searchParams;
  const currentPage = Number(params.page) || 1;

  const { products, meta } = await getProducts(currentPage);

  return (
    <div className="bg-blue-50 min-h-screen">
      <div className="max-w-7xl mx-auto p-4">
        <FilterSection
          initialProducts={products}
          totalPages={products.length}
          totalItems={meta.total}
          currentPage={currentPage}
        />
      </div>
    </div>
  );
}

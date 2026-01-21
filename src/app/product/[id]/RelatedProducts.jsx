import Image from "next/image";
import Link from "next/link";

export default function RelatedProducts({ products = [], currentId }) {
  const filtered = products.filter(
    (p) => p._id && p._id.toString() !== currentId?.toString(),
  );

  if (filtered.length === 0) return null;

  return (
    <section className="mt-10">
      <h2 className="text-2xl font-bold mb-6">Related Products</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {filtered.slice(0, 4).map((p) => (
          <div
            key={p._id}
            className="card bg-base-100 shadow border border-base-200 overflow-hidden"
          >
            <figure className="relative h-48 w-full bg-gray-50 p-4">
              <Image
                src={p.imageURLs?.[0] || "/placeholder.png"}
                alt={p.name}
                fill
                className="object-contain"
              />
            </figure>
            <div className="p-4">
              <h3 className="font-semibold text-sm line-clamp-2 h-10">
                {p.name}
              </h3>
              <p className="text-primary font-bold mt-2">
                {p.salePrice || p.productPrice} BDT
              </p>
              <Link
                href={`/product/${p._id}`}
                className="btn btn-sm btn-outline btn-primary mt-4 w-full"
              >
                View Details
              </Link>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

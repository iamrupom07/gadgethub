import Link from "next/link";

export default function RelatedProducts({ products, category, currentId }) {
  const related = products.filter(
    (p) => p.category === category && p.id !== currentId
  );

  if (!related.length) return null;

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Related Products</h2>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {related.map((p) => (
          <div key={p.id} className="card bg-base-100 shadow">
            <figure>
              <img src={p.thumbnail} alt={p.title} />
            </figure>
            <div className="card-body p-4">
              <h3 className="font-semibold text-sm line-clamp-2">{p.title}</h3>
              <p className="text-primary font-bold">
                {p.currency} {p.price}
              </p>
              <Link
                href={`/products/${p.id}`}
                className="btn btn-sm btn-outline mt-2"
              >
                View
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

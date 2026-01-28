"use client";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { useState, useMemo } from "react";
import FilteredCard from "@/shared/FilteredCard";

export default function FilterSection({
  initialProducts,
  totalPages,
  currentPage,
}) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [selectedCategories, setSelectedCategories] = useState([]);
  const [priceRange, setPriceRange] = useState({ min: "", max: "" });
  const [sortOption, setSortOption] = useState("default");

  const goToPage = (pageNumber) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", pageNumber);
    router.push(`${pathname}?${params.toString()}`);
  };

  const uniqueCategories = useMemo(() => {
    const allCats = initialProducts.flatMap((p) => p.category || []);
    return [...new Set(allCats)].filter(Boolean);
  }, [initialProducts]);

  const filteredProducts = useMemo(() => {
    let result = [...initialProducts].filter((p) => {
      const matchesCategory =
        selectedCategories.length === 0 ||
        p.category?.some((cat) => selectedCategories.includes(cat));

      const currentPrice = p.salePrice || p.productPrice;
      const matchesPrice =
        (!priceRange.min || currentPrice >= Number(priceRange.min)) &&
        (!priceRange.max || currentPrice <= Number(priceRange.max));

      return matchesCategory && matchesPrice;
    });

    if (sortOption === "price-low") {
      result.sort(
        (a, b) =>
          (a.salePrice || a.productPrice) - (b.salePrice || b.productPrice),
      );
    } else if (sortOption === "price-high") {
      result.sort(
        (a, b) =>
          (b.salePrice || b.productPrice) - (a.salePrice || a.productPrice),
      );
    }
    return result;
  }, [initialProducts, selectedCategories, priceRange, sortOption]);

  const toggleCategory = (cat) => {
    setSelectedCategories((prev) =>
      prev.includes(cat) ? prev.filter((c) => c !== cat) : [...prev, cat],
    );
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
      <aside className="col-span-1 space-y-4">
        <div className="card bg-white shadow-sm p-5 rounded-xl border border-blue-100">
          <h2 className="font-bold text-lg mb-4">Price Range</h2>
          <div className="flex gap-2">
            <input
              type="number"
              placeholder="Min"
              className="input input-bordered input-sm w-full"
              value={priceRange.min}
              onChange={(e) =>
                setPriceRange({ ...priceRange, min: e.target.value })
              }
            />
            <input
              type="number"
              placeholder="Max"
              className="input input-bordered input-sm w-full"
              value={priceRange.max}
              onChange={(e) =>
                setPriceRange({ ...priceRange, max: e.target.value })
              }
            />
          </div>
        </div>

        <div className="card bg-white shadow-sm p-5 rounded-xl border border-blue-100">
          <h2 className="font-bold text-lg mb-4">Categories</h2>
          <div className="space-y-2 max-h-60 overflow-y-auto">
            {uniqueCategories.map((cat) => (
              <label
                key={cat}
                className="flex items-center gap-2 cursor-pointer"
              >
                <input
                  type="checkbox"
                  className="checkbox checkbox-primary checkbox-xs"
                  checked={selectedCategories.includes(cat)}
                  onChange={() => toggleCategory(cat)}
                />
                <span className="text-sm">{cat}</span>
              </label>
            ))}
          </div>
        </div>
      </aside>

      <div className="col-span-3">
        <div className="flex justify-between items-center p-4 bg-white mb-6 rounded-xl border border-blue-100">
          <p className="text-gray-500">
            Showing {filteredProducts.length} items
          </p>
          <select
            className="select select-bordered select-sm"
            value={sortOption}
            onChange={(e) => setSortOption(e.target.value)}
          >
            <option value="default">Sort By</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
          </select>
        </div>

        <FilteredCard products={filteredProducts} />

        <div className="flex justify-center items-center gap-4 mt-12 mb-10">
          <div className="join border border-blue-100 shadow-sm bg-white">
            <button
              className="join-item btn btn-outline btn-primary px-6"
              disabled={currentPage <= 1}
              onClick={() => goToPage(currentPage - 1)}
            >
              « Previous
            </button>

            <button className="join-item btn btn-primary no-animation px-8 pointer-events-none">
              Page {currentPage} of {totalPages}
            </button>

            <button
              className="join-item btn btn-outline btn-primary px-6"
              disabled={currentPage >= totalPages}
              onClick={() => goToPage(currentPage + 1)}
            >
              Next »
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

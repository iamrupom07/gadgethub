"use client";
import Card from "@/shared/Card";
import FilteredCard from "@/shared/FilteredCard";
import { useEffect, useState, useMemo } from "react";

const Page = () => {
  const [products, setProducts] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [priceRange, setPriceRange] = useState({ min: "", max: "" });
  const [sortOption, setSortOption] = useState("default");

  useEffect(() => {
    const getProducts = async () => {
      try {
        const res = await fetch(
          "https://ecommerce-saas-server-wine.vercel.app/api/v1/product/website",
          {
            headers: {
              "Content-Type": "application/json",
              "store-id": "0000126",
            },
          },
        );
        const data = await res.json();
        setProducts(data?.data?.data || []);
      } catch (err) {
        console.error("Failed to load products:", err);
      }
    };
    getProducts();
  }, []);

  const uniqueCategories = useMemo(() => {
    const allCats = products.flatMap((p) => p.category || []);
    return [...new Set(allCats)];
  }, [products]);

  const filteredProducts = useMemo(() => {
    let result = products.filter((p) => {
      const matchesCategory =
        selectedCategories.length === 0 ||
        p.category?.some((cat) => selectedCategories.includes(cat));

      const currentPrice = p.salePrice || p.productPrice;
      const matchesPrice =
        (!priceRange.min || currentPrice >= Number(priceRange.min)) &&
        (!priceRange.max || currentPrice <= Number(priceRange.max));

      return matchesCategory && matchesPrice;
    });

    if (sortOption === "price") {
      result.sort(
        (a, b) =>
          (a.salePrice || a.productPrice) - (b.salePrice || b.productPrice),
      );
    } else if (sortOption === "rating") {
      result.sort((a, b) => (b.rating || 0) - (a.rating || 0));
    }

    return result;
  }, [products, selectedCategories, priceRange, sortOption]);

  const toggleCategory = (cat) => {
    setSelectedCategories((prev) =>
      prev.includes(cat) ? prev.filter((c) => c !== cat) : [...prev, cat],
    );
  };

  const clearFilters = () => {
    setSelectedCategories([]);
    setPriceRange({ min: "", max: "" });
  };

  return (
    <div className="bg-blue-50 min-h-screen">
      <div className="max-w-7xl mx-auto p-4 grid grid-cols-1 md:grid-cols-4 gap-6">
        {/* Sidebar */}
        <div className="col-span-1 space-y-4">
          <div className="card bg-white shadow-sm p-5 rounded-xl border border-blue-100">
            <h2 className="font-bold text-lg mb-4 text-gray-800">
              Filter by Price
            </h2>
            <div className="flex gap-2">
              <input
                type="number"
                placeholder="Min"
                value={priceRange.min}
                onChange={(e) =>
                  setPriceRange({ ...priceRange, min: e.target.value })
                }
                className="w-1/2 p-2 border rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
              />
              <input
                type="number"
                placeholder="Max"
                value={priceRange.max}
                onChange={(e) =>
                  setPriceRange({ ...priceRange, max: e.target.value })
                }
                className="w-1/2 p-2 border rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
              />
            </div>
          </div>

          <div className="card bg-white shadow-sm p-5 rounded-xl border border-blue-100">
            <h2 className="font-bold text-lg mb-4 text-gray-800">Categories</h2>
            <div className="space-y-3 max-h-60 overflow-y-auto pr-2 custom-scrollbar">
              {uniqueCategories.map((cat, index) => (
                <label
                  key={index}
                  className="flex items-center gap-3 cursor-pointer group"
                >
                  <input
                    type="checkbox"
                    className="checkbox checkbox-primary checkbox-sm"
                    checked={selectedCategories.includes(cat)}
                    onChange={() => toggleCategory(cat)}
                  />
                  <span className="text-gray-600 group-hover:text-blue-600 transition-colors">
                    {cat}
                  </span>
                </label>
              ))}
            </div>
            <button
              onClick={clearFilters}
              className="btn btn-ghost btn-sm mt-4 text-blue-500 hover:bg-blue-50"
            >
              Clear All Filters
            </button>
          </div>
        </div>

        <div className="col-span-3">
          <div className="flex flex-col sm:flex-row items-center justify-between p-4 bg-white mb-6 rounded-xl shadow-sm border border-blue-100 gap-4">
            <div className="text-gray-600">
              Found{" "}
              <span className="font-bold text-blue-600">
                {filteredProducts.length}
              </span>{" "}
              items
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-500 uppercase font-semibold">
                Sort By:
              </span>
              <select
                className="select select-bordered select-sm focus:outline-none"
                value={sortOption}
                onChange={(e) => setSortOption(e.target.value)}
              >
                <option value="default">Default</option>
                <option value="price">Lowest Price</option>
                <option value="rating">Highest Rating</option>
              </select>
            </div>
          </div>

          <FilteredCard products={filteredProducts} />
        </div>
      </div>
    </div>
  );
};

export default Page;

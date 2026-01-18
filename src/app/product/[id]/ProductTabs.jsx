"use client";
import { useState } from "react";

export default function ProductTabs({ product }) {
  const [tab, setTab] = useState("description");

  return (
    <div className="bg-base-100 p-6 rounded-xl shadow">
      <div className="tabs tabs-boxed">
        <button
          className={`tab ${tab === "description" && "tab-active"}`}
          onClick={() => setTab("description")}
        >
          Description
        </button>
        <button
          className={`tab ${tab === "features" && "tab-active"}`}
          onClick={() => setTab("features")}
        >
          Features
        </button>
        <button
          className={`tab ${tab === "specs" && "tab-active"}`}
          onClick={() => setTab("specs")}
        >
          Specifications
        </button>
      </div>

      <div className="mt-6 space-y-3">
        {tab === "description" && <p>{product.longDescription}</p>}

        {tab === "features" && (
          <ul className="list-disc pl-5">
            {product.features.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        )}

        {tab === "specs" && (
          <div className="overflow-x-auto">
            <table className="table table-zebra">
              <tbody>
                {Object.entries(product.specifications).map(([key, value]) => (
                  <tr key={key}>
                    <th>{key}</th>
                    <td>{value}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

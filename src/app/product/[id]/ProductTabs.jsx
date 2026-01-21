"use client";
import { useState } from "react";

export default function ProductTabs({ product }) {
  const [tab, setTab] = useState("description");

  return (
    <div className="bg-base-100 p-6 rounded-xl shadow">
      <div className="tabs tabs-boxed">
        <button
          className={`tab ${tab === "description" ? "tab-active" : ""}`}
          onClick={() => setTab("description")}
        >
          Description
        </button>

        <button
          className={`tab ${tab === "features" ? "tab-active" : ""}`}
          onClick={() => setTab("features")}
        >
          Features
        </button>

        <button
          className={`tab ${tab === "specs" ? "tab-active" : ""}`}
          onClick={() => setTab("specs")}
        >
          Specifications
        </button>
      </div>

      <div className="mt-6 space-y-4">
        {tab === "description" && (
          <div
            className="prose max-w-none text-gray-700"
            dangerouslySetInnerHTML={{
              __html: product.description || "<p>No description available.</p>",
            }}
          />
        )}
        {tab === "features" && (
          <ul className="list-disc pl-5 text-gray-700">
            {product.attributes &&
            Object.keys(product.attributes).length > 0 ? (
              Object.entries(product.attributes).map(([key, value]) => (
                <li key={key}>
                  <strong>{key}:</strong> {String(value)}
                </li>
              ))
            ) : (
              <p className="text-gray-400">No features available.</p>
            )}
          </ul>
        )}

        {tab === "specs" && (
          <div className="overflow-x-auto">
            {product.attributes &&
            Object.keys(product.attributes).length > 0 ? (
              <table className="table table-zebra">
                <tbody>
                  {Object.entries(product.attributes).map(([key, value]) => (
                    <tr key={key}>
                      <th className="capitalize">{key}</th>
                      <td>{String(value)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <p className="text-gray-400">No specifications available.</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

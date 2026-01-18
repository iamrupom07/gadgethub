import Card from "@/shared/Card";
import React from "react";

const page = () => {
  return (
    <div className="bg-blue-50">
      <div className="max-w-7xl mx-auto p-4 grid grid-cols-7 ">
        <div>
          <h1>Shop</h1>
        </div>
        <div className="col-span-6 max-lg:col-span-7">
          <div className="flex items-center justify-between p-4 bg-white my-4 rounded-xl">
            <div>Total item found {0}</div>
            <div className="">
              <span>Sort By: </span>
              <select className="btn">
                <option value="1">1</option>
                <option value="2">Sort By Price</option>
                <option value="3">Sort By Rating</option>
              </select>
            </div>
          </div>
          <div>
            <Card />
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;

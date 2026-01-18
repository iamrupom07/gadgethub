import React from "react";

const categories = [
  { name: "SmartWatch", path: "/" },
  { name: "Laptop", path: "/about" },
  { name: "Monitor", path: "/contact" },
];

const Navlink = [
  {
    name: "Home",
    path: "/",
  },
  {
    name: "All Products",
    path: "/shop",
  },
  {
    name: "About",
    path: "/about",
  },
  {
    name: "Contact",
    path: "/contact",
  },
];

const SubHeader = () => {
  return (
    <div className="max-w-7xl mx-auto hidden lg:block ">
      <div className="flex items-center gap-3 px-6">
        <div className="dropdown dropdown-center">
          <div
            tabIndex={0}
            role="button"
            className="bg-blue-500 font-medium text-white p-3 w-66 rounded-md m-1"
          >
            Browse Categories
          </div>
          <ul
            tabIndex="-1"
            className="dropdown-content menu bg-base-100 rounded-box z-1 w-66 p-2  shadow-sm"
          >
            {categories.map((category) => (
              <li key={category.name}>
                <a href={category.path}>{category.name}</a>
              </li>
            ))}
          </ul>
        </div>
        <div>
          {Navlink.map((link) => (
            <a key={link.name} href={link.path} className="m-2">
              {link.name}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SubHeader;

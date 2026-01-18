"use client";

import React from "react";
import Logo from "./Logo";
import SubHeader from "./SubHeader";
import Cart from "./Cart";

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

const Header = () => {
  return (
    <div className="">
      <div className="navbar  max-w-7xl mx-auto">
        <div className="navbar-start ">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {" "}
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />{" "}
              </svg>
            </div>
            <ul
              tabIndex="-1"
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
            >
              {Navlink.map((link) => (
                <li key={link.name}>
                  <a href={link.path}>{link.name}</a>
                </li>
              ))}
            </ul>
          </div>
          <a className="">
            <Logo />
          </a>
        </div>
        <div className="navbar-center hidden lg:flex ">
          <div className="join">
            <div>
              <label className="input validator join-item w-96">
                <input type="text" placeholder="Search Product" />
              </label>
              <div className="validator-hint hidden">
                Enter at least 1 characters
              </div>
            </div>
            <button className="btn  bg-blue-500 text-white ">
              <svg
                className="h-[1em] "
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
              >
                <g
                  strokeLinejoin="round"
                  strokeLinecap="round"
                  strokeWidth="2.5"
                  fill="none"
                  stroke="currentColor"
                >
                  <circle cx="11" cy="11" r="8"></circle>
                  <path d="m21 21-4.3-4.3"></path>
                </g>
              </svg>
            </button>
          </div>
        </div>
        <div className="navbar-end gap-5">
          <button
            className="block lg:hidden"
            onClick={() => document.getElementById("my_modal_3").showModal()}
          >
            <svg
              className="h-[1.2em] "
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
            >
              <g
                strokeLinejoin="round"
                strokeLinecap="round"
                strokeWidth="2.5"
                fill="none"
                stroke="currentColor"
              >
                <circle cx="11" cy="11" r="8"></circle>
                <path d="m21 21-4.3-4.3"></path>
              </g>
            </svg>
          </button>
          <dialog id="my_modal_3" className="modal h-screen ">
            <div className="modal-box ">
              <form method="dialog">
                <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
                  ✕
                </button>
              </form>
              <div className="join">
                <div>
                  <label className="input validator join-item w-96">
                    <input type="text" placeholder="Search Product" />
                  </label>
                  <div className="validator-hint hidden">
                    Enter at least 1 characters
                  </div>
                </div>
                <button className="btn  bg-blue-500 text-white ">
                  <svg
                    className="h-[1em] "
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                  >
                    <g
                      strokeLinejoin="round"
                      strokeLinecap="round"
                      strokeWidth="2.5"
                      fill="none"
                      stroke="currentColor"
                    >
                      <circle cx="11" cy="11" r="8"></circle>
                      <path d="m21 21-4.3-4.3"></path>
                    </g>
                  </svg>
                </button>
              </div>
            </div>
          </dialog>

          <Cart />

          <button className="">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="2.5"
              stroke="currentColor"
              className="size-[1.2em]"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
              />
            </svg>
          </button>
          <a className="btn">
            <svg
              className="h-[1em] "
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
            >
              <g
                strokeLinejoin="round"
                strokeLinecap="round"
                strokeWidth="2.5"
                fill="none"
                stroke="currentColor"
              >
                <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path>
                <circle cx="12" cy="7" r="4"></circle>
              </g>
            </svg>
            Login
          </a>
        </div>
      </div>

      <div className="py-0 lg:py-2 lg:border-y-[1px] border-gray-300">
        <SubHeader />
      </div>
    </div>
  );
};

export default Header;

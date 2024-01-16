import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import logo from "../../../public/logo-3.svg";

const Header = () => {
  const [showSearch, setShowSearch] = useState(false);
  const toggleSearchShow = () => {
    setShowSearch((showSearch) => !showSearch);
  };
  const activeClassName = `text-blue-500`;
  return (
    <header className="bg-white text-black">
      <div className="flex items-center justify-between p-3 max-w-[80%] m-auto">
        <Link to="/">
          <img src={logo} alt="logo" />
        </Link>
        <nav>
          <ul className="flex items-center gap-3">
            <li>
              <NavLink
                className={({ isActive }) =>
                  isActive
                    ? activeClassName
                    : "text-black font-medium  hover:text-blue-500"
                }
                to="/"
              >
                Home
              </NavLink>
            </li>
            <li>
              <NavLink
                className={({ isActive }) =>
                  isActive
                    ? activeClassName
                    : "text-black font-medium  hover:text-blue-500"
                }
                to="/contact"
              >
                Contact
              </NavLink>
            </li>
            <li>
              <NavLink className={({ isActive }) => isActive?activeClassName:"text-black font-medium  hover:text-blue-500"}
              to="/login">Login</NavLink>
            </li>
            <li>
              <NavLink
                className={({ isActive }) =>
                  isActive
                    ? activeClassName
                    : "text-black font-medium  hover:text-blue-500"
                }
                to="/register"
              >
                Register
              </NavLink>
            </li>
            <li>
              <NavLink
                className={({ isActive }) =>
                  isActive
                    ? activeClassName
                    : "text-black font-medium  hover:text-blue-500"
                }
                to="/orders"
              >
                My orders
              </NavLink>
            </li>
          </ul>
        </nav>
        <div className="flex items-center gap-3">
          <div className="relative search">
            <button onClick={toggleSearchShow}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="19"
                height="19"
                fill="#333"
                className="bi bi-search"
                viewBox="0 0 16 16"
              >
                <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0" />
              </svg>
            </button>
            <div
              className={
                showSearch
                  ? `flex absolute bg-[#eee]  transition-all duration-1000 opacity-1 visible z-10
              text-sm h-[40px] items-center px-4 w-[400px] justify-between  left-[-130px] bottom-[-4px] rounded-md`
                  : `opacity-0 hidden transition-all duration-1000`
              }
            >
              <form className="w-[100%]">
                <input
                  placeholder="Axtar"
                  className="bg-transparent outline-none border-none w-[95%] text-xs"
                />
              </form>
              <span
                className="cursor-pointer hover:opacity-[0.7]"
                onClick={toggleSearchShow}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  fill="currentColor"
                  className="bi bi-x"
                  viewBox="0 0 16 16"
                >
                  <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708" />
                </svg>
              </span>
            </div>
          </div>
          <div className="cart relative ">
            <span
              className="absolute left-[10px] text-xs bg-blue-700 text-white rounded-full w-4 h-4 
          flex items-center justify-center top-[-10px]"
            >
              0
            </span>
            <button>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="19"
                height="19"
                fill="#333"
                className="bi bi-cart"
                viewBox="0 0 16 16"
              >
                <path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5M3.102 4l1.313 7h8.17l1.313-7zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4m7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4m-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2m7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2" />
              </svg>
            </button>
          </div>
          <div className="wishlist relative">
            <span
              className="absolute left-[10px] text-xs bg-blue-700 text-white rounded-full w-4 h-4 
          flex items-center justify-center top-[-10px]"
            >
              0
            </span>
            <button>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="19"
                height="19"
                fill="#333"
                className="bi bi-heart"
                viewBox="0 0 16 16"
              >
                <path d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143q.09.083.176.171a3 3 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15" />
              </svg>
            </button>
          </div>
        </div>
        <div className="flex items-center gap-4"></div>
      </div>
    </header>
  );
};

export default Header;

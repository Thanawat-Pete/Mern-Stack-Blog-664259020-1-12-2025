import React from "react";
import { Link } from "react-router";

const Navbar = () => {
  return (
    <nav
      className="
        sticky top-0 z-50 
        bg-white/70 dark:bg-gray-900/70 
        backdrop-blur-xl 
        border-b border-gray-200 dark:border-gray-700 
        shadow-sm
      "
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">

          {/* ===== Logo ===== */}
          <Link
            to="/"
            className="
              text-2xl font-bold tracking-tight 
              text-gray-900 dark:text-gray-100
              hover:text-blue-600 dark:hover:text-blue-400
              transition-colors
            "
          >
            SE NPRU <span className="text-blue-600 dark:text-blue-400">Blog</span>
          </Link>

          {/* ===== Desktop Menu ===== */}
          <div className="hidden lg:flex items-center space-x-4">

            {/* Log In = ปุ่มขอบ */}
            <Link
              to="/login"
              className="
                px-4 py-2 rounded-lg font-medium
                border border-blue-500 dark:border-blue-400
                text-blue-600 dark:text-blue-400
                hover:bg-blue-50 dark:hover:bg-blue-900/30
                transition-all
              "
            >
              Log In
            </Link>

            {/* Register = ปุ่มทึบ */}
            <Link
              to="/register"
              className="
                px-4 py-2 rounded-lg font-medium
                bg-blue-600 dark:bg-blue-500
                text-white 
                hover:bg-blue-700 dark:hover:bg-blue-600
                transition-all
              "
            >
              Register
            </Link>
          </div>

          {/* ===== Mobile Menu Button ===== */}
          <div className="lg:hidden dropdown dropdown-end">
            <button
              tabIndex={0}
              className="
                btn btn-ghost btn-circle 
                hover:bg-gray-100 dark:hover:bg-gray-800 transition
              "
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-gray-700 dark:text-gray-200"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>

            {/* mobile dropdown */}
            <ul
              tabIndex={0}
              className="
                menu menu-sm dropdown-content 
                mt-3 right-0 w-52 
                rounded-xl 
                bg-white/90 dark:bg-gray-800/90 
                border border-gray-200 dark:border-gray-700 
                shadow-xl backdrop-blur-xl p-2
              "
            >
              <li>
                <Link
                  to="/login"
                  className="
                    px-3 py-2 border border-blue-500 dark:border-blue-400
                    text-blue-600 dark:text-blue-400 rounded-lg
                    hover:bg-blue-50 dark:hover:bg-blue-900/30 transition
                  "
                >
                  Log In
                </Link>
              </li>

              <li className="mt-2">
                <Link
                  to="/register"
                  className="
                    px-3 py-2 bg-blue-600 dark:bg-blue-500 text-white 
                    rounded-lg hover:bg-blue-700 dark:hover:bg-blue-600 transition
                  "
                >
                  Register
                </Link>
              </li>
            </ul>

          </div>

        </div>
      </div>
    </nav>
  );
};

export default Navbar;

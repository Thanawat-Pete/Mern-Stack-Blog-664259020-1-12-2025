import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../contexts/UserContext";
import authenticationService from "../services/authentication.services";
import Swal from "sweetalert2";

const Navbar = () => {
  const { userInfo, setUserinfo } = useContext(UserContext);
  const navigate = useNavigate();

  // ✅ เช็กสถานะ login จาก token
  const isLoggedIn = !!userInfo?.accessToken;

  // ✅ ใช้ field ให้ตรงกับที่ set ตอน login
  const username = userInfo?.username || "";
  const firstLetter = username ? username.charAt(0).toUpperCase() : "";

  const handleLogout = async () => {
    const result = await Swal.fire({
      icon: "warning",
      title: "ยืนยันการออกจากระบบ?",
      text: "คุณต้องการออกจากระบบใช่หรือไม่",
      showCancelButton: true,
      confirmButtonColor: "#2563eb",
      cancelButtonColor: "#ef4444",
      confirmButtonText: "Logout",
      cancelButtonText: "Cancel",
    });

    if (result.isConfirmed) {
      authenticationService.logout();
      setUserinfo({}); // ✅ เคลียร์ context

      await Swal.fire({
        icon: "success",
        title: "Logout success!",
        text: "คุณออกจากระบบเรียบร้อยแล้ว",
        timer: 1500,
        showConfirmButton: true,
      });

      navigate("/login");
    }
  };

  return (
    <nav className="sticky top-0 z-50 bg-white/70 dark:bg-gray-900/70 backdrop-blur-xl border-b border-gray-200 dark:border-gray-700 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">

          {/* ===== Logo ===== */}
          <Link
            to="/"
            className="text-2xl font-bold tracking-tight text-gray-900 dark:text-gray-100 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
          >
            SE NPRU <span className="text-blue-600 dark:text-blue-400">Blog</span>
          </Link>

          {/* ===== Desktop ===== */}
          <div className="hidden lg:flex items-center space-x-4">
            {!isLoggedIn ? (
              <>
                <Link
                  to="/login"
                  className="px-4 py-2 rounded-lg font-medium border border-blue-500 dark:border-blue-400 text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/30 transition-all"
                >
                  Log In
                </Link>
                <Link
                  to="/register"
                  className="px-4 py-2 rounded-lg font-medium bg-blue-600 dark:bg-blue-500 text-white hover:bg-blue-700 dark:hover:bg-blue-600 transition-all"
                >
                  Register
                </Link>
              </>
            ) : (
              <>
                <Link
                  to="/create-article"
                  className="px-4 py-2 rounded-lg font-medium bg-blue-600 dark:bg-blue-500 text-white hover:bg-blue-700 dark:hover:bg-blue-600 transition-all"
                >
                  Create Article
                </Link>

                <div className="flex items-center space-x-2 px-3 py-1.5 rounded-xl bg-blue-50 dark:bg-blue-900/30 border border-blue-200 dark:border-blue-700">
                  <div className="w-9 h-9 rounded-full bg-blue-600 dark:bg-blue-500 text-white flex items-center justify-center font-semibold">
                    {firstLetter}
                  </div>
                  <span className="text-gray-800 dark:text-gray-200 font-medium">
                    {username}
                  </span>
                </div>

                <button
                  onClick={handleLogout}
                  className="px-4 py-2 rounded-lg font-medium border border-red-500 dark:border-red-400 text-red-500 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/30 transition-all"
                >
                  Logout
                </button>
              </>
            )}
          </div>

          {/* ===== Mobile ===== */}
          <div className="lg:hidden dropdown dropdown-end">
            <button
              tabIndex={0}
              className="btn btn-ghost btn-circle hover:bg-gray-100 dark:hover:bg-gray-800 transition"
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

            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 right-0 w-56 rounded-xl bg-white/90 dark:bg-gray-800/90 border border-gray-200 dark:border-gray-700 shadow-xl backdrop-blur-xl p-2"
            >
              {!isLoggedIn ? (
                <>
                  <li><Link to="/login">Log In</Link></li>
                  <li><Link to="/register">Register</Link></li>
                </>
              ) : (
                <>
                  <li className="flex items-center gap-2 px-3 py-2">
                    <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center font-semibold">
                      {firstLetter}
                    </div>
                    <span className="font-medium">{username}</span>
                  </li>
                  <li><Link to="/create-article">Create Article</Link></li>
                  <li>
                    <button onClick={handleLogout} className="text-red-500">
                      Logout
                    </button>
                  </li>
                </>
              )}
            </ul>
          </div>

        </div>
      </div>
    </nav>
  );
};

export default Navbar;

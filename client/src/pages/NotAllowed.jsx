import React from "react";
import { Link } from "react-router-dom";

const NotAllowed = () => {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center bg-gray-100 dark:bg-gray-900 px-4">
      <h1 className="text-6xl font-bold text-red-600 dark:text-red-400 mb-4">
        403
      </h1>
      <p className="text-xl text-gray-700 dark:text-gray-300 mb-6 text-center">
        Access Denied. You can't access this page.
      </p>
      <Link
        to="/"
        className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
      >
        กลับไปหน้าแรก
      </Link>
    </div>
  );
};

export default NotAllowed;
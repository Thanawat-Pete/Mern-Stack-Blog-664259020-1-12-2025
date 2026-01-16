import React, { useState } from "react";
import Swal from "sweetalert2";
import { Link, useNavigate } from "react-router-dom";
import authenticationService from "../services/authentication.services"; 

const Register = () => {
  const navigate = useNavigate();

  const [user, setUser] = useState({
    username: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((user) => ({ ...user, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (!user.username || !user.password) {
        return Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Username and password are required!",
          timer: 1500,
          showConfirmButton: true,
        });
      }

      await authenticationService.register(user.username, user.password);

      await Swal.fire({
        icon: "success",
        title: "Register success!",
        text: "You can login now.",
        timer: 1500,
        showConfirmButton: true,
      });

      navigate("/login");
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Register failed",
        text:
          error?.response?.data?.message ||
          "Something went wrong. Please try again.",
        timer: 1500,
        showConfirmButton: true,
      });
    }
  };

  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4 py-16">
      <div className="w-full max-w-md">
        <div className="bg-white/95 dark:bg-gray-800 rounded-2xl shadow-2xl p-6 sm:p-8">
          <h1 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-2">
            Register
          </h1>
          <p className="text-sm text-gray-600 dark:text-gray-300 mb-6">
            Create New Account for access Blog Site.
          </p>

          <form onSubmit={handleSubmit}>
            {/* Username */}
            <label className="block mb-4">
              <span className="text-sm font-medium text-gray-700 dark:text-gray-200">
                Username:
              </span>
              <input
                type="text"
                name="username"
                value={user.username}
                onChange={handleChange}
                placeholder="Create Username..."
                className="mt-2 block w-full rounded-lg border px-3 py-2 transition
                border-gray-200 focus:border-indigo-400
                bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
              />
            </label>

            {/* Password */}
            <label className="block mb-4">
              <span className="text-sm font-medium text-gray-700 dark:text-gray-200">
                Password:
              </span>
              <input
                type="password"
                name="password"
                value={user.password}
                onChange={handleChange}
                placeholder="Create Password..."
                className="mt-2 block w-full rounded-lg border px-3 py-2 transition
                border-gray-200 focus:border-indigo-400
                bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
              />
            </label>

            {/* Submit */}
            <div className="mt-6">
              <button
                type="submit"
                className="w-full rounded-lg py-2.5 text-sm font-medium transition
                bg-indigo-600 hover:bg-indigo-700 text-white"
              >
                Register
              </button>
            </div>
          </form>

          <div className="mt-4 text-center text-sm text-gray-600 dark:text-gray-300">
            Already Have Account?{" "}
            <Link
              to="/login"
              className="font-medium text-indigo-600 hover:underline dark:text-indigo-400"
            >
              Log In
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
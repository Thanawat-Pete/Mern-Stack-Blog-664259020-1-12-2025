import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import authenticationService from "../services/authentication.services";
import { UserContext } from "../contexts/UserContext";

const Login = () => {
const navigate = useNavigate();

const [user, setUser] = useState({
  username: "",
  password: "",
});

const { setUserinfo } = useContext(UserContext);

const handleChange = (e) => {
  const { name, value } = e.target;
  setUser((prev) => ({ ...prev, [name]: value }));
};

const handleSubmit = async (e) => {
  e.preventDefault();

  if (!user.username || !user.password) {
    return Swal.fire({
      icon: "error",
      title: "Error!",
      text: "Username and Password cannot be empty.",
      timer: 1500,
      showConfirmButton: true,
    });
  }

  try {
    const response = await authenticationService.login(
      user.username,
      user.password
    );

    if (response.status === 200) {
      Swal.fire({
        icon: "success",
        title: "Success",
        text: response?.data?.message || "Login successful",
        timer: 1500,
        showConfirmButton: true,
        didClose: () => {
          // ✅ ใช้ response.data.user ตามที่กำหนด
          setUserinfo({
            id: response.data.id,
            username: response.data.user,      // 👈 ห้ามแก้ → ใช้ตรงนี้
            accessToken: response.data.accessToken,
          });

          navigate("/", { replace: true });
        },
      });
    }
  } catch (error) {
    Swal.fire({
      icon: "error",
      title: "Login Failed",
      text:
        error?.response?.data?.message ||
        `Error: ${error?.response?.status || "Unknown"}`,
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
            Log In
          </h1>
          <p className="text-sm text-gray-600 dark:text-gray-300 mb-6">
            Fill Username and Password for access Blog Site.
          </p>

          <form onSubmit={handleSubmit} noValidate>
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
                placeholder="Insert Username..."
                className="mt-2 block w-full rounded-lg border border-gray-200 px-3 py-2
                bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100
                focus:border-indigo-400"
              />
            </label>

            {/* Password */}
            <label className="block mb-2">
              <span className="text-sm font-medium text-gray-700 dark:text-gray-200">
                Password
              </span>
              <input
                type="password"
                name="password"
                value={user.password}
                onChange={handleChange}
                placeholder="Insert Password..."
                className="mt-2 block w-full rounded-lg border border-gray-200 px-3 py-2
                bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100
                focus:border-indigo-400"
              />
            </label>

            {/* Submit */}
            <button
              type="submit"
              className="w-full mt-6 rounded-lg py-2.5 text-sm font-medium transition
              bg-indigo-600 hover:bg-indigo-700 text-white"
            >
              Log In
            </button>
          </form>

          <div className="mt-4 text-center text-sm text-gray-600 dark:text-gray-300">
            You didn't have an account?{" "}
            <Link
              to="/register"
              className="font-medium text-indigo-600 hover:underline dark:text-indigo-400"
            >
              Register
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;

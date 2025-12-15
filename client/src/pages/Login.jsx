import React, { useState } from "react";
import { Link } from "react-router-dom";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [touched, setTouched] = useState({ username: false, password: false });
  const [submitted, setSubmitted] = useState(false);

  const errors = {
    username: username.trim().length === 0 ? "กรุณากรอกชื่อผู้ใช้" : "",
    password: password.trim().length === 0 ? "กรุณากรอกรหัสผ่าน" : "",
  };

  const isValid = !errors.username && !errors.password;

  const handleSubmit = (e) => {
    e.preventDefault();
    setTouched({ username: true, password: true });
    setSubmitted(true);

    if (!isValid) return;

    alert("เข้าสู่ระบบสำเร็จ (UI เท่านั้น)");
  };

  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4 py-16">
      <div className="w-full max-w-md">
        <div className="bg-white/95 dark:bg-gray-800 rounded-2xl shadow-2xl p-6 sm:p-8">

          <h1 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-2">
            เข้าสู่ระบบ
          </h1>
          <p className="text-sm text-gray-600 dark:text-gray-300 mb-6">
            กรุณากรอกชื่อผู้ใช้และรหัสผ่านของคุณ
          </p>

          <form onSubmit={handleSubmit} noValidate>

            {/* Username */}
            <label className="block mb-4">
              <span className="text-sm font-medium text-gray-700 dark:text-gray-200">
                ชื่อผู้ใช้
              </span>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                onBlur={() => setTouched((t) => ({ ...t, username: true }))}
                placeholder="พิมพ์ชื่อผู้ใช้ของคุณ"
                className={`mt-2 block w-full rounded-lg border px-3 py-2 transition
                  ${touched.username && errors.username ? "border-red-400 focus:border-red-500" : "border-gray-200 focus:border-indigo-400"}
                  bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100`}
              />
              {touched.username && errors.username && (
                <p className="mt-1 text-xs text-red-500">{errors.username}</p>
              )}
            </label>

            {/* Password */}
            <label className="block mb-2">
              <span className="text-sm font-medium text-gray-700 dark:text-gray-200">
                รหัสผ่าน
              </span>
              <div className="mt-2 flex items-center">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onBlur={() => setTouched((t) => ({ ...t, password: true }))}
                  placeholder="กรอกรหัสผ่าน"
                  className={`flex-1 rounded-lg border px-3 py-2 transition
                    ${touched.password && errors.password ? "border-red-400 focus:border-red-500" : "border-gray-200 focus:border-indigo-400"}
                    bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100`}
                />

                <button
                  type="button"
                  onClick={() => setShowPassword((s) => !s)}
                  className="ml-2 inline-flex items-center justify-center rounded-md px-2 py-2 text-sm border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                >
                  {showPassword ? (
                    // eye-off
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-700 dark:text-gray-200" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3l18 18M9.88 9.88A3 3 0 0112 9c1.657 0 3 1.343 3 3 0 .695-.237 1.336-.635 1.848m-1.048 1.07A3 3 0 019 12c0-.458.103-.892.29-1.28m4.42 4.42A9.966 9.966 0 0112 19c-5 0-9-4-9-7a9.972 9.972 0 014.418-6.818M15.535 8.465A9.973 9.973 0 0112 5c-1.115 0-2.187.182-3.182.518" />
                    </svg>
                  ) : (
                    // eye
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-700 dark:text-gray-200" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 5c-5 0-9 4-9 7s4 7 9 7 9-4 9-7-4-7-9-7z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  )}
                </button>
              </div>

              {touched.password && errors.password && (
                <p className="mt-1 text-xs text-red-500">{errors.password}</p>
              )}
            </label>

            <button
              type="submit"
              className={`w-full mt-6 rounded-lg py-2.5 text-sm font-medium transition
                ${isValid ? "bg-indigo-600 hover:bg-indigo-700 text-white" : "bg-indigo-400/60 text-white cursor-not-allowed"}`}
              disabled={!isValid && submitted}
            >
              เข้าสู่ระบบ
            </button>
          </form>

          <div className="mt-4 text-center text-sm text-gray-600 dark:text-gray-300">
            ยังไม่มีบัญชี?{" "}
            <Link to="/register" className="font-medium text-indigo-600 hover:underline dark:text-indigo-400">
              สมัครสมาชิก
            </Link>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Login;

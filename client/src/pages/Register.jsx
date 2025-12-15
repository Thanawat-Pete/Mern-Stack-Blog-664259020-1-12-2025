import React, { useState } from "react";
import { Link } from "react-router-dom";

const Register = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [touched, setTouched] = useState({ username: false, password: false });
  const [submitted, setSubmitted] = useState(false);

  const errors = {
    username:
      username.trim().length === 0 ? "กรุณากรอกชื่อผู้ใช้" : username.length < 3 ? "ต้องมีอย่างน้อย 3 ตัวอักษร" : "",
    password:
      password.length === 0 ? "กรุณากรอกรหัสผ่าน" : password.length < 6 ? "รหัสผ่านต้องมีอย่างน้อย 6 ตัวอักษร" : "",
  };

  const isValid = !errors.username && !errors.password;

  const handleSubmit = (e) => {
    e.preventDefault();
    setTouched({ username: true, password: true });
    setSubmitted(true);

    if (!isValid) return;

    // ตอนนี้ยังไม่เรียก API — แค่แสดงตัวอย่างการ submit
    alert(`สมัครเรียบร้อย!\nusername: ${username}`);
    // reset form (option)
    setUsername("");
    setPassword("");
    setTouched({ username: false, password: false });
    setSubmitted(false);
  };

  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4 py-16">
      <div className="w-full max-w-md">
        <div className="bg-white/95 dark:bg-gray-800 rounded-2xl shadow-2xl p-6 sm:p-8">
          <h1 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-2">ลงทะเบียน</h1>
          <p className="text-sm text-gray-600 dark:text-gray-300 mb-6">
            สร้างบัญชีเพื่อเข้าใช้งานระบบ — มีแค่ชื่อผู้ใช้และรหัสผ่านตอนนี้
          </p>

          <form onSubmit={handleSubmit} noValidate>
            {/* Username */}
            <label className="block mb-4">
              <span className="text-sm font-medium text-gray-700 dark:text-gray-200">ชื่อผู้ใช้</span>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                onBlur={() => setTouched((t) => ({ ...t, username: true }))}
                placeholder="พิมพ์ชื่อผู้ใช้ของคุณ"
                className={`mt-2 block w-full rounded-lg border px-3 py-2 transition
                  ${touched.username && errors.username ? "border-red-400 focus:border-red-500" : "border-gray-200 focus:border-indigo-400"}
                  bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100`}
                aria-invalid={!!(touched.username && errors.username)}
                aria-describedby="username-error"
              />
              {touched.username && errors.username && (
                <p id="username-error" className="mt-1 text-xs text-red-500">{errors.username}</p>
              )}
            </label>

            {/* Password */}
            <label className="block mb-2 relative">
              <span className="text-sm font-medium text-gray-700 dark:text-gray-200">รหัสผ่าน</span>
              <div className="mt-2 flex items-center">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onBlur={() => setTouched((t) => ({ ...t, password: true }))}
                  placeholder="อย่างน้อย 6 ตัวอักษร"
                  className={`flex-1 rounded-lg border px-3 py-2 transition
                    ${touched.password && errors.password ? "border-red-400 focus:border-red-500" : "border-gray-200 focus:border-indigo-400"}
                    bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100`}
                  aria-invalid={!!(touched.password && errors.password)}
                  aria-describedby="password-error"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((s) => !s)}
                  className="ml-2 inline-flex items-center justify-center rounded-md px-2 py-2 text-sm border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                  aria-label={showPassword ? "ซ่อนรหัสผ่าน" : "แสดงรหัสผ่าน"}
                >
                  {showPassword ? (
                    // eye-off icon
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-700 dark:text-gray-200" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-5 0-9-4-9-7s4-7 9-7c1.294 0 2.525.248 3.65.698M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3l18 18" />
                    </svg>
                  ) : (
                    // eye icon
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-700 dark:text-gray-200" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.477 0 8.268 2.943 9.542 7-1.274 4.057-5.065 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                  )}
                </button>
              </div>

              {touched.password && errors.password && (
                <p id="password-error" className="mt-1 text-xs text-red-500">{errors.password}</p>
              )}
            </label>

            {/* Submit */}
            <div className="mt-6">
              <button
                type="submit"
                className={`w-full rounded-lg py-2.5 text-sm font-medium transition
                  ${isValid ? "bg-indigo-600 hover:bg-indigo-700 text-white" : "bg-indigo-400/60 text-white cursor-not-allowed"}
                  `}
                disabled={!isValid && submitted}
              >
                สมัครสมาชิก
              </button>
            </div>
          </form>

          <div className="mt-4 text-center text-sm text-gray-600 dark:text-gray-300">
            มีบัญชีแล้ว?{" "}
            <Link to="/login" className="font-medium text-indigo-600 hover:underline dark:text-indigo-400">
              เข้าสู่ระบบ
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;

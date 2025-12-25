import { useState } from "react";
import Cookies from "js-cookie";
import { NavLink, useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { ClipLoader } from "react-spinners";

export default function Login() {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    fetch(`${process.env.REACT_APP_API_URL}/api/auth/login`, {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify(form),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status === "error") {
          setError(data.message);
          setIsLoading(false);
        } else {
          Cookies.set("token", data.token, { expires: 7, secure: true });
          navigate("/");
        }
      });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8">
        {/* Back button */}
        <NavLink
          to="/"
          className="flex items-center gap-2 primary-text-color hover:text-red-700 font-semibold mb-6"
        >
          <ArrowLeft size={20} />
          الرجوع للصفحة الرئيسية
        </NavLink>

        <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">
          تسجيل الدخول
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Email */}
          <div>
            <label htmlFor="email" className="block text-gray-700 mb-1">
              Email
            </label>
            <input
              type="email"
              name="email"
              id="email"
              value={form.email}
              onChange={handleChange}
              className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-600"
              placeholder="Enter your email"
              required
            />
          </div>

          {/* Password */}
          <div>
            <label htmlFor="password" className="block text-gray-700 mb-1">
              Password
            </label>
            <input
              type="password"
              name="password"
              id="password"
              value={form.password}
              onChange={handleChange}
              className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-600"
              placeholder="Enter your password"
              required
            />
          </div>

          {/* Error */}
          {error && <p className="text-red-800 text-center text-md">{error}</p>}

          {/* Submit */}
          <button
            type="submit"
            className="w-full btn hover:bg-red-700 text-white p-3 rounded-lg font-semibold"
          >
            {isLoading ? (
              <ClipLoader className="mx-auto" size={24} color="#FFFFFF" />
            ) : (
              <>تسجيل الدخول</>
            )}
          </button>
        </form>

        {/* Signup Link */}
        <p className="text-center mt-6 text-gray-700">
          ليس لديك حساب؟{" "}
          <NavLink
            to="/register"
            className="primary-text-color hover:text-red-700 font-semibold"
          >
            إنشاء حساب
          </NavLink>
        </p>
      </div>
    </div>
  );
}

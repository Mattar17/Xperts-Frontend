import { useState } from "react";
import { TEST_BASE_URL } from "./Gobal";
import { NavLink } from "react-router";

export default function Register() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (form.password !== form.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    fetch(`${TEST_BASE_URL}/api/auth/register`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(form),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status === "error") {
          setError(data.message);
        } else {
          setError("");
        }
      });
  };

  return (
    <>
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <form
          onSubmit={handleSubmit}
          className="w-full max-w-md p-6 bg-white shadow-xl rounded-xl space-y-6"
        >
          <h2 className="text-2xl font-bold text-center">Register</h2>

          {/* Error Message */}
          {error && error !== "" && (
            <div className="p-3 bg-red-100 text-red-700 rounded-lg text-center">
              {error}
            </div>
          )}

          {/* Name */}
          <div>
            <label className="block font-medium mb-1">Name</label>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-gray-300"
              required
            />
          </div>

          {/* Email */}
          <div>
            <label className="block font-medium mb-1">Email</label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-gray-300"
              required
            />
          </div>

          {/* Password */}
          <div>
            <label className="block font-medium mb-1">Password</label>
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-gray-300"
              required
            />
          </div>

          {/* Confirm Password */}
          <div>
            <label className="block font-medium mb-1">Confirm Password</label>
            <input
              type="password"
              name="confirmPassword"
              value={form.confirmPassword}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-gray-300"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full btn bg-red-600 text-white py-2 rounded-lg hover:bg-red-700 transition font-semibold"
          >
            Register
          </button>

          {/* Success Box */}
          {error === "" && (
            <div className="mt-4 p-4 bg-green-100 text-green-700 rounded-lg text-center shadow">
              <p>Your account has been created successfully.</p>
              <NavLink
                to="/login"
                className="text-green-800 underline font-medium"
              >
                Login now
              </NavLink>
            </div>
          )}

          {/* Already Have Account */}
          <p className="text-center mt-6 text-gray-600">
            Already have an account?{" "}
            <NavLink
              to="/login"
              className="text-red-600 font-semibold underline"
            >
              Login
            </NavLink>
          </p>
        </form>
      </div>
    </>
  );
}

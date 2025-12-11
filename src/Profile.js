import { NavLink } from "react-router-dom";

export default function Profile() {
  return (
    <div className="min-h-screen bg-gray-100 p-6">
      {/* Top Navigation */}
      <div className="mb-6">
        <NavLink
          to="/"
          className="text-blue-600 hover:text-blue-800 font-semibold"
        >
          ← Back
        </NavLink>
      </div>

      <div className="grid grid-cols-12 gap-6">
        {/* Side Nav */}
        <aside className="col-span-3 bg-white p-4 rounded-2xl shadow">
          <nav className="flex flex-col space-y-4">
            <NavLink
              to="overview"
              className={({ isActive }) =>
                `p-2 rounded-xl font-medium ${
                  isActive
                    ? "bg-blue-500 text-white"
                    : "text-gray-700 hover:bg-gray-200"
                }`
              }
            >
              Overview
            </NavLink>

            <NavLink
              to="change-picture"
              className={({ isActive }) =>
                `p-2 rounded-xl font-medium ${
                  isActive
                    ? "bg-blue-500 text-white"
                    : "text-gray-700 hover:bg-gray-200"
                }`
              }
            >
              Change Picture
            </NavLink>

            <NavLink
              to="change-password"
              className={({ isActive }) =>
                `p-2 rounded-xl font-medium ${
                  isActive
                    ? "bg-blue-500 text-white"
                    : "text-gray-700 hover:bg-gray-200"
                }`
              }
            >
              Change Password
            </NavLink>
          </nav>
        </aside>

        {/* Page Content */}
        <main className="col-span-9 bg-white p-6 rounded-2xl shadow">
          <h1 className="text-2xl font-bold mb-4">Profile Settings</h1>
          <p>Select an option from the left menu to manage your profile.</p>
        </main>
      </div>
    </div>
  );
}

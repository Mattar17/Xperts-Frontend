import { NavLink, Outlet } from "react-router-dom";
import Navbar from "../Navbar/Navbar";

function UserDashboard() {
  return (
    <>
      <Navbar />
      <div className="flex h-screen bg-white text-gray-700">
        {/* Sidebar */}
        <aside className="w-64 h-full bg-[#d9d9d9] border-r border-white/10">
          <nav className="px-4 bg-[#d9d9d9] space-y-1">
            <NavLink to="/dashboard/profile">
              <SidebarItem>Profile</SidebarItem>
            </NavLink>
            <NavLink to="/dashboard/change-password">
              <SidebarItem>Change Password</SidebarItem>
            </NavLink>
            <NavLink to="/dashboard/recommend-expert">
              <SidebarItem>Recommend an Expert</SidebarItem>
            </NavLink>
          </nav>
        </aside>

        {/* Main */}
        <main className="flex-1 flex flex-col">
          <Outlet />
        </main>
      </div>
    </>
  );
}

/* Sidebar item */
function SidebarItem({ children, active }) {
  return (
    <div
      className={`px-3 py-2 rounded-md cursor-pointer text-sm transition hover:bg-gray-300
        ${
          active
            ? "bg-gray-200 text-gray-700"
            : "text-black hover:text-red-700 hover:bg-white"
        }`}
    >
      {children}
    </div>
  );
}

export default UserDashboard;

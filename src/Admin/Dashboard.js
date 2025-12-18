import Navbar from "../Navbar/Navbar";

function AdminDashboard() {
  return (
    <>
      <Navbar />
      <div className="flex h-screen bg-white text-gray-700">
        {/* Sidebar */}
        <aside className="w-64 h-full bg-[#d9d9d9] border-r border-white/10">
          <nav className="px-4 bg-[#d9d9d9] space-y-1">
            <SidebarItem active>Dashboard</SidebarItem>
            <SidebarItem>Categories</SidebarItem>
            <SidebarItem>Add an Expert</SidebarItem>
            <SidebarItem>Experts Recommendations</SidebarItem>
            <SidebarItem>Admins</SidebarItem>
            <SidebarItem>Users</SidebarItem>
            <SidebarItem>Reports</SidebarItem>
          </nav>
        </aside>

        {/* Main */}
        <main className="flex-1 flex flex-col">
          {/* Top bar */}
          <header className="h-16 px-6 flex items-center justify-between border-b border-white/10">
            <h1 className="text-lg font-semibold">Documents</h1>
          </header>

          {/* Empty content */}
          <section className="flex-1 p-6" />
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

export default AdminDashboard;

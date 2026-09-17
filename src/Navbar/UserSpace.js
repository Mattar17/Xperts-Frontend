import { Bell, CircleUser, Pencil, Settings2 } from "lucide-react";
import PopUpComponent from "../Helpers/PopUpComponent";
import { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useUserStore } from "../store";

export default function UserSpace({ isWritingPost }) {
  const navigate = useNavigate();
  const { user, fetchUserProfile, logout } = useUserStore();

  const [userClicked, setUserClicked] = useState(false);
  const [notificationOpen, setNotificationOpen] = useState(false);

  const handleNotificationOpen = () => {
    setNotificationOpen(!notificationOpen);
  };

  const handleUserClicked = () => {
    setUserClicked(!userClicked);
  };

  const signOut = () => {
    logout();
    navigate("/login");
  };

  useEffect(() => {
    fetchUserProfile();
  }, [fetchUserProfile]);

  const avatarUrl =
    user?.pfp_url ||
    "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&h=120&q=80";

  return (
    <>
      {user?.isAdmin ? (
        <NavLink to="/dashboard" title="Admin Dashboard">
          <Settings2 color="white" />
        </NavLink>
      ) : null}

      <button
        type="button"
        onClick={isWritingPost}
        className="p-1.5 rounded-full hover:bg-white/10 transition"
        title="Write a post"
      >
        <Pencil color="white" size={20} />
      </button>

      {/* Notifications with blue badge */}
      <div className="relative">
        <button
          type="button"
          onClick={handleNotificationOpen}
          className="p-1.5 rounded-full hover:bg-white/10 transition relative flex items-center justify-center"
          title="Notifications"
        >
          <Bell
            size={22}
            className={notificationOpen ? "text-gray-300" : "text-white"}
          />
          <span className="absolute top-0 right-0 w-4 h-4 bg-[#3b82f6] text-white text-[10px] font-bold rounded-full flex items-center justify-center pointer-events-none">
            3
          </span>
        </button>

        {notificationOpen && (
          <PopUpComponent>
            <h1 className="text-sm sm:text-base p-2">No Notifications</h1>
          </PopUpComponent>
        )}
      </div>

      {/* User Avatar with green online dot */}
      <div className="relative">
        <button
          type="button"
          onClick={handleUserClicked}
          className="relative flex items-center justify-center"
        >
          {avatarUrl ? (
            <img
              className="w-9 h-9 sm:w-10 sm:h-10 rounded-full object-cover border-2 border-white/20"
              src={avatarUrl}
              alt="User Profile"
            />
          ) : (
            <CircleUser
              className="w-7 h-7 sm:w-8 sm:h-8"
              color={userClicked ? "#c2c2c2" : "white"}
            />
          )}
          {/* Green online badge */}
          <span className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-500 rounded-full border-2 border-[#981316]"></span>
        </button>

        {userClicked && (
          <PopUpComponent>
            <div className="flex flex-col min-w-[125px]">
              <NavLink
                to="/dashboard/profile"
                className="
            px-3 py-2
            text-sm sm:text-base
            rounded-lg
            hover:translate-x-0.5
            hover:text-red-900
            hover:font-semibold
            transition
          "
              >
                Profile
              </NavLink>

              <button
                onClick={signOut}
                className="
            text-left
            px-3 py-2
            text-sm sm:text-base
            rounded-lg
            hover:translate-x-0.5
            hover:text-red-900
            hover:font-semibold
            transition
          "
              >
                Logout
              </button>
            </div>
          </PopUpComponent>
        )}
      </div>
    </>
  );
}

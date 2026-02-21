import { Bell, CircleUser, Pencil, Settings2, Search } from "lucide-react";
import { jwtDecode } from "jwt-decode";
import Cookies from "js-cookie";
import PopUpComponent from "../Helpers/PopUpComponent";
import { useState, useEffect, useRef } from "react";
import { NavLink, useNavigate } from "react-router-dom";

export default function UserSpace({ isWritingPost }) {
  const navigate = useNavigate();
  const token = Cookies.get("token");
  const decodedToken = jwtDecode(token);
  let userInfo = null;

  const [userClciked, setUserClicked] = useState(false);
  const [notificationOpen, setNotificationOpne] = useState(false);

  const handleNotificationOpen = () => {
    setNotificationOpne(!notificationOpen);
  };

  const handleUserClicked = () => {
    setUserClicked(!userClciked);
  };

  const signOut = () => {
    navigate("/login");
    Cookies.remove("token");
    window.location.reload();
  };

  useEffect(() => {
    let ignore = true;
    if (!ignore) return;
    fetch(
      `${process.env.REACT_APP_API_URL}/api/user/profile/${decodedToken._id}`,
      {
        headers: {
          "Content-type": "application/json",
          "x-api-key": process.env.REACT_APP_API_KEY,
        },
      },
    )
      .then((res) => res.json())
      .then((data) => {
        localStorage.setItem("user", JSON.stringify(data.data));
        userInfo = data.data;
        console.log(userInfo);
      });

    return () => {
      ignore = false;
    };
  }, []);

  return (
    <>
      {userInfo?.isAdmin ? (
        <NavLink to="/dashboard">
          <Settings2 color="white"></Settings2>
        </NavLink>
      ) : null}
      <button onClick={isWritingPost}>
        <Pencil color="white" />
      </button>
      <div className="relative">
        <button onClick={handleNotificationOpen}>
          <Bell color={notificationOpen ? `#c2c2c2` : "white"} />
        </button>

        <div className="relative">
          <button
            onClick={handleNotificationOpen}
            className="p-2 rounded-full hover:bg-white/10 transition"
          >
            <Bell
              className={`w-5 h-5 sm:w-6 sm:h-6 ${
                notificationOpen ? "text-gray-300" : "text-white"
              }`}
            />
          </button>

          {notificationOpen && (
            <PopUpComponent>
              <h1 className="text-sm sm:text-base p-2">No Notifications 😛</h1>
            </PopUpComponent>
          )}
        </div>
      </div>

      <div className="relative">
        <button onClick={handleUserClicked}>
          {userInfo?.pfp_url !== "" ? (
            <img
              className="w-10 h-10 rounded-full object-cover"
              src={userInfo?.pfp_url}
              alt="User Profile"
            />
          ) : (
            <CircleUser
              className="w-6 h-6 sm:w-7 sm:h-7"
              color={userClciked ? "#c2c2c2" : "white"}
            />
          )}
        </button>

        {userClciked && (
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

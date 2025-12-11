import { Bell, CircleUser, Pencil } from "lucide-react";
import { jwtDecode } from "jwt-decode";
import Cookies from "js-cookie";
import PopUpComponent from "../PopUpComponent";
import { useState } from "react";
import { NavLink } from "react-router-dom";

export default function UserSpace({ isWritingPost }) {
  const token = Cookies.get("token");
  const decodedToken = jwtDecode(token);

  const [userClciked, setUserClicked] = useState(false);
  const [notificationOpen, setNotificationOpne] = useState(false);

  const handleNotificationOpen = () => {
    setNotificationOpne(!notificationOpen);
  };

  const handleUserClicked = () => {
    setUserClicked(!userClciked);
  };

  const signOut = () => {
    Cookies.remove("token");
    window.location.reload();
  };

  return (
    <>
      <button onClick={isWritingPost}>
        <Pencil color="white" />
      </button>
      <div className="relative">
        <button onClick={handleNotificationOpen}>
          <Bell color={notificationOpen ? `#c2c2c2` : "white"} />
        </button>
        {notificationOpen ? (
          <PopUpComponent>
            <h1>No Notificiations 😛</h1>
          </PopUpComponent>
        ) : null}
      </div>
      <div className="relative">
        <button onClick={handleUserClicked}>
          {decodedToken.pfp_url !== "" ? (
            <img
              className="w-10 h-10 rounded-full object-cover"
              src={decodedToken.pfp_url}
              alt="User Profile"
              width="10px"
            ></img>
          ) : (
            <CircleUser color={userClciked ? `#c2c2c2` : "white"} />
          )}
        </button>
        {userClciked ? (
          <PopUpComponent>
            <button className="w-full text-left p-2 hover:bg-gray-100 rounded-lg">
              <NavLink to="/profile">Profile</NavLink>
            </button>
            <button
              onClick={signOut}
              className="w-full text-left p-2 hover:bg-gray-100 rounded-lg"
            >
              Logout
            </button>
          </PopUpComponent>
        ) : null}
      </div>
    </>
  );
}

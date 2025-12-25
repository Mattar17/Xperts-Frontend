import { Bell, CircleUser, Pencil, Settings2 } from "lucide-react";
import { jwtDecode } from "jwt-decode";
import Cookies from "js-cookie";
import PopUpComponent from "../Helpers/PopUpComponent";
import { useState, useEffect, useRef } from "react";
import { NavLink, useNavigate } from "react-router-dom";

export default function UserSpace({ isWritingPost }) {
  const navigate = useNavigate();
  const token = Cookies.get("token");
  const decodedToken = jwtDecode(token);
  const userInfo = useRef(null);

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
      `${process.env.REACT_APP_API_URL}/api/user/profile/${decodedToken._id}`
    )
      .then((res) => res.json())
      .then((data) => {
        localStorage.setItem("user", JSON.stringify(data.data));
        userInfo.current = data.data;
        console.log(userInfo.current);
      });

    return () => {
      ignore = false;
    };
  }, []);

  return (
    <>
      {userInfo.current?.isAdmin ? (
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
        {notificationOpen ? (
          <PopUpComponent>
            <h1>No Notificiations 😛</h1>
          </PopUpComponent>
        ) : null}
      </div>
      <div className="relative">
        <button onClick={handleUserClicked}>
          {userInfo.current?.pfp_url !== "" ? (
            <img
              className="w-10 h-10 rounded-full object-cover"
              src={userInfo.current?.pfp_url}
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
              <NavLink to="/dashboard/profile">Profile</NavLink>
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

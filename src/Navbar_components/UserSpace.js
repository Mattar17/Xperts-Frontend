import { Bell, CircleUser, Pencil } from "lucide-react";
import { jwtDecode } from "jwt-decode";
import Cookies from "js-cookie";
import PopUpComponent from "../PopUpComponent";
import { useState } from "react";

export default function UserSpace({ isWritingPost }) {
  const token = Cookies.get("token");
  const decodedToken = jwtDecode(token);

  const [userClciked, setUserClicked] = useState(false);

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
      <button>
        <Bell color="white" />
      </button>
      <div>
        <button onClick={handleUserClicked}>
          {decodedToken.pfp_url !== "" ? (
            <img
              className="w-10 h-10 rounded-full object-cover"
              src={decodedToken.pfp_url}
              alt="User Profile"
              width="10px"
            ></img>
          ) : (
            <CircleUser color="white" />
          )}
        </button>
        {userClciked ? (
          <PopUpComponent>
            <button onClick={signOut}>Sign out</button>
          </PopUpComponent>
        ) : null}
      </div>
    </>
  );
}

import { useState } from "react";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";

export default function UserProfile() {
  const userInfo = jwtDecode(Cookies.get("token"));

  let imageUrl = userInfo.pfp_url;

  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(userInfo.name);
  const [bio, setBio] = useState(userInfo.bio);

  const handleInputFileChange = (event) => {
    const profilePic = document.getElementById("profile-pic");
    profilePic.src = URL.createObjectURL(event.target.files[0]);
    profilePic.onload = function () {
      URL.revokeObjectURL(profilePic.src);
    };
  };

  return (
    <div className="w-full max-w-[40rem] rounded-2xl bg-white p-8">
      <div className="flex flex-col gap-6">
        <div className="flex flex-col items-start">
          <div className="h-24 w-24 mb-3 shrink-0 overflow-hidden rounded-full border border-gray-300">
            <img
              id="profile-pic"
              src={
                imageUrl ||
                `https://ui-avatars.com/api/?name=${name}&background=981316&color=fff`
              }
              alt="Profile"
              className="h-full w-full object-cover"
            />
          </div>
          <input
            onChange={(event) => handleInputFileChange(event)}
            type="file"
            className="text-sm font-medium text-[#981316] hover:underline"
            id="file"
          ></input>
        </div>

        <div className="flex-1">
          {isEditing ? (
            <>
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full text-2xl font-semibold text-gray-900 border-b border-gray-300 focus:outline-none focus:border-[#981316]"
              />

              <textarea
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                rows={3}
                className="mt-3 w-full text-base text-gray-700 resize-none border border-gray-300 rounded-lg p-2 focus:outline-none focus:border-[#981316]"
              />
            </>
          ) : (
            <>
              <h2 className="text-3xl font-bold text-gray-900">{name}</h2>

              <p className="mt-2 text-lg text-gray-600">{bio}</p>
            </>
          )}

          <div className="mt-4">
            <button
              onClick={() => setIsEditing(!isEditing)}
              className="text-sm font-medium text-[#981316] hover:underline"
            >
              {isEditing ? "Save" : "Edit Profile"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

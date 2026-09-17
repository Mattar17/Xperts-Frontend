import { useState, useEffect, useRef } from "react";
import MessageBox from "../Helpers/MessageBox";
import { useUserStore } from "../store";

export default function UserProfile() {
  const { user, fetchUserProfile, updateProfile, uploadProfilePicture } = useUserStore();

  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(user?.name || "");
  const [bio, setBio] = useState(user?.bio || "");
  const [file, setFile] = useState(null);
  const [confirmed, setConfirmed] = useState(false);
  const [isChanged, setIsChanged] = useState(false);
  const message = useRef("");

  useEffect(() => {
    if (!user) {
      fetchUserProfile();
    }
  }, [user, fetchUserProfile]);

  useEffect(() => {
    if (user) {
      setName(user.name || "");
      setBio(user.bio || "");
    }
  }, [user]);

  const imageUrl = user?.pfp_url;

  const handleInputFileChange = (event) => {
    const profilePic = document.getElementById("profile-pic");
    profilePic.src = URL.createObjectURL(event.target.files[0]);
    profilePic.onload = function () {
      URL.revokeObjectURL(profilePic.src);
    };
    setFile(event.target.files[0]);
  };

  const handleChangePicture = async (event) => {
    setConfirmed(!confirmed);
  };

  const handleSaveChanges = async () => {
    await updateProfile({ name, bio });
    setIsEditing(false);
  };

  useEffect(() => {
    if (!file) return;
    uploadProfilePicture(file).then((res) => {
      if (res?.status === "success") {
        setIsChanged(true);
        message.current = "Picture Uploaded Successfully!!";
      } else {
        message.current = res?.message || "Something went wrong, Please try again!!";
      }
    });
    const timer = setTimeout(() => {
      setIsChanged(false);
    }, 5000);
    return () => clearTimeout(timer);
  }, [confirmed, file, uploadProfilePicture]);

  return (
    <div className="w-full max-w-[40rem] rounded-2xl bg-white p-8">
      {isChanged ? (
        <MessageBox xSize={4} ySize={2} textColor="#097969">
          <div className="flex justify-center items-center">
            <h2 className="text-[#097969]">{message.current}</h2>
          </div>
        </MessageBox>
      ) : null}
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
            multiple
          ></input>

          {file ? (
            <button
              onClick={handleChangePicture}
              className="py-[2px] px-[14px] mt-[3px] rounded-lg btn text-white"
            >
              Confirm
            </button>
          ) : null}
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
            {!isEditing && (
              <button
                onClick={() => setIsEditing(!isEditing)}
                className="text-sm font-medium text-[#981316] hover:underline"
              >
                Edit Profile
              </button>
            )}

            {isEditing && (
              <button
                onClick={handleSaveChanges}
                className="py-[2px] px-[14px] mt-[3px] rounded-lg btn text-white"
              >
                Save Changes
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

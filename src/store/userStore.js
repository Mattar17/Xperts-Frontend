import { create } from "zustand";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
import { getUserProfile, updateUserInfo, setProfilePicture } from "../api/user";

/**
 * Safely reads the cached user object from localStorage.
 */
const getCachedUser = () => {
  try {
    const cached = localStorage.getItem("user");
    return cached ? JSON.parse(cached) : null;
  } catch {
    return null;
  }
};

export const useUserStore = create((set, get) => ({
  user: getCachedUser(),
  isLoading: false,
  error: null,

  /**
   * Set user in state and sync with localStorage.
   */
  setUser: (user) => {
    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
    } else {
      localStorage.removeItem("user");
    }
    set({ user });
  },

  /**
   * Fetches user profile from API and updates store state.
   * If no ID is provided, it extracts the user ID from the token cookie.
   */
  fetchUserProfile: async (id) => {
    try {
      set({ isLoading: true, error: null });

      let targetId = id;
      if (!targetId) {
        const token = Cookies.get("token");
        if (!token) {
          set({ user: null, isLoading: false });
          return null;
        }
        try {
          const decoded = jwtDecode(token);
          targetId = decoded?._id;
        } catch {
          set({ user: null, isLoading: false });
          return null;
        }
      }

      if (!targetId) {
        set({ isLoading: false });
        return null;
      }

      const res = await getUserProfile(targetId);
      if (res && res.status === "success" && res.data) {
        localStorage.setItem("user", JSON.stringify(res.data));
        set({ user: res.data, isLoading: false });
        return res.data;
      } else {
        set({
          error: res?.message || "Failed to fetch user profile",
          isLoading: false,
        });
        return null;
      }
    } catch (err) {
      set({ error: err.message, isLoading: false });
      return null;
    }
  },

  /**
   * Updates user name / bio via API and updates store state.
   */
  updateProfile: async (info) => {
    try {
      set({ isLoading: true, error: null });
      const res = await updateUserInfo(info);
      if (res && res.status === "success") {
        const currentUser = get().user || {};
        const updatedUser = {
          ...currentUser,
          name: res.data?.name ?? currentUser.name,
          bio: res.data?.bio ?? currentUser.bio,
        };
        localStorage.setItem("user", JSON.stringify(updatedUser));
        set({ user: updatedUser, isLoading: false });
      } else {
        set({
          isLoading: false,
          error: res?.message || "Failed to update profile",
        });
      }
      return res;
    } catch (err) {
      set({ error: err.message, isLoading: false });
      return { status: "error", message: err.message };
    }
  },

  /**
   * Uploads profile picture via API and updates store state.
   */
  uploadProfilePicture: async (file) => {
    try {
      set({ isLoading: true, error: null });
      const res = await setProfilePicture(file);
      if (res && res.status === "success") {
        const currentUser = get().user || {};
        const updatedUser = {
          ...currentUser,
          pfp_url: res.data,
        };
        localStorage.setItem("user", JSON.stringify(updatedUser));
        set({ user: updatedUser, isLoading: false });
      } else {
        set({
          isLoading: false,
          error: res?.message || "Failed to upload picture",
        });
      }
      return res;
    } catch (err) {
      set({ error: err.message, isLoading: false });
      return { status: "error", message: err.message };
    }
  },

  /**
   * Clears user session, cookies, and local storage.
   */
  logout: () => {
    Cookies.remove("token");
    localStorage.removeItem("user");
    set({ user: null, error: null, isLoading: false });
  },
}));

export default useUserStore;


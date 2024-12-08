import { create } from "zustand";

// Define the shape of the user's profile
interface UserProfile {
  id: string;
  name: string;
  events: string[]; // Array of post IDs
}

// Define the shape of the Zustand store
interface UserProfileStore {
  userProfile: UserProfile | null; // Can be null if no user is logged in
  setUserProfile: (userProfile: UserProfile) => void;
  addPost: (post: { id: string }) => void;
  deletePost: (postId: string) => void;
}

const useUserProfileStore = create<UserProfileStore>((set) => ({
  userProfile: null,
  setUserProfile: (userProfile) => set({ userProfile }),
  // Add a new post ID to the beginning of the events array
  addPost: (post) =>
    set((state) => ({
      userProfile: state.userProfile
        ? {
            ...state.userProfile,
            events: [post.id, ...state.userProfile.events],
          }
        : null, // Handle case when userProfile is null
    })),
  deletePost: (postId) =>
    set((state) => ({
      userProfile: state.userProfile
        ? {
            ...state.userProfile,
            events: state.userProfile.events.filter((id) => id !== postId),
          }
        : null, // Handle case when userProfile is null
    })),
}));

export default useUserProfileStore;

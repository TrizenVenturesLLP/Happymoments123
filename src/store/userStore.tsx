import { create } from 'zustand';
import { User } from 'firebase/auth';

interface UserState {
  user: User | null;
  setUser: (user: User | null) => void;
  clearUser: () => void;
}

export const useUserStore = create<UserState>((set) => ({
  user: null,
  setUser: (user) => set((state) => {
    // Only update if the user is different
    if (state.user?.uid !== user?.uid) {
      return { user };
    }
    return state; // No update if user is the same
  }),
  clearUser: () => set({ user: null }),
}));

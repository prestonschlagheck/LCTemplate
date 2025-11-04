import { create } from "zustand";

const ADMIN_CREDENTIALS = {
  email: "admin@example.com",
  password: "changeme"
};

type AuthState = {
  isAuthenticated: boolean;
  email: string | null;
  error: string | null;
  login: (email: string, password: string) => boolean;
  logout: () => void;
};

/**
 * TODO(supabase): Replace this local credential gate with Supabase Auth once backend is ready.
 */
export const useAuthStore = create<AuthState>((set) => ({
  isAuthenticated: false,
  email: null,
  error: null,
  login: (email, password) => {
    const isValid =
      email.trim().toLowerCase() === ADMIN_CREDENTIALS.email &&
      password === ADMIN_CREDENTIALS.password;

    if (isValid) {
      set({ isAuthenticated: true, email: ADMIN_CREDENTIALS.email, error: null });
      return true;
    }

    set({
      isAuthenticated: false,
      email: null,
      error: "Invalid credentials. Please try again."
    });
    return false;
  },
  logout: () => set({ isAuthenticated: false, email: null, error: null })
}));

export const getAuthCredentials = () => ADMIN_CREDENTIALS;


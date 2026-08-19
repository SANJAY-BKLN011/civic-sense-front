import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

/**
 * F2: frontend-only mock authentication state.
 * No backend, database or auth provider is connected. This module exists so the
 * real session source can be swapped in later without touching the UI.
 */

export interface CitizenUser {
  fullName: string;
  email: string;
  phone?: string;
}

interface CitizenAuthValue {
  user: CitizenUser | null;
  isAuthenticated: boolean;
  /** false until the stored mock session has been read on the client */
  isReady: boolean;
  signIn: (input: { email: string; password: string; remember: boolean }) => Promise<void>;
  signUp: (input: {
    fullName: string;
    email: string;
    phone: string;
    password: string;
  }) => Promise<void>;
  requestPasswordReset: (email: string) => Promise<void>;
  signOut: () => void;
}

const STORAGE_KEY = "civicsense.citizen.mock-session";

const CitizenAuthContext = createContext<CitizenAuthValue | null>(null);

function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function readStoredUser(): CitizenUser | null {
  if (typeof window === "undefined") return null;
  for (const store of [window.localStorage, window.sessionStorage]) {
    try {
      const raw = store.getItem(STORAGE_KEY);
      if (raw) return JSON.parse(raw) as CitizenUser;
    } catch {
      /* ignore malformed mock session */
    }
  }
  return null;
}

function clearStoredUser() {
  if (typeof window === "undefined") return;
  window.localStorage.removeItem(STORAGE_KEY);
  window.sessionStorage.removeItem(STORAGE_KEY);
}

export function CitizenAuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<CitizenUser | null>(null);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    setUser(readStoredUser());
    setIsReady(true);
  }, []);

  const persist = useCallback((next: CitizenUser, remember: boolean) => {
    clearStoredUser();
    const store = remember ? window.localStorage : window.sessionStorage;
    store.setItem(STORAGE_KEY, JSON.stringify(next));
    setUser(next);
  }, []);

  const value = useMemo<CitizenAuthValue>(
    () => ({
      user,
      isAuthenticated: user !== null,
      isReady,
      signIn: async ({ email, password, remember }) => {
        await delay(600);
        if (password.length < 6) {
          throw new Error("Those credentials were not accepted. Check your email and password.");
        }
        const namePart = email.split("@")[0] ?? "Resident";
        persist({ fullName: namePart.replace(/[._-]+/g, " "), email }, remember);
      },
      signUp: async ({ fullName, email, phone }) => {
        await delay(700);
        persist({ fullName, email, phone }, true);
      },
      requestPasswordReset: async () => {
        await delay(600);
      },
      signOut: () => {
        clearStoredUser();
        setUser(null);
      },
    }),
    [user, isReady, persist],
  );

  return <CitizenAuthContext.Provider value={value}>{children}</CitizenAuthContext.Provider>;
}

export function useCitizenAuth() {
  const ctx = useContext(CitizenAuthContext);
  if (!ctx) {
    throw new Error("useCitizenAuth must be used inside a CitizenAuthProvider");
  }
  return ctx;
}

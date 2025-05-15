import React, {
  createContext,
  useState,
  useContext,
  useEffect,
  ReactNode,
} from 'react';
import * as SecureStore from 'expo-secure-store';

export interface UserDetails {
  token: string;
  name: string;
  email: string;
  photo: string;
}

interface AuthContextType {
  user: UserDetails | null;
  initializing: boolean;
  login: (userDetails: UserDetails) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = (): AuthContextType => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<UserDetails | null>(null);
  const [initializing, setInitializing] = useState(true);

  // Load user from SecureStore on app start
  useEffect(() => {
    (async () => {
      try {
        const json = await SecureStore.getItemAsync('user');
        if (json) setUser(JSON.parse(json));
      } catch {
        /* ignore */
      } finally {
        setInitializing(false);
      }
    })();
  }, []);

  const login = async (userDetails: UserDetails) => {
    setUser(userDetails);
    await SecureStore.setItemAsync('user', JSON.stringify(userDetails));
  };

  const logout = async () => {
    setUser(null);
    await SecureStore.deleteItemAsync('user');
  };

  return (
    <AuthContext.Provider
      value={{ user, initializing, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

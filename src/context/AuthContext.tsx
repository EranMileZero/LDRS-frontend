import { createContext, useContext, useState, type ReactNode } from 'react';
import { type User, USERS } from '@/lib/mockData';

interface AuthContextType {
  user: User | null;
  login: (email: string) => Promise<void>;
  register: (user: Omit<User, 'id'>) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  const login = async (email: string) => {
    // Mock login logic
    return new Promise<void>((resolve, reject) => {
      setTimeout(() => {
        const foundUser = USERS.find(u => u.email === email);
        if (foundUser) {
          setUser(foundUser);
          resolve();
        } else {
          // For demo purposes, if user not found in mock data, create a temporary session user
          let role: User['role'] = 'consumer';
          if (email.includes('influencer')) role = 'influencer';
          if (email.includes('admin')) role = 'admin';

           const tempUser: User = {
            id: Math.random().toString(36).substr(2, 9),
            name: email.split('@')[0],
            email,
            role
          };
          setUser(tempUser);
          resolve();
        }
      }, 500);
    });
  };

  const register = async (newUser: Omit<User, 'id'>) => {
    return new Promise<void>((resolve) => {
      setTimeout(() => {
        const createdUser: User = {
          ...newUser,
          id: Math.random().toString(36).substr(2, 9),
        };
        setUser(createdUser);
        resolve();
      }, 1000);
    });
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout, isAuthenticated: !!user }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

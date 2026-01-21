import { createContext, useContext, useState, useEffect, type ReactNode } from 'react';
import { type User } from '@/lib/mockData';
import { authService } from '@/services/auth.service';
import type { RegisterCommand } from '@/types/api';

interface AuthContextType {
  user: User | null;
  login: (email: string, password?: string) => Promise<void>;
  register: (user: RegisterCommand) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const storedUser = localStorage.getItem('user');
    if (token && storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (e) {
        console.error("Failed to parse stored user", e);
        localStorage.removeItem('token');
        localStorage.removeItem('user');
      }
    }
  }, []);

  const login = async (email: string, password?: string) => {
    if (!password) {
      console.warn("Password not provided for login, this might fail with real API");
      // Fallback or error? For now, we proceed but the API call will likely fail
      // unless we keep some mock logic for dev.
      // But we are switching to REAL API.
    }
    
    try {
      const response = await authService.login({ email, password });
      
      const loggedUser = response.user as unknown as User; // Casting because roles might be string vs union
      
      localStorage.setItem('token', response.token);
      localStorage.setItem('user', JSON.stringify(loggedUser));
      setUser(loggedUser);
    } catch (error) {
      console.error("Login failed", error);
      throw error;
    }
  };

  const register = async (newUser: RegisterCommand) => {
    try {
      await authService.register(newUser);
      // After register, we usually redirect to login.
      // We don't automatically login here unless the API returns a token on register (it says 200 OK void).
    } catch (error) {
      console.error("Registration failed", error);
      throw error;
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
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

// This file exports both a Provider component and a custom hook
// Fast Refresh warnings are expected but harmless - the app works correctly
import { createContext, useContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';
import api from '../services/api';

interface User {
  id: string;
  email: string;
  fullName: string;
  role: string;
  phone?: string;
  location?: { lat: number; lng: number; address?: string };
  referralCode?: string;
}

interface AuthContextType {
  user: User | null;
  token: string | null;
  login: (email: string, password: string) => Promise<User | null>;
  signup: (data: SignupData) => Promise<void>;
  logout: () => void;
  updateUser: (userData: Partial<User>) => void;
  isAuthenticated: boolean;
}

interface SignupData {
  email: string;
  password: string;
  fullName: string;
  phone: string;
  role?: string;
  referralCode?: string;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    const storedUser = localStorage.getItem('user');

    if (storedToken && storedUser) {
      try {
        const userData = JSON.parse(storedUser);
        setToken(storedToken);
        setUser(userData);
      } catch (error) {
        console.error('Error parsing stored user data:', error);
        localStorage.removeItem('token');
        localStorage.removeItem('user');
      }
    }
  }, []);

  const login = async (email: string, password: string) => {
    try {
      // Normalize email and trim password
      const normalizedEmail = email.toLowerCase().trim();
      const trimmedPassword = password.trim();
      
      const response = await api.post('/auth/signin', { 
        email: normalizedEmail, 
        password: trimmedPassword 
      });
      
      if (!response.data || !response.data.token || !response.data.user) {
        throw new Error('Invalid response from server');
      }
      
      const { token: newToken, user: userData } = response.data;

      setToken(newToken);
      setUser(userData);
      localStorage.setItem('token', newToken);
      localStorage.setItem('user', JSON.stringify(userData));
      
      // Return user data for navigation
      return userData;
    } catch (error: any) {
      console.error('Login error in AuthContext:', error);
      // Re-throw the error so it can be caught in the component
      throw error;
    }
  };

  const signup = async (data: SignupData) => {
    const response = await api.post('/auth/signup', data);
    const { token: newToken, user: userData } = response.data;

    setToken(newToken);
    setUser(userData);
    localStorage.setItem('token', newToken);
    localStorage.setItem('user', JSON.stringify(userData));
  };

  const logout = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  };

  const updateUser = (userData: Partial<User>) => {
    const updatedUser = { ...user, ...userData } as User;
    setUser(updatedUser);
    localStorage.setItem('user', JSON.stringify(updatedUser));
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        login,
        signup,
        logout,
        updateUser,
        isAuthenticated: !!token,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook for accessing auth context
export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

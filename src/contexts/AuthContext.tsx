import React, { createContext, useContext, useState, useEffect } from 'react';
import type { AuthContextType, User } from '../types';
import { apiRequest } from '../lib/api';

const AuthContext = createContext<AuthContextType | undefined>(undefined);
const TOKEN_STORAGE_KEY = 'careerAdvisorToken';

/**
 * AuthProvider Component
 * Manages user authentication state and provides auth methods
 */
export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  // Check for existing session on mount
  useEffect(() => {
    const storedToken = localStorage.getItem(TOKEN_STORAGE_KEY);
    if (!storedToken) {
      setLoading(false);
      return;
    }

    setAccessToken(storedToken);
    checkSession(storedToken);
  }, []);

  /**
   * Check if user has an active session
   */
  const checkSession = async (tokenOverride?: string | null) => {
    try {
      if (!tokenOverride) {
        return;
      }

      const data = await apiRequest<{ user: User }>(
        '/auth/session/',
        {
          token: tokenOverride,
        }
      );

      setUser(data.user);
      setAccessToken(tokenOverride);
      localStorage.setItem(TOKEN_STORAGE_KEY, tokenOverride);
    } catch (error) {
      console.error('Session check error:', error);
      localStorage.removeItem(TOKEN_STORAGE_KEY);
      setUser(null);
      setAccessToken(null);
    } finally {
      setLoading(false);
    }
  };

  /**
   * User login function
   * @param email - User's email address
   * @param password - User's password
   */
  const login = async (email: string, password: string) => {
    try {
      const data = await apiRequest<{ token: string; user: User }>(
        '/auth/login/',
        {
          method: 'POST',
          body: JSON.stringify({ email, password }),
        }
      );

      setAccessToken(data.token);
      setUser(data.user);
      localStorage.setItem(TOKEN_STORAGE_KEY, data.token);
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  };

  /**
   * User signup function
   * @param name - User's full name
   * @param email - User's email address
   * @param password - User's password
   */
  const signup = async (name: string, email: string, password: string) => {
    try {
      const data = await apiRequest<{ token: string; user: User }>(
        '/auth/signup/',
        {
          method: 'POST',
          body: JSON.stringify({ name, email, password }),
        }
      );

      setAccessToken(data.token);
      setUser(data.user);
      localStorage.setItem(TOKEN_STORAGE_KEY, data.token);
    } catch (error) {
      console.error('Signup error:', error);
      throw error;
    }
  };

  /**
   * User logout function
   */
  const logout = async () => {
    try {
      if (accessToken) {
        await apiRequest('/auth/logout/', {
          method: 'POST',
          token: accessToken,
          skipJsonParsing: true,
        });
      }
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      setUser(null);
      setAccessToken(null);
      localStorage.removeItem(TOKEN_STORAGE_KEY);
    }
  };

  return (
    <AuthContext.Provider value={{ user, accessToken, login, signup, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

/**
 * Custom hook to use auth context
 */
export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

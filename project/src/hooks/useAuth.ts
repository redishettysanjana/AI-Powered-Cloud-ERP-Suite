import { useState, useCallback } from 'react';

interface User {
  id: string;
  email: string;
  name: string;
  role: string;
}

export function useAuth() {
  const [user, setUser] = useState<User | null>(() => {
    const stored = localStorage.getItem('amdox_user');
    return stored ? JSON.parse(stored) : null;
  });

  const login = useCallback((email: string, password: string): boolean => {
    if (email === 'admin@amdox.com' && password === 'admin123') {
      const userData: User = {
        id: '1',
        email: 'admin@amdox.com',
        name: 'Alex Morgan',
        role: 'System Administrator',
      };
      setUser(userData);
      localStorage.setItem('amdox_user', JSON.stringify(userData));
      return true;
    }
    return false;
  }, []);

  const logout = useCallback(() => {
    setUser(null);
    localStorage.removeItem('amdox_user');
  }, []);

  const isAuthenticated = !!user;

  return { user, isAuthenticated, login, logout };
}

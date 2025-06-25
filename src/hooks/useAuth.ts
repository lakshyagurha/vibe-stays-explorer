
import { useState, useEffect } from 'react';

interface AuthUser {
  id: string;
  email: string;
  name: string;
}

export const useAuth = () => {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user is already logged in
    const storedUser = localStorage.getItem('vibestays_admin');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  const signIn = async (email: string, password: string) => {
    // Simple demo authentication - in production, this would be secured
    if (email === 'admin@vibestays.com' && password === 'admin123') {
      const adminUser = {
        id: '1',
        email: 'admin@vibestays.com',
        name: 'VibeStays Admin'
      };
      setUser(adminUser);
      localStorage.setItem('vibestays_admin', JSON.stringify(adminUser));
      return { error: null };
    } else {
      return { error: { message: 'Invalid login credentials' } };
    }
  };

  const signOut = async () => {
    setUser(null);
    localStorage.removeItem('vibestays_admin');
    return { error: null };
  };

  return {
    user,
    session: user ? { user } : null,
    loading,
    signIn,
    signOut
  };
};

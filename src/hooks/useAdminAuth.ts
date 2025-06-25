
import { useState, useEffect } from 'react';
import { useAuth } from './useAuth';

export const useAdminAuth = () => {
  const { user, loading: authLoading, signIn, signOut } = useAuth();
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!authLoading) {
      // Simple admin check - in this demo, any logged in user is admin
      setIsAdmin(!!user);
      setLoading(false);
    }
  }, [user, authLoading]);

  return {
    user,
    session: user ? { user } : null,
    isAdmin,
    loading: authLoading || loading,
    signIn,
    signOut
  };
};

'use client';

import css from './AuthProvider.module.css'
import { checkSession, getMe } from '../../lib/api/clientApi';
import { useAuthStore } from '../../lib/store/authStore';
import { useEffect, useState } from 'react';

type Props = {
  children: React.ReactNode;
};

const AuthProvider = ({ children }: Props) => {
  const [loading, setLoading] = useState(true);
  const setUser = useAuthStore(state => state.setUser);
  const clearIsAuthenticated = useAuthStore(state => state.clearIsAuthenticated);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const isAuthenticated = await checkSession();
        if (isAuthenticated) {
          const user = await getMe();
          if (user) setUser(user);
        } else {
          clearIsAuthenticated();
        }
      } catch (err) {
        console.error('Session check failed', err);
        clearIsAuthenticated();
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [setUser, clearIsAuthenticated]);

  if (loading) {
    return (
      <div className={css['spinner-container']}>
        <div className={css.spinner} />
      </div>
    );
  }

  return children;
};

export default AuthProvider;
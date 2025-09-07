'use client';

import React, { useState } from 'react';
import css from './SignInPage.module.css';
import { useRouter } from 'next/navigation';
import { UserForSign } from '@/types/user';
import { signIn } from '@/lib/api/clientApi';
import { useAuthStore } from '@/lib/store/authStore';

const SignInPage = () => {
  const router = useRouter();
  const [error, setError] = useState('');
  const setUser = useAuthStore(state => state.setUser);

  const handleSighIn = async (formData: FormData) => {
    setError('');
    try {
      const payload: UserForSign = {
        email: formData.get('email') as string,
        password: formData.get('password') as string,
      };
      const res = await signIn(payload);
      if (res) {
        setUser(res);
        router.push('/profile');
      } else {
        setError('Invalid email or password');
      }
    } catch (error) {
      console.log('error', error);
      setError('Invalid email or password');
    }
  };
  return (
    <main className={css.mainContent}>
      <form className={css.form} action={handleSighIn}>
        <h1 className={css.formTitle}>Sign in</h1>

        <div className={css.formGroup}>
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            name="email"
            onChange={() => setError('')}
            className={css.input}
            required
          />
        </div>

        <div className={css.formGroup}>
          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            name="password"
            onChange={() => setError('')}
            className={css.input}
            required
          />
        </div>

        <div className={css.actions}>
          <button type="submit" className={css.submitButton}>
            Log in
          </button>
        </div>

        {error && <p className={css.error}>{error}</p>}
      </form>
    </main>
  );
};

export default SignInPage;

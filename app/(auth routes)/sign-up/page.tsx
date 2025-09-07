'use client';
import React, { useState } from 'react';
import css from './SignUpPage.module.css';
import { signUp } from '@/lib/api/clientApi';
import { UserForSign } from '@/types/user';
import { useRouter } from 'next/navigation';
import { isAxiosError } from 'axios';
import { useAuthStore } from '@/lib/store/authStore';

const SignUpPage = () => {
  const [error, setError] = useState('');
  const router = useRouter();
  const setUser = useAuthStore(state => state.setUser);

  const handleSignUp = async (formData: FormData) => {
    setError('');
    try {
      const payload: UserForSign = {
        email: formData.get('email') as string,
        password: formData.get('password') as string,
      };
      const res = await signUp(payload);
      if (res) {
        setUser(res);
        router.push('/profile');
      } else {
        setError('Invalid email or password');
      }
    } catch (err: unknown) {
      console.log('error', err);

      if (isAxiosError(err)) {
        const message = err.response?.data?.response?.message || 'Invalid email or password';
        setError(message);
      } else {
        setError('Something went wrong');
      }
    }
  };

  return (
    <main className={css.mainContent}>
      <h1 className={css.formTitle}>Sign up</h1>
      <form className={css.form} action={handleSignUp}>
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
            minLength={6}
            required
          />
        </div>
        <div className={css.actions}>
          <button type="submit" className={css.submitButton}>
            Register
          </button>
        </div>
        {error && <p className={css.error}>{error}</p>}
      </form>
    </main>
  );
};

export default SignUpPage;

'use client';

import { useAuthStore } from '@/lib/store/authStore';
import css from './EditProfile.module.css';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { EditUser } from '@/types/user';
import { editMe } from '@/lib/api/clientApi';
import toast from 'react-hot-toast';

const EditProfile = () => {
  const user = useAuthStore(state => state.user);
  const setUser = useAuthStore(state => state.setUser);
  const router = useRouter();

  if (!user) return <p>Loading...</p>;

  const handleSubmit = async (formData: FormData) => {
    const payload: EditUser = {
      email: user.email,
      username: formData.get('username') as string,
    };
    try {
      const res = await editMe(payload);
      if (res) {
         setUser(res);
        router.push('/profile');
      }
    } catch (err) {
      console.error('Failed to update profile:', err);
      toast.error('Something went wrong while updating the profile.');
    }
  };

  return (
    <main className={css.mainContent}>
      <div className={css.profileCard}>
        <h1 className={css.formTitle}>Edit Profile</h1>

        <Image
          src={user.avatar}
          alt="User Avatar"
          width={120}
          height={120}
          className={css.avatar}
        />

        <form className={css.profileInfo} action={handleSubmit}>
          <div className={css.usernameWrapper}>
            <label htmlFor="username">Username:</label>
            <input
              id="username"
              name="username"
              type="text"
              className={css.input}
              defaultValue={user.username}
            />
          </div>

          <p>Email: {user.email}</p>

          <div className={css.actions}>
            <button type="submit" className={css.saveButton}>
              Save
            </button>
            <button type="button" className={css.cancelButton} onClick={() => router.back()}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </main>
  );
};

export default EditProfile;

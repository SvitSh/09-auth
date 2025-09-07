import React from 'react';
import css from './CreateNote.module.css';
import NoteForm from '@/components/NoteForm/NoteForm';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Create note | Notes App',
  description: 'NoteHub — a handy app for creating, editing, and organizing your notes by tags',
  openGraph: {
    title: 'Create note | Notes App',
    description:
      'Create and manage notes easily with NoteHub — support for tags, searching, and saving drafts',
    url: 'https://09-auth-seven.vercel.app/notes/action/create',
    images: [
      {
        url: 'https://ac.goit.global/fullstack/react/notehub-og-meta.jpg',
        width: 1200,
        height: 630,
        alt: 'NoteHub logo',
      },
    ],
  },
};

const CreateNote = () => {
  return (
    <main className={css.main}>
      <div className={css.container}>
        <h1 className={css.title}>Create note</h1>
        <NoteForm />
      </div>
    </main>
  );
};

export default CreateNote;

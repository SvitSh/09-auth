import Link from 'next/link';
import css from './Home.module.css'
import { Metadata } from 'next';

const baseUrl = new URL('https://09-auth-seven.vercel.app');

export const metadata: Metadata = {
  title: 'Page Not Found | Notes App',
  description: 'Sorry, this page does not exist on Notes App.',
  openGraph: {
    title: 'Page Not Found | Example App',
    description: 'Sorry, this page does not exist on Notes App.',
    url: `${baseUrl.origin}/not-found`,
    images: [
      {
        url: 'https://ac.goit.global/fullstack/react/notehub-og-meta.jpg',
        width: 1200,
        height: 630,
        alt: '404 — Page Not Found',
      },
    ],
  },
};

const NotFound = () => {
  return (
    <div>
      <h1 className={css.title}>404 - Page not found</h1>
      <p className={css.description}>Sorry, the page you are looking for does not exist.</p>
      <Link href="/">Go back home</Link>
    </div>
  );
};

export default NotFound;

// import { useRouter } from 'next/navigation';
// import { useEffect } from 'react';
import css from './not-found.module.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Page Not Found',
  description: 'Sorry, the page you are looking for does not exist.',
  openGraph: {
    title: 'Page Not Found',
    description: 'Sorry, the page you are looking for does not exist.',
    url: 'https://notehub.com',
    images: [
      {
        url: 'https://ac.goit.global/fullstack/react/notehub-og-meta.jpg',
        width: 1200,
        height: 630,
        alt: 'NoteHub',
      },
    ],
  },
};


const NotFound = () => {
  // const router = useRouter();

  // useEffect(() => {
  //   const timer = setTimeout(() => router.push('/'), 3000);
  //   return () => clearTimeout(timer);
  // }, [router]);

  return (
    <div className={css.container}>
      <h1 className={css.title}>404 - Page not found</h1>
      <p className={css.description}>
        Sorry, the page you are looking for does not exist.
      </p>
    </div>
  );
};

export default NotFound;
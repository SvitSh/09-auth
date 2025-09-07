import { fetchServerNoteById } from '@/lib/api//serverApi';
import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';
import NoteDetailsClient from './NoteDetails.client';
import { Metadata } from 'next';

type Props = {
  params: Promise<{ id: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const {id} = await params;
  const note = await fetchServerNoteById(id);
  return {
    title: `Note: ${note.title}`,
    description: note.content.slice(0, 30),
    openGraph: {
      title: `Notes: ${note.title}`,
      description: note.content.slice(0, 30),
      url: '09-auth-seven.vercel.app',
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
}

async function NoteDetails({ params }: Props) {
  const {id} = await params;

  const queryClient = new QueryClient();

  queryClient.prefetchQuery({
    queryKey: ['notes', id],
    queryFn: () => fetchServerNoteById(id),
  });
  
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NoteDetailsClient />
    </HydrationBoundary>
  );
}

export default NoteDetails;

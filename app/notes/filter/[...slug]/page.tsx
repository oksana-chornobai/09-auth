import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';
import { fetchNotes, PER_PAGE } from '@/lib/api';
import NotesClient from './Notes.client';
import { ALL_NOTES } from '@/lib/constants';
import type { Metadata } from 'next';

interface NotesProps {
  params: Promise<{ slug: string[] }>;
}

export async function generateMetadata({
  params,
}: NotesProps): Promise<Metadata> {
  const { slug } = await params;
  return {
    title: `${slug[0][0].toUpperCase() + slug[0].slice(1)} Notes`,
    description: `A list of ${slug[0]} notes`,
    openGraph: {
      title: `${slug[0][0].toUpperCase() + slug[0].slice(1)} Notes`,
      description: `A list of ${slug[0]} notes`,
      url: `https://notehub.com/notes/filter/${slug[0]}`,
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
}

interface Props {
  params: Promise<{ slug: string[] }>;
}

const NotesPage = async ({ params }: Props) => {
  const { slug } = await params;
  const queryClient = new QueryClient();

  const tag = slug[0] === ALL_NOTES ? undefined : slug[0];

  await queryClient.prefetchQuery({
    queryKey: ['notes', { search: '', tag, page: 1, perPage: PER_PAGE }],
    queryFn: () =>
      fetchNotes({
        search: '',
        tag: tag || '',
        page: 1,
        perPage: PER_PAGE,
      }),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NotesClient tag={tag} />
    </HydrationBoundary>
  );
};

export default NotesPage;
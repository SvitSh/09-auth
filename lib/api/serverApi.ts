import { cookies } from 'next/headers';
import { nextServer, PER_PAGE } from './api';
import { User } from '@/types/user';
import { Note, Tag } from '@/types/note';
import { GetNotesRes } from './api';

export const checkServerSession = async () => {
  const cookieStore = await cookies();
  const res = await nextServer.get('/auth/session', {
    headers: {
      Cookie: cookieStore.toString(),
    },
  });
  return res;
};

export const getServerMe = async (): Promise<User> => {
  const cookieStore = await cookies();
  const { data } = await nextServer.get('/users/me', {
    headers: {
      Cookie: cookieStore.toString(),
    },
  });
  return data;
};

export const fetchServerNotes = async (
  search: string = '',
  page: number = 1,
  tag?: Tag
): Promise<GetNotesRes> => {
  const cookieStore = await cookies();
  const response = await nextServer.get<GetNotesRes>('/notes', {
    headers: {
      Cookie: cookieStore.toString(),
    },
    params: {
      page,
      perPage: PER_PAGE,
      ...(search !== '' && { search: search }),
      ...(tag && { tag: tag }),
    },
  });
  return response.data;
};

export const fetchServerNoteById = async (id: string): Promise<Note> => {
  const cookieStore = await cookies();
  const response = await nextServer.get<Note>(`/notes/${id}`, {
    headers: {
      Cookie: cookieStore.toString(),
    },
  });
  return response.data;
};
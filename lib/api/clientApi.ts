import { NewNote, Note, Tag } from '@/types/note';
import { nextServer, PER_PAGE } from './api';
import { EditUser, User, UserForSign } from '@/types/user';
import { GetNotesRes } from './api';

const fetchNotes = async (
  search: string = '',
  page: number = 1,
  tag?: Tag
): Promise<GetNotesRes> => {
  const response = await nextServer.get<GetNotesRes>('/notes', {
    params: {
      page,
      perPage: PER_PAGE,
      ...(search !== '' && { search: search }),
      ...(tag && { tag: tag }),
    },

  });
  return response.data;
};

const fetchNoteById = async (id: string): Promise<Note> => {
  const response = await nextServer.get<Note>(`/notes/${id}`, {
  });
  return response.data;
};

const deleteNote = async (noteId: string): Promise<Note> => {
  const response = await nextServer.delete<Note>(`/notes/${noteId}`, {
  });
  return response.data;
};

const createNote = async (data: NewNote): Promise<Note> => {
  const response = await nextServer.post<Note>('/notes', data, {
    headers: {
      
    },
  });
  return response.data;
};

const signUp = async (payload: UserForSign) => {
  const { data } = await nextServer.post<User>('/auth/register', payload);
  return data;
};

const signIn = async (payload: UserForSign) => {
  const { data } = await nextServer.post<User>('/auth/login', payload);
  return data;
};

type CheckSessionRequest = {
  success: boolean;
};

export const checkSession = async () => {
  const res = await nextServer.get<CheckSessionRequest>('/auth/session');
  return res.data.success;
};

export const getMe = async () => {
  const { data } = await nextServer.get<User>('/users/me');
  return data;
};

export const editMe = async (payload: EditUser) => {
  const { data } = await nextServer.patch<User>('/users/me', payload);
  return data;
};

export const logout = async (): Promise<void> => {
  await nextServer.post('/auth/logout');
};

export { fetchNotes, deleteNote, createNote, fetchNoteById, signUp, signIn };
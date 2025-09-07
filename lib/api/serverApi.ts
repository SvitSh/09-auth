import axios from "axios";
import { cookies } from "next/headers";
import type { User } from "@/types/user";
import type { Note, Tag } from "@/types/note";

export const PER_PAGE = 12;

const baseURL = `${process.env.NEXT_PUBLIC_API_URL}/api`;

const nextServer = axios.create({
  baseURL,
  withCredentials: true,
});

/** /users/me */
export const getServerMe = async (): Promise<User> => {
  const Cookie = (await cookies()).toString();
  const { data } = await nextServer.get<User>("/users/me", { headers: { Cookie } });
  return data;
};

/** /notes (SSR) */
export const fetchServerNotes = async (
  search: string = "",
  page: number = 1,
  tag?: Tag
): Promise<Note[]> => {
  const Cookie = (await cookies()).toString();
  const { data } = await nextServer.get<Note[]>("/notes", {
    headers: { Cookie },
    params: {
      page,
      perPage: PER_PAGE,
      ...(search && { search }),
      ...(tag && { tag }),
    },
  });
  return data;
};

/** /notes/:id (SSR) */
export const fetchServerNoteById = async (id: string): Promise<Note> => {
  const Cookie = (await cookies()).toString();
  const { data } = await nextServer.get<Note>(`/notes/${id}`, { headers: { Cookie } });
  return data;
};

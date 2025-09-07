import axios from "axios";
import { cookies } from "next/headers";
import type { User } from "@/types/user";
import type { Note, Tag } from "@/types/note";
import { PER_PAGE, type GetNotesRes } from "./api";

const baseURL = `${process.env.NEXT_PUBLIC_API_URL}/api`;

export const nextServer = axios.create({
  baseURL,
  withCredentials: true,
});

export const getServerMe = async (): Promise<User> => {
  const Cookie = (await cookies()).toString();
  const { data } = await nextServer.get<User>("/users/me", { headers: { Cookie } });
  return data;
};

export const fetchServerNotes = async (
  search: string = "",
  page: number = 1,
  tag?: Tag
): Promise<GetNotesRes> => {
  const Cookie = (await cookies()).toString();
  const { data } = await nextServer.get<GetNotesRes>("/notes", {
    headers: { Cookie },
    params: {
      page,
      perPage: PER_PAGE,
      ...(search ? { search } : {}),
      ...(tag ? { tag } : {}),
    },
  });
  return data;
};

export const fetchServerNoteById = async (id: string): Promise<Note> => {
  const Cookie = (await cookies()).toString();
  const { data } = await nextServer.get<Note>(`/notes/${id}`, { headers: { Cookie } });
  return data;
};

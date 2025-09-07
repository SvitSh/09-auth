import axios from "axios";
import type { Note, Tag, NewNote } from "@/types/note";
import type { User, EditUser, UserForSign } from "@/types/user";
import { PER_PAGE, type GetNotesRes } from "./api";

export const nextClient = axios.create({
  baseURL: "/api",          // важный момент: только относительный путь
  withCredentials: true,
});

/* ---------- Аутентификация ---------- */
export const register = (payload: UserForSign) =>
  nextClient.post<User>("/auth/register", payload).then(r => r.data);

export const login = (payload: UserForSign) =>
  nextClient.post<User>("/auth/login", payload).then(r => r.data);

export const logout = () =>
  nextClient.post("/auth/logout").then(() => {});

// алиасы под ожидаемые названия в компонентах
export const signUp = register;
export const signIn = login;

type CheckSessionResponse = { success: boolean } | undefined;
/** true = есть сессия, false = нет */
export const checkSession = async (): Promise<boolean> => {
  try {
    const res = await nextClient.get<CheckSessionResponse>("/auth/session");
    return (!!res && res.status === 200);
  } catch {
    return false;
  }
};

export const getMe = () =>
  nextClient.get<User>("/users/me").then(r => r.data);

export const editMe = (payload: EditUser) =>
  nextClient.patch<User>("/users/me", payload).then(r => r.data);

/* ---------- Нотатки (CSR) ---------- */
export const fetchNotes = (
  search: string = "",
  page: number = 1,
  tag?: Tag
): Promise<GetNotesRes> => {
  return nextClient
    .get<GetNotesRes>("/notes", {
      params: {
        page,
        perPage: PER_PAGE,
        ...(search ? { search } : {}),
        ...(tag ? { tag } : {}),
      },
    })
    .then(r => r.data);
};

export const fetchNoteById = (id: string) =>
  nextClient.get<Note>(`/notes/${id}`).then(r => r.data);

export const createNote = (data: NewNote) =>
  // если в типе NewNote поле content опционально — подставим пустую строку
  nextClient
    .post<Note>("/notes", {
      title: data.title,
      content: data.content ?? "",
      tag: data.tag,
    })
    .then(r => r.data);

export const deleteNote = (id: string) =>
  nextClient.delete<Note>(`/notes/${id}`).then(r => r.data);

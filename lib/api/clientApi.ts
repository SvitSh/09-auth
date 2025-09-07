import axios from "axios";
import type { Note } from "@/types/note";
import type { User, EditUser } from "@/types/user";

/** Клиент для браузера — всегда относительный путь к нашим App Router API */
export const nextClient = axios.create({
  baseURL: "/api",
  withCredentials: true,
});

/* ---------- Auth ---------- */
export type AuthPayload = { email: string; password: string };

export const register = (data: AuthPayload) => nextClient.post<User>("/auth/register", data);
export const login    = (data: AuthPayload) => nextClient.post<User>("/auth/login", data);
export const logout   = ()                   => nextClient.post<void>("/auth/logout");

/** true, если сессия активна (200 OK). 401 — это просто нет сессии. */
export const checkSession = async (): Promise<boolean> => {
  try {
    const res = await nextClient.get("/auth/session");
    return res.status === 200;
  } catch {
    return false;
  }
};

/** Совместимость со старым кодом */
export const signUp = register;
export const signIn = login;

/* ---------- Users ---------- */
export const getMe  = () => nextClient.get<User>("/users/me").then(r => r.data);
export const editMe = (payload: EditUser) => nextClient.patch<User>("/users/me", payload).then(r => r.data);

/* ---------- Notes (CSR) ---------- */
export type NotesQuery = { page?: number; perPage?: number; tag?: string; search?: string };

export const getNotes   = (params: NotesQuery)                     => nextClient.get<Note[]>("/notes", { params });
export const getNote    = (id: string)                             => nextClient.get<Note>(`/notes/${id}`);
export const createNote = (data: { title: string; content: string; tag: string }) =>
  nextClient.post<Note>("/notes", data);
export const deleteNote = (id: string)                             => nextClient.delete<Note>(`/notes/${id}`);

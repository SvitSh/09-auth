import axios from 'axios';
import type { Note } from '../../types/note';

export const nextServer = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL + '/api',
  withCredentials: true,
});

export const PER_PAGE = 12;

export interface GetNotesRes {
  notes: Note[];
  totalPages: number;
}
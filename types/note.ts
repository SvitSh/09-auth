export interface Note {
  id: string;
  title: string;
  content: string;
  createdAt: string;
  updatedAt: string;
  tag: Tag;
}

export interface NewNote {
  title: string;
  content?: string;
  tag: Tag;
}

export type Tag =
  | 'Work'
  | 'Todo'
  | 'Personal'
  | 'Meeting'
  | 'Shopping'
  | 'Ideas'
  | 'Travel'
  | 'Finance'
  | 'Health'
  | 'Important';

export const TAGS: Tag[] = [
  'Work',
  'Todo',
  'Personal',
  'Meeting',
  'Shopping',
  'Ideas',
  'Travel',
  'Finance',
  'Health',
  'Important',
];

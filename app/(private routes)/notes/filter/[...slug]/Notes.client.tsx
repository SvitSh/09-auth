'use client';
import SearchBox from '@/components/SearchBox/SearchBox';
import css from './NotesPage.module.css';
import Pagination from '@/components/Pagination/Pagination';
import NoteList from '@/components/NoteList/NoteList';
import { useState } from 'react';
import { useDebounce } from 'use-debounce';
import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { fetchNotes } from '@/lib/api/clientApi';
import { Tag } from '@/types/note';
import Link from 'next/link';
import { GetNotesRes } from '@/lib/api/api';

interface NotesClientProps {
  initialData: GetNotesRes;
  initialSearch: string;
  initialPage: number;
  initialTag?: Tag;
}

const NotesClient = ({ initialData, initialSearch, initialPage, initialTag: tag }: NotesClientProps) => {
  const [search, setSearch] = useState(initialSearch);
  const [page, setPage] = useState(initialPage);
  const [debouncedSearch] = useDebounce(search, 300);

  const { data, isSuccess } = useQuery({
    queryKey: ['notes', debouncedSearch, page, tag],
    queryFn: () => fetchNotes(debouncedSearch, page, tag),
    initialData,
    placeholderData: keepPreviousData,
  });

  const totalPages = data?.totalPages || 0;
  const handleSearch = (value: string) => {
    setSearch(value);
    setPage(1);
  };
  const handlePageChange = (value: number) => {
    setPage(value);
  };

  return (
    <>
      <header className={css.toolbar}>
        <SearchBox value={search} onSearch={handleSearch} />
        {isSuccess && data?.totalPages > 1 && (
          <Pagination totalPages={totalPages} onPageChange={handlePageChange} page={page} />
        )}
        <Link href="/notes/action/create" className={css.button}>
          Create note +
        </Link>
      </header>
      {isSuccess && data.notes.length > 0 && <NoteList notes={data.notes} />}
    </>
  );
};

export default NotesClient;

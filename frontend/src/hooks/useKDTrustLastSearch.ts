import { useState, useEffect } from 'react';

const STORAGE_KEY = 'kdtrust_lastSearch';

interface LastSearch {
  search: string;
  category: string;
}

export function useKDTrustLastSearch() {
  const [searchTerm, setSearchTerm] = useState<string>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed: LastSearch = JSON.parse(stored);
        return parsed.search || '';
      }
    } catch {
      // ignore
    }
    return '';
  });

  const [category, setCategory] = useState<string>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed: LastSearch = JSON.parse(stored);
        return parsed.category || 'All Categories';
      }
    } catch {
      // ignore
    }
    return 'All Categories';
  });

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({ search: searchTerm, category }));
    } catch {
      // ignore storage errors
    }
  }, [searchTerm, category]);

  return { searchTerm, category, setSearchTerm, setCategory };
}

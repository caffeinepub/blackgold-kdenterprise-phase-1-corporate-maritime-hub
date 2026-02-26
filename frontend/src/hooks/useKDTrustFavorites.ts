import { useState, useEffect } from 'react';

const STORAGE_KEY = 'kdtrust_favorites';

export function useKDTrustFavorites() {
  const [favorites, setFavorites] = useState<string[]>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(favorites));
    } catch {
      // ignore storage errors
    }
  }, [favorites]);

  const toggleFavorite = (toolName: string) => {
    setFavorites((prev) =>
      prev.includes(toolName)
        ? prev.filter((f) => f !== toolName)
        : [...prev, toolName]
    );
  };

  return { favorites, toggleFavorite };
}

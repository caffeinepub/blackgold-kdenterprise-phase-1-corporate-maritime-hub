import { useState, useEffect, useRef } from 'react';
import { useInternetIdentity } from './useInternetIdentity';
import { useGetFavorites, useSetFavorites } from './useQueries';

const STORAGE_KEY = 'kdtrust_favorites';

function readLocalFavorites(): string[] {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
}

function writeLocalFavorites(favorites: string[]) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(favorites));
  } catch {
    // ignore storage errors
  }
}

export function useKDTrustFavorites() {
  const { identity } = useInternetIdentity();
  const isAuthenticated = !!identity;

  // Local state — used as the source of truth for rendering
  const [favorites, setFavoritesState] = useState<string[]>(readLocalFavorites);

  // Track whether we've already seeded backend with localStorage data on this login session
  const seededRef = useRef(false);

  // Backend query — only runs when authenticated
  const { data: backendFavorites, isSuccess: backendLoaded } = useGetFavorites(isAuthenticated);
  const setFavoritesMutation = useSetFavorites();

  // When the user logs in and backend favorites load, merge localStorage into backend
  // then use the merged result as the source of truth
  useEffect(() => {
    if (!isAuthenticated || !backendLoaded || seededRef.current) return;

    seededRef.current = true;
    const localFavs = readLocalFavorites();
    const backendFavs = backendFavorites ?? [];

    if (localFavs.length > 0) {
      // Merge: union of local and backend, deduplicated
      const merged = Array.from(new Set([...backendFavs, ...localFavs]));
      setFavoritesState(merged);
      // Persist merged list to backend
      setFavoritesMutation.mutate(merged);
      // Clear localStorage since backend is now the source of truth
      writeLocalFavorites([]);
    } else {
      // No local favorites — just use backend data
      setFavoritesState(backendFavs);
    }
  }, [isAuthenticated, backendLoaded, backendFavorites]); // eslint-disable-line react-hooks/exhaustive-deps

  // When user logs out, reset seeded flag and reload from localStorage
  useEffect(() => {
    if (!isAuthenticated) {
      seededRef.current = false;
      setFavoritesState(readLocalFavorites());
    }
  }, [isAuthenticated]);

  const toggleFavorite = (toolName: string) => {
    setFavoritesState((prev) => {
      const next = prev.includes(toolName)
        ? prev.filter((f) => f !== toolName)
        : [...prev, toolName];

      if (isAuthenticated) {
        // Persist to backend
        setFavoritesMutation.mutate(next);
      } else {
        // Persist to localStorage
        writeLocalFavorites(next);
      }

      return next;
    });
  };

  return { favorites, toggleFavorite, isSyncing: setFavoritesMutation.isPending };
}

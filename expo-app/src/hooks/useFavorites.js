import { useState, useEffect, useCallback } from 'react';
import { getFavorites, toggleFavorite as toggleFavStorage } from '../utils/storage';

export function useFavorites() {
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getFavorites().then(favs => {
      setFavorites(favs);
      setLoading(false);
    });
  }, []);

  const toggle = useCallback(async (playerId) => {
    const updated = await toggleFavStorage(playerId);
    setFavorites(updated);
    return updated;
  }, []);

  const isFav = useCallback((playerId) => {
    return favorites.includes(playerId);
  }, [favorites]);

  return { favorites, loading, toggle, isFav };
}

import { useState, useEffect, useCallback } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const FAVORITES_KEY = 'toolbox_favorites';

export function useFavorites() {
  const [favorites, setFavorites] = useState<string[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const loadFavorites = async () => {
      try {
        const stored = await AsyncStorage.getItem(FAVORITES_KEY);
        if (stored) {
          setFavorites(JSON.parse(stored));
        }
      } catch (error) {
        console.error('Error loading favorites:', error);
      } finally {
        setIsLoaded(true);
      }
    };

    loadFavorites();
  }, []);

  useEffect(() => {
    if (isLoaded) {
      const saveFavorites = async () => {
        try {
          await AsyncStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
        } catch (error) {
          console.error('Error saving favorites:', error);
        }
      };
      saveFavorites();
    }
  }, [favorites, isLoaded]);

  const toggleFavorite = useCallback((toolId: string) => {
    setFavorites((prev) =>
      prev.includes(toolId)
        ? prev.filter((id) => id !== toolId)
        : [...prev, toolId]
    );
  }, []);

  const isFavorite = useCallback(
    (toolId: string) => favorites.includes(toolId),
    [favorites]
  );

  return { favorites, toggleFavorite, isFavorite, isLoaded };
}

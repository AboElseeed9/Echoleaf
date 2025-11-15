import { useState, useEffect, useCallback } from 'react';
import type { SavedStudy } from '../types';

const LIBRARY_KEY = 'echoLeafLibrary';

export const useLibrary = () => {
  const [savedStudies, setSavedStudies] = useState<SavedStudy[]>([]);

  useEffect(() => {
    try {
      const storedItems = window.localStorage.getItem(LIBRARY_KEY);
      if (storedItems) {
        setSavedStudies(JSON.parse(storedItems));
      }
    } catch (error) {
      console.error("Failed to load studies from localStorage", error);
    }
  }, []);

  const saveStudy = useCallback((study: SavedStudy) => {
    setSavedStudies(prevStudies => {
      const newStudies = [study, ...prevStudies];
      try {
        window.localStorage.setItem(LIBRARY_KEY, JSON.stringify(newStudies));
      } catch (error) {
        console.error("Failed to save study to localStorage", error);
      }
      return newStudies;
    });
  }, []);

  const deleteStudy = useCallback((id: string) => {
    setSavedStudies(prevStudies => {
      const newStudies = prevStudies.filter(study => study.id !== id);
      try {
        window.localStorage.setItem(LIBRARY_KEY, JSON.stringify(newStudies));
      } catch (error) {
        console.error("Failed to update library in localStorage", error);
      }
      return newStudies;
    });
  }, []);

  return { savedStudies, saveStudy, deleteStudy };
};

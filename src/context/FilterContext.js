import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { DEFAULT_FILTERS } from '../data/filters';
import { loadStoredFilters, saveStoredFilters } from '../hooks/useFilterPersistence';

const STORAGE_KEY = '@clothestore/filters';

const FilterContext = createContext(null);

function contextKey(genero, categoria) {
  return `${genero.id || genero}::${categoria.id || categoria}`;
}

function buildInitialState() {
  return {};
}

export function FilterProvider({ children }) {
  const [filterMap, setFilterMap] = useState(buildInitialState);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    let active = true;
    loadStoredFilters(STORAGE_KEY).then((stored) => {
      if (!active) return;
      if (stored && typeof stored === 'object') {
        setFilterMap(stored);
      }
      setHydrated(true);
    });
    return () => {
      active = false;
    };
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    saveStoredFilters(STORAGE_KEY, filterMap);
  }, [filterMap, hydrated]);

  const getFiltersFor = useCallback(
    (genero, categoria) => {
      const key = contextKey(genero, categoria);
      return filterMap[key] || DEFAULT_FILTERS;
    },
    [filterMap],
  );

  const setFiltersFor = useCallback((genero, categoria, filters) => {
    const key = contextKey(genero, categoria);
    setFilterMap((prev) => ({
      ...prev,
      [key]: { ...DEFAULT_FILTERS, ...filters },
    }));
  }, []);

  const resetFiltersFor = useCallback((genero, categoria) => {
    const key = contextKey(genero, categoria);
    setFilterMap((prev) => {
      const next = { ...prev };
      delete next[key];
      return next;
    });
  }, []);

  const value = {
    hydrated,
    getFiltersFor,
    setFiltersFor,
    resetFiltersFor,
  };

  return <FilterContext.Provider value={value}>{children}</FilterContext.Provider>;
}

export function useFilters() {
  const ctx = useContext(FilterContext);
  if (!ctx) {
    throw new Error('useFilters debe usarse dentro de un FilterProvider');
  }
  return ctx;
}

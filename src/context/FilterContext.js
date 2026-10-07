import { createContext, useCallback, useContext, useEffect, useState } from 'react';
import { DEFAULT_FILTERS, normalizeFilters, normalizeStoredFilterMap } from '../data/filters';
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
  const [persistenceEnabled, setPersistenceEnabled] = useState(false);

  useEffect(() => {
    let active = true;
    loadStoredFilters(STORAGE_KEY).then((result) => {
      if (!active) return;
      if (result?.failed) {
        setHydrated(true);
        return;
      }
      setFilterMap(normalizeStoredFilterMap(result?.value));
      setPersistenceEnabled(true);
      setHydrated(true);
    });
    return () => {
      active = false;
    };
  }, []);

  useEffect(() => {
    if (!hydrated || !persistenceEnabled) return;
    saveStoredFilters(STORAGE_KEY, filterMap);
  }, [filterMap, hydrated, persistenceEnabled]);

  const getFiltersFor = useCallback(
    (genero, categoria) => {
      const key = contextKey(genero, categoria);
      return filterMap[key] || DEFAULT_FILTERS;
    },
    [filterMap],
  );

  const setFiltersFor = useCallback((genero, categoria, filters) => {
    if (!hydrated) return;
    const key = contextKey(genero, categoria);
    setFilterMap((prev) => ({
      ...prev,
      [key]: normalizeFilters(filters),
    }));
  }, [hydrated]);

  const resetFiltersFor = useCallback((genero, categoria) => {
    if (!hydrated) return;
    const key = contextKey(genero, categoria);
    setFilterMap((prev) => {
      const next = { ...prev };
      delete next[key];
      return next;
    });
  }, [hydrated]);

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

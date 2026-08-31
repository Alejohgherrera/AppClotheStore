import { useState, useCallback, useMemo } from 'react';
import { FlatList, ScrollView, StyleSheet, Text, View } from 'react-native';
import { colors, spacing, typography } from '../theme';
import { getProductsByGenderAndCategory } from '../data/categories';
import {
  applyFilters,
  countActiveFilters,
  getActiveFilterChips,
  getPriceRange,
  isPriceFilterActive,
} from '../data/filters';
import { useFilters } from '../context/FilterContext';
import ProductCard from '../components/ProductCard';
import FilterChip from '../components/FilterChip';
import FilterBar from '../components/FilterBar';
import FilterModal from '../components/FilterModal';
import SortModal from '../components/SortModal';

export default function ProductListScreen({ route }) {
  const { genero, categoria } = route.params;
  const { getFiltersFor, setFiltersFor, resetFiltersFor } = useFilters();

  const filters = getFiltersFor(genero, categoria);
  const baseProducts = getProductsByGenderAndCategory(genero.nombre, categoria.nombre);

  const priceRange = useMemo(() => getPriceRange(baseProducts), [baseProducts]);

  const filteredProducts = useMemo(
    () => applyFilters(baseProducts, filters, priceRange),
    [baseProducts, filters, priceRange],
  );

  const [filterModalVisible, setFilterModalVisible] = useState(false);
  const [sortModalVisible, setSortModalVisible] = useState(false);

  const activeChips = getActiveFilterChips(filters, priceRange);
  const activeCount = countActiveFilters(filters);

  const handleApplyFilters = useCallback(
    (newFilters) => {
      setFiltersFor(genero, categoria, newFilters);
      setFilterModalVisible(false);
    },
    [genero, categoria, setFiltersFor],
  );

  const handleSelectSort = useCallback(
    (sortBy) => {
      setFiltersFor(genero, categoria, { ...filters, sortBy });
      setSortModalVisible(false);
    },
    [genero, categoria, filters, setFiltersFor],
  );

  const handleRemoveChip = useCallback(
    (key) => {
      if (key === 'precio') {
        setFiltersFor(genero, categoria, {
          ...filters,
          precioMin: priceRange.min,
          precioMax: priceRange.max,
        });
      } else if (key === 'tallas') {
        setFiltersFor(genero, categoria, { ...filters, tallas: [] });
      } else if (key === 'colores') {
        setFiltersFor(genero, categoria, { ...filters, colores: [] });
      } else if (key === 'disponibles') {
        setFiltersFor(genero, categoria, { ...filters, soloDisponibles: false });
      }
    },
    [genero, categoria, filters, priceRange, setFiltersFor],
  );

  if (baseProducts.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyTitle}>Próximamente</Text>
        <Text style={styles.emptyMessage}>
          Aún no hay prendas disponibles en esta categoría.
        </Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        stickyHeaderIndices={[1]}
      >
        {activeChips.length > 0 && (
          <View style={styles.chipsContainer}>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.chipsScroll}
            >
              {activeChips.map((chip) => (
                <FilterChip
                  key={chip.key}
                  label={chip.label}
                  onRemove={() => handleRemoveChip(chip.key)}
                />
              ))}
            </ScrollView>
          </View>
        )}

        <FilterBar
          onPressFilters={() => setFilterModalVisible(true)}
          onPressSort={() => setSortModalVisible(true)}
          activeFiltersCount={activeCount}
        />
      </ScrollView>

      <FlatList
        data={filteredProducts}
        keyExtractor={(producto) => producto.id}
        renderItem={({ item }) => <ProductCard producto={item} />}
        numColumns={2}
        columnWrapperStyle={styles.column}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View style={styles.noResultsContainer}>
            <Text style={styles.noResultsTitle}>Sin resultados</Text>
            <Text style={styles.noResultsMessage}>
              Ajusta los filtros para ver más productos.
            </Text>
          </View>
        }
      />

      <FilterModal
        visible={filterModalVisible}
        initialFilters={filters}
        priceRange={priceRange}
        onApply={handleApplyFilters}
        onClose={() => setFilterModalVisible(false)}
      />

      <SortModal
        visible={sortModalVisible}
        currentSort={filters.sortBy}
        onSelect={handleSelectSort}
        onClose={() => setSortModalVisible(false)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  scrollContent: {
    paddingBottom: spacing.sm,
  },
  chipsContainer: {
    backgroundColor: colors.background,
    paddingTop: spacing.sm,
  },
  chipsScroll: {
    paddingHorizontal: spacing.md,
    gap: spacing.xs,
    flexDirection: 'row',
  },
  emptyContainer: {
    flex: 1,
    backgroundColor: colors.background,
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.xs,
    padding: spacing.lg,
  },
  emptyTitle: {
    ...typography.subheading,
    color: colors.textPrimary,
    textTransform: 'uppercase',
    letterSpacing: 3,
  },
  emptyMessage: {
    ...typography.body,
    color: colors.textSecondary,
    textAlign: 'center',
  },
  noResultsContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: spacing.xxl,
    paddingHorizontal: spacing.lg,
  },
  noResultsTitle: {
    ...typography.subheading,
    color: colors.textPrimary,
    marginBottom: spacing.xs,
  },
  noResultsMessage: {
    ...typography.body,
    color: colors.textSecondary,
    textAlign: 'center',
  },
  listContent: {
    padding: spacing.md,
    gap: spacing.md,
  },
  column: {
    gap: spacing.md,
  },
});

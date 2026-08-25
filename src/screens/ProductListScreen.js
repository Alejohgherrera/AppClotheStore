import { FlatList, StyleSheet, Text, View } from 'react-native';
import { colors, spacing, typography } from '../theme';
import { getProductsByGenderAndCategory } from '../data/categories';
import ProductCard from '../components/ProductCard';

export default function ProductListScreen({ route }) {
  const { genero, categoria } = route.params;
  const filteredProducts = getProductsByGenderAndCategory(
    genero.nombre,
    categoria.nombre,
  );

  if (filteredProducts.length === 0) {
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
      <FlatList
        data={filteredProducts}
        keyExtractor={(producto) => producto.id}
        renderItem={({ item }) => <ProductCard producto={item} />}
        numColumns={2}
        columnWrapperStyle={styles.column}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
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
  listContent: {
    padding: spacing.md,
    gap: spacing.md,
  },
  column: {
    gap: spacing.md,
  },
});

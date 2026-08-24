import { FlatList, StyleSheet, View } from 'react-native';
import { colors, spacing } from '../theme';
import { products } from '../data/products';
import ProductCard from '../components/ProductCard';

export default function CatalogScreen() {
  return (
    <View style={styles.container}>
      <FlatList
        data={products}
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
  listContent: {
    padding: spacing.md,
    gap: spacing.md,
  },
  column: {
    gap: spacing.md,
  },
});

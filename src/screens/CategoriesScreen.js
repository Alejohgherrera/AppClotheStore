import { FlatList, StyleSheet, View } from 'react-native';
import { colors, spacing } from '../theme';
import { categoriesByGender } from '../data/categories';
import CategoryCard from '../components/CategoryCard';

export default function CategoriesScreen({ navigation, route }) {
  const { genero } = route.params;
  const categories = categoriesByGender[genero.id];

  return (
    <View style={styles.container}>
      <FlatList
        data={categories}
        keyExtractor={(categoria) => categoria.id}
        renderItem={({ item }) => (
          <CategoryCard
            categoria={item}
            onPress={() =>
              navigation.navigate('Products', { genero, categoria: item })
            }
          />
        )}
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

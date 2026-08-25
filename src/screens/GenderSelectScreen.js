import { FlatList, StyleSheet, View } from 'react-native';
import { colors, spacing } from '../theme';
import { genders } from '../data/categories';
import GenderCard from '../components/GenderCard';

export default function GenderSelectScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <FlatList
        data={genders}
        keyExtractor={(genero) => genero.id}
        renderItem={({ item }) => (
          <GenderCard
            genero={item}
            onPress={() => navigation.navigate('Categories', { genero: item })}
          />
        )}
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
});

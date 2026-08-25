import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import { colors, radius, spacing, typography } from '../theme';

export default function CategoryCard({ categoria, onPress }) {
  return (
    <Pressable
      style={({ pressed }) => [styles.card, pressed && styles.cardPressed]}
      onPress={onPress}
    >
      <View style={styles.imageContainer}>
        <Image
          source={categoria.imagen}
          style={styles.image}
          resizeMode="cover"
        />
      </View>
      <Text style={styles.name} numberOfLines={1}>
        {categoria.nombre}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    flex: 1,
    backgroundColor: colors.surface,
    borderRadius: radius.md,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: colors.border,
  },
  cardPressed: {
    borderColor: colors.borderStrong,
  },
  imageContainer: {
    width: '100%',
    aspectRatio: 3 / 4,
    backgroundColor: colors.surfaceRaised,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  name: {
    ...typography.body,
    color: colors.textPrimary,
    textAlign: 'center',
    paddingVertical: spacing.sm + 2,
  },
});

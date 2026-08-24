import { Image, StyleSheet, Text, View } from 'react-native';
import { colors, radius, spacing, typography } from '../theme';
import { formatPrice } from '../data/products';

export default function ProductCard({ producto }) {
  const { imagen, nombre, precio, categoria, disponible } = producto;

  return (
    <View style={styles.card}>
      <View style={styles.imageContainer}>
        <Image
          source={imagen}
          style={[styles.image, !disponible && styles.imageUnavailable]}
          resizeMode="cover"
        />
        {!disponible && (
          <View style={styles.badge}>
            <Text style={styles.badgeText}>Agotado</Text>
          </View>
        )}
      </View>
      <View style={styles.info}>
        <Text style={styles.category} numberOfLines={1}>
          {categoria}
        </Text>
        <Text style={styles.name} numberOfLines={2}>
          {nombre}
        </Text>
        <Text style={styles.price}>{formatPrice(precio)}</Text>
      </View>
    </View>
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
  imageUnavailable: {
    opacity: 0.35,
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
  badge: {
    position: 'absolute',
    top: spacing.sm,
    right: spacing.sm,
    backgroundColor: colors.background,
    borderRadius: radius.pill,
    paddingHorizontal: spacing.sm + 2,
    paddingVertical: 4,
    borderWidth: 1,
    borderColor: colors.borderStrong,
  },
  badgeText: {
    ...typography.caption,
    color: colors.textPrimary,
    textTransform: 'uppercase',
  },
  info: {
    padding: spacing.sm + 4,
    gap: 2,
  },
  category: {
    ...typography.caption,
    color: colors.textDisabled,
    textTransform: 'uppercase',
  },
  name: {
    ...typography.body,
    color: colors.textPrimary,
  },
  price: {
    ...typography.highlight,
    color: colors.accent,
    marginTop: spacing.xs,
  },
});

import { useState } from 'react';
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import { colors, radius, spacing, typography } from '../theme';
import { formatPrice } from '../data/products';
import { useCart } from '../context/CartContext';

export default function ProductDetailScreen({ route, navigation }) {
  const { producto, genero, categoria } = route.params;
  const { imagenes, nombre, precio, descripcion, tallas, colores, disponible } = producto;

  const [selectedSize, setSelectedSize] = useState(null);
  const [selectedColor, setSelectedColor] = useState(colores[0] || null);
  const [added, setAdded] = useState(false);
  const { addItem } = useCart();

  const handleAddToCart = () => {
    if (!selectedSize) {
      console.log(' Seleccione una talla');
      return;
    }
    if (colores.length > 1 && !selectedColor) {
      console.log(' Seleccione un color');
      return;
    }

    addItem(producto, selectedSize, selectedColor?.nombre, 1);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Image source={imagenes[0]} style={styles.image} resizeMode="cover" />
        {!disponible && (
          <View style={styles.badge}>
            <Text style={styles.badgeText}>Agotado</Text>
          </View>
        )}
      </View>

      <View style={styles.info}>
        <Text style={styles.category}>{categoria}</Text>
        <Text style={styles.name}>{nombre}</Text>
        <Text style={styles.price}>{formatPrice(precio)}</Text>
        {descripcion && (
          <Text style={styles.description}>
            { descripcion}
          </Text>
        )}
      </View>

      {tallas.length > 0 && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Talla</Text>
          <View style={styles.chipGroup}>
            {tallas.map((talla) => (
              <Pressable
                key={talla}
                style={[styles.chip, selectedSize === talla && styles.chipSelected]}
                onPress={() => setSelectedSize(talla)}
              >
                <Text style={[styles.chipText, selectedSize === talla && styles.chipTextSelected]}>
                  {talla}
                </Text>
              </Pressable>
            ))}
          </View>
        </View>
      )}

      {colores.length > 1 && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Color</Text>
          <View style={styles.chipGroup}>
            {colores.map((color) => (
              <Pressable
                key={color.nombre}
                style={[styles.colorChip, selectedColor?.nombre === color.nombre && styles.colorChipSelected]}
                onPress={() => setSelectedColor(color)}
              >
                <View style={[styles.colorDot, { backgroundColor: color.codigo }]} />
                <Text style={[styles.chipText, selectedColor?.nombre === color.nombre && styles.chipTextSelected]}>
                  {color.nombre}
                </Text>
              </Pressable>
            ))}
          </View>
        </View>
      )}

      <Pressable
        style={({ pressed }) => [styles.button, pressed && styles.buttonPressed]}
        onPress={handleAddToCart}
      >
        <Text style={styles.buttonText}>{added ? '✓ Agregado' : ' agregar al carrito'}</Text>
      </Pressable>

      <View style={styles.footer}>
        <Pressable onPress={() => navigation.goBack()}>
          <Text style={styles.footerText}>Volver al catálogo</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    padding: spacing.md,
  },
  imageContainer: {
    width: '100%',
    aspectRatio: 1,
    backgroundColor: colors.surface,
    borderRadius: radius.md,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: colors.border,
    position: 'relative',
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
    marginTop: spacing.lg,
    gap: spacing.xs,
  },
  category: {
    ...typography.caption,
    color: colors.textDisabled,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  name: {
    ...typography.subheading,
    color: colors.textPrimary,
  },
  price: {
    ...typography.highlight,
    color: colors.accent,
    marginTop: spacing.xs,
  },
  description: {
    ...typography.body,
    color: colors.textSecondary,
    marginTop: spacing.md,
    lineHeight: 22,
  },
  section: {
    marginTop: spacing.xl,
    gap: spacing.sm,
  },
  sectionTitle: {
    ...typography.body,
    color: colors.textPrimary,
    fontWeight: '600',
  },
  chipGroup: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.xs + 2,
    marginTop: spacing.sm,
  },
  chip: {
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.pill,
    paddingVertical: spacing.xs + 2,
    paddingHorizontal: spacing.sm + 2,
  },
  chipSelected: {
    backgroundColor: colors.surfaceRaised,
    borderColor: colors.accent,
  },
  chipText: {
    ...typography.caption,
    color: colors.textSecondary,
  },
  chipTextSelected: {
    color: colors.textPrimary,
    fontWeight: '600',
  },
  colorChip: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.pill,
    paddingVertical: spacing.xs + 2,
    paddingHorizontal: spacing.sm + 2,
    gap: spacing.xs,
  },
  colorChipSelected: {
    backgroundColor: colors.surfaceRaised,
    borderColor: colors.accent,
  },
  colorDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: colors.borderStrong,
  },
  button: {
    backgroundColor: colors.accent,
    borderRadius: radius.md,
    paddingVertical: spacing.md - 2,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: spacing.xl,
  },
  buttonPressed: {
    backgroundColor: colors.interactive.pressed,
  },
  buttonText: {
    ...typography.body,
    color: colors.onAccent,
    fontWeight: '700',
  },
  footer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: spacing.xl,
  },
  footerText: {
    ...typography.caption,
    color: colors.textSecondary,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
});
import { useEffect, useRef, useState } from 'react';
import {
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors, radius, spacing, typography } from '../theme';
import { formatPrice } from '../data/products';
import {
  getAvailableColors,
  getAvailableSizes,
  getProductStock,
  getVariantStock,
} from '../data/inventory';
import { CART_ACTION_ERRORS, useCart } from '../context/CartContext';

const feedbackMessages = {
  [CART_ACTION_ERRORS.NOT_HYDRATED]: 'El carrito se está cargando. Inténtalo de nuevo.',
  [CART_ACTION_ERRORS.PRODUCT_UNAVAILABLE]: 'Este producto no está disponible.',
  [CART_ACTION_ERRORS.OUT_OF_STOCK]: 'Esta combinación está agotada.',
  [CART_ACTION_ERRORS.INVALID_VARIANT]: 'Selecciona una talla y un color válidos.',
  [CART_ACTION_ERRORS.INVALID_QUANTITY]: 'La cantidad no es válida.',
};

export default function ProductDetailScreen({ route, navigation }) {
  const { producto, categoria } = route.params;
  const {
    imagenes,
    nombre,
    precio,
    descripcion,
    tallas = [],
    colores = [],
    disponible,
    id,
  } = producto;
  const productImages = Array.isArray(imagenes) && imagenes.length > 0 ? imagenes : [];
  const [selectedSize, setSelectedSize] = useState(null);
  const [selectedColor, setSelectedColor] = useState(null);
  const [feedback, setFeedback] = useState(null);
  const feedbackTimer = useRef(null);
  const { addItem, hydrated } = useCart();

  const availableSizes = getAvailableSizes(producto);
  const availableColors = getAvailableColors(producto);
  const productStock = getProductStock(producto);
  const isSoldOut = !disponible || productStock <= 0;
  const isSizeAvailable = (talla) => availableSizes.includes(talla);
  const isColorAvailable = (color) => availableColors.includes(color?.nombre);

  const selectedVariantStock =
    selectedSize && selectedColor
      ? getVariantStock(id, selectedSize, selectedColor.nombre)
      : null;
  const selectedVariantSoldOut = selectedVariantStock === 0;

  useEffect(() => {
    return () => {
      if (feedbackTimer.current) clearTimeout(feedbackTimer.current);
    };
  }, []);

  const showFeedback = (message, type = 'error') => {
    if (feedbackTimer.current) clearTimeout(feedbackTimer.current);
    setFeedback({ message, type });
    feedbackTimer.current = setTimeout(() => setFeedback(null), 2500);
  };

  const handleSelectSize = (talla) => {
    if (!isSizeAvailable(talla)) {
      showFeedback(`No quedan existencias en la talla ${talla}.`);
      return;
    }
    setSelectedSize(talla);
  };

  const handleSelectColor = (color) => {
    if (!isColorAvailable(color)) {
      showFeedback(`No quedan existencias en ${color.nombre}.`);
      return;
    }
    setSelectedColor(color);
  };

  const handleAddToCart = () => {
    if (isSoldOut) {
      showFeedback('Este producto está agotado.');
      return;
    }
    if (!hydrated) {
      showFeedback(feedbackMessages[CART_ACTION_ERRORS.NOT_HYDRATED]);
      return;
    }
    if (tallas.length > 0 && !selectedSize) {
      showFeedback('Selecciona una talla.');
      return;
    }
    if (colores.length > 0 && !selectedColor) {
      showFeedback('Selecciona un color.');
      return;
    }
    if (selectedVariantSoldOut) {
      showFeedback(feedbackMessages[CART_ACTION_ERRORS.OUT_OF_STOCK]);
      return;
    }

    const result = addItem(
      producto,
      selectedSize,
      selectedColor?.nombre,
      1,
    );

    if (!result?.ok) {
      if (result?.reason === CART_ACTION_ERRORS.INSUFFICIENT_STOCK && result.remaining > 0) {
        showFeedback(`Solo quedan ${result.remaining} unidades disponibles.`);
        return;
      }
      showFeedback(feedbackMessages[result?.reason] || 'No se pudo agregar el producto.');
      return;
    }

    showFeedback('Agregado al carrito.', 'success');
  };

  return (
    <SafeAreaView edges={['bottom']} style={styles.safeArea}>
      <ScrollView
        testID="producto-detalle-scroll"
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.imageContainer}>
          {productImages.length > 0 ? (
            <ScrollView
              horizontal
              pagingEnabled
              showsHorizontalScrollIndicator={false}
              accessibilityLabel={`Imágenes de ${nombre}`}
            >
              {productImages.map((image, index) => (
                <Image
                  key={`${nombre}-${index}`}
                  source={image}
                  style={styles.image}
                  resizeMode="cover"
                  accessibilityLabel={`Imagen ${index + 1} de ${nombre}`}
                />
              ))}
            </ScrollView>
          ) : (
            <View style={styles.imagePlaceholder}>
              <Text style={styles.imagePlaceholderText}>Sin imagen disponible</Text>
            </View>
          )}
          {isSoldOut && (
            <View style={styles.badge}>
              <Text style={styles.badgeText}>Agotado</Text>
            </View>
          )}
        </View>

        <View style={styles.info}>
          <Text style={styles.category}>{categoria}</Text>
          <Text style={styles.name}>{nombre}</Text>
          <Text style={styles.price}>{formatPrice(precio)}</Text>
          {descripcion && <Text style={styles.description}>{descripcion}</Text>}
          {!isSoldOut && productStock > 0 && (
            <Text style={styles.stockHint}>
              {productStock === 1
                ? 'Queda 1 unidad'
                : `Quedan ${productStock} unidades`}
            </Text>
          )}
        </View>

        {tallas.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Talla</Text>
            <View style={styles.chipGroup}>
              {tallas.map((talla) => {
                const agotada = !isSizeAvailable(talla);
                return (
                  <Pressable
                    key={talla}
                    accessibilityLabel={
                      agotada
                        ? `Talla ${talla} agotada`
                        : `Seleccionar talla ${talla}`
                    }
                    accessibilityRole="button"
                    accessibilityState={{
                      selected: selectedSize === talla,
                      disabled: agotada,
                    }}
                    style={[
                      styles.chip,
                      selectedSize === talla && styles.chipSelected,
                      agotada && styles.chipSoldOut,
                    ]}
                    onPress={() => handleSelectSize(talla)}
                  >
                    <Text
                      style={[
                        styles.chipText,
                        selectedSize === talla && styles.chipTextSelected,
                        agotada && styles.chipTextSoldOut,
                      ]}
                    >
                      {talla}
                    </Text>
                  </Pressable>
                );
              })}
            </View>
          </View>
        )}

        {colores.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Color</Text>
            <View style={styles.chipGroup}>
              {colores.map((color) => {
                const agotado = !isColorAvailable(color);
                return (
                  <Pressable
                    key={color.nombre}
                    accessibilityLabel={
                      agotado
                        ? `Color ${color.nombre} agotado`
                        : `Seleccionar color ${color.nombre}`
                    }
                    accessibilityRole="button"
                    accessibilityState={{
                      selected: selectedColor?.nombre === color.nombre,
                      disabled: agotado,
                    }}
                    style={[
                      styles.colorChip,
                      selectedColor?.nombre === color.nombre && styles.colorChipSelected,
                      agotado && styles.chipSoldOut,
                    ]}
                    onPress={() => handleSelectColor(color)}
                  >
                    <View style={[styles.colorDot, { backgroundColor: color.codigo }]} />
                    <Text
                      style={[
                        styles.chipText,
                        selectedColor?.nombre === color.nombre && styles.chipTextSelected,
                        agotado && styles.chipTextSoldOut,
                      ]}
                    >
                      {color.nombre}
                    </Text>
                  </Pressable>
                );
              })}
            </View>
          </View>
        )}

        <Pressable
          accessibilityLabel={isSoldOut ? 'Producto agotado' : 'Agregar al carrito'}
          accessibilityRole="button"
          accessibilityState={{ disabled: isSoldOut || !hydrated }}
          disabled={isSoldOut || !hydrated}
          style={({ pressed }) => [
            styles.button,
            (isSoldOut || !hydrated) && styles.buttonDisabled,
            pressed && styles.buttonPressed,
          ]}
          onPress={handleAddToCart}
        >
          <Text style={styles.buttonText}>
            {isSoldOut
              ? 'Producto agotado'
              : !hydrated
                ? 'Cargando carrito…'
                : feedback?.type === 'success'
                  ? '✓ Agregado'
                  : 'Agregar al carrito'}
          </Text>
        </Pressable>

        {feedback && (
          <Text
            accessibilityLiveRegion="polite"
            style={[styles.feedback, feedback.type === 'success' ? styles.feedbackSuccess : styles.feedbackError]}
          >
            {feedback.message}
          </Text>
        )}

        <View style={styles.footer}>
          <Pressable
            accessibilityLabel="Volver al catálogo"
            accessibilityRole="button"
            onPress={() => navigation.goBack()}
          >
            <Text style={styles.footerText}>Volver al catálogo</Text>
          </Pressable>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    padding: spacing.md,
    paddingBottom: spacing.xxl,
    gap: spacing.xs,
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
  imagePlaceholder: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: spacing.md,
  },
  imagePlaceholderText: {
    ...typography.body,
    color: colors.textSecondary,
    textAlign: 'center',
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
  stockHint: {
    ...typography.caption,
    color: colors.textDisabled,
    marginTop: spacing.xs,
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
    minHeight: 44,
    justifyContent: 'center',
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
  chipSoldOut: {
    backgroundColor: colors.surface,
    borderColor: colors.border,
    opacity: 0.45,
  },
  chipTextSoldOut: {
    color: colors.textDisabled,
    textDecorationLine: 'line-through',
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
    minHeight: 44,
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
    minHeight: 48,
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
  buttonDisabled: {
    backgroundColor: colors.interactive.disabled,
  },
  buttonText: {
    ...typography.body,
    color: colors.onAccent,
    fontWeight: '700',
  },
  feedback: {
    ...typography.caption,
    textAlign: 'center',
    marginTop: spacing.sm,
  },
  feedbackSuccess: {
    color: colors.accent,
  },
  feedbackError: {
    color: colors.textSecondary,
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

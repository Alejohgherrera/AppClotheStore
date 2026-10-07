import {
  ActivityIndicator,
  Alert,
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { colors, radius, spacing, typography } from '../theme';
import { formatPrice } from '../data/products';
import { useCart } from '../context/CartContext';
import ProductCard from '../components/ProductCard';

export default function CartScreen({ navigation }) {
  const { items, total, count, hydrated, updateQuantity, removeItem, clearCart } = useCart();

  const handleClearCart = () => {
    Alert.alert(
      'Vaciar carrito',
      '¿Quieres eliminar todos los productos del carrito?',
      [
        { text: 'Cancelar', style: 'cancel' },
        { text: 'Vaciar', style: 'destructive', onPress: clearCart },
      ],
    );
  };

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <ProductCard producto={item.producto} />
      <View style={styles.info}>
        <Text style={styles.detail}>Talla: {item.talla || 'Única'}</Text>
        {item.color && <Text style={styles.detail}>Color: {item.color}</Text>}
        <Text style={styles.price}>{formatPrice(item.producto.precio * item.cantidad)}</Text>
      </View>
      <View style={styles.actions}>
        <Pressable
          accessibilityLabel={`Disminuir cantidad de ${item.producto.nombre}`}
          accessibilityRole="button"
          accessibilityState={{ disabled: item.cantidad <= 1 }}
          disabled={item.cantidad <= 1}
          style={({ pressed }) => [
            styles.quantityButton,
            item.cantidad <= 1 && styles.quantityButtonDisabled,
            pressed && styles.quantityButtonPressed,
          ]}
          onPress={() => updateQuantity(item.id, item.cantidad - 1)}
        >
          <Text style={styles.quantityText}>−</Text>
        </Pressable>
        <Text accessibilityLabel={`Cantidad: ${item.cantidad}`} style={styles.quantity}>
          {item.cantidad}
        </Text>
        <Pressable
          accessibilityLabel={`Aumentar cantidad de ${item.producto.nombre}`}
          accessibilityRole="button"
          style={({ pressed }) => [
            styles.quantityButton,
            pressed && styles.quantityButtonPressed,
          ]}
          onPress={() => updateQuantity(item.id, item.cantidad + 1)}
        >
          <Text style={styles.quantityText}>+</Text>
        </Pressable>
        <Pressable
          accessibilityLabel={`Eliminar ${item.producto.nombre} del carrito`}
          accessibilityRole="button"
          style={styles.removeButton}
          onPress={() => removeItem(item.id)}
        >
          <Text style={styles.removeText}>Eliminar</Text>
        </Pressable>
      </View>
    </View>
  );

  if (!hydrated) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator color={colors.accent} size="large" />
        <Text style={styles.loadingText}>Cargando carrito…</Text>
      </View>
    );
  }

  if (items.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyTitle}>Carrito vacío</Text>
        <Text style={styles.emptyMessage}>
          Agrega productos para comenzar tu compra.
        </Text>
        <Pressable
          accessibilityLabel="Explorar catálogo"
          accessibilityRole="button"
          style={styles.catalogButton}
          onPress={() => navigation.navigate('Catalog')}
        >
          <Text style={styles.catalogButtonText}>Explorar catálogo</Text>
        </Pressable>
      </View>
    );
  }

  const itemLabel = count === 1 ? 'artículo' : 'artículos';

  return (
    <View style={styles.container}>
      <FlatList
        data={items}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
      />
      <View style={styles.footer}>
        <View style={styles.summary}>
          <Text style={styles.summaryLabel}>Total ({count} {itemLabel})</Text>
          <Text style={styles.summaryValue}>{formatPrice(total)}</Text>
        </View>
        <Pressable
          accessibilityLabel="Finalizar compra, próximamente"
          accessibilityRole="button"
          accessibilityState={{ disabled: true }}
          disabled
          style={styles.checkoutButton}
        >
          <Text style={styles.checkoutText}>Checkout próximamente</Text>
        </Pressable>
        <Pressable
          accessibilityLabel="Vaciar carrito"
          accessibilityRole="button"
          style={styles.clearButton}
          onPress={handleClearCart}
        >
          <Text style={styles.clearText}>Vaciar carrito</Text>
        </Pressable>
      </View>
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
  card: {
    backgroundColor: colors.surface,
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: colors.border,
    overflow: 'hidden',
  },
  info: {
    padding: spacing.md,
    gap: spacing.xs,
  },
  detail: {
    ...typography.caption,
    color: colors.textSecondary,
  },
  price: {
    ...typography.highlight,
    color: colors.accent,
    marginTop: spacing.xs,
  },
  actions: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: spacing.md,
    paddingBottom: spacing.md,
    gap: spacing.sm,
  },
  quantityButton: {
    backgroundColor: colors.surfaceRaised,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.sm,
    width: 44,
    height: 44,
    alignItems: 'center',
    justifyContent: 'center',
  },
  quantityButtonPressed: {
    backgroundColor: colors.interactive.pressed,
  },
  quantityButtonDisabled: {
    opacity: 0.4,
  },
  quantityText: {
    ...typography.body,
    color: colors.textPrimary,
    fontWeight: '700',
  },
  quantity: {
    ...typography.body,
    color: colors.textPrimary,
    fontWeight: '600',
    minWidth: 24,
    textAlign: 'center',
  },
  removeButton: {
    marginLeft: 'auto',
    minHeight: 44,
    justifyContent: 'center',
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.md,
    borderRadius: radius.sm,
    backgroundColor: colors.surfaceRaised,
    borderWidth: 1,
    borderColor: colors.border,
  },
  removeText: {
    ...typography.caption,
    color: colors.textPrimary,
    fontWeight: '600',
  },
  footer: {
    padding: spacing.md,
    borderTopWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.surface,
    gap: spacing.sm,
  },
  summary: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  summaryLabel: {
    ...typography.body,
    color: colors.textSecondary,
  },
  summaryValue: {
    ...typography.highlight,
    color: colors.accent,
  },
  checkoutButton: {
    minHeight: 48,
    backgroundColor: colors.interactive.disabled,
    borderRadius: radius.md,
    paddingVertical: spacing.md - 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkoutText: {
    ...typography.body,
    color: colors.textSecondary,
    fontWeight: '700',
  },
  clearButton: {
    minHeight: 44,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: radius.sm,
  },
  clearText: {
    ...typography.caption,
    color: colors.textSecondary,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  loadingContainer: {
    flex: 1,
    backgroundColor: colors.background,
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.sm,
  },
  loadingText: {
    ...typography.body,
    color: colors.textSecondary,
  },
  emptyContainer: {
    flex: 1,
    backgroundColor: colors.background,
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.sm,
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
  catalogButton: {
    minHeight: 44,
    marginTop: spacing.sm,
    paddingHorizontal: spacing.lg,
    justifyContent: 'center',
    borderRadius: radius.md,
    backgroundColor: colors.accent,
  },
  catalogButtonText: {
    ...typography.body,
    color: colors.onAccent,
    fontWeight: '700',
  },
});

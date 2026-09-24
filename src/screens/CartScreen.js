import { FlatList, Pressable, StyleSheet, Text, View } from 'react-native';
import { colors, radius, spacing, typography } from '../theme';
import { formatPrice } from '../data/products';
import { useCart } from '../context/CartContext';
import ProductCard from '../components/ProductCard';

export default function CartScreen({ navigation }) {
  const { items, total, count, updateQuantity, removeItem } = useCart();

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <ProductCard producto={item.producto} />
      <View style={styles.info}>
        <Text style={styles.detail}>{item.talla}</Text>
        {item.color && (
          <Text style={styles.detail}>{item.color}</Text>
        )}
        <Text style={styles.price}>{formatPrice(item.producto.precio * item.cantidad)}</Text>
      </View>
      <View style={styles.actions}>
        <Pressable
          style={[styles.quantityButton, item.cantidad <= 1 && styles.quantityButtonDisabled]}
          onPress={() => updateQuantity(item.id, item.cantidad - 1)}
        >
          <Text style={styles.quantityText}>−</Text>
        </Pressable>
        <Text style={styles.quantity}>{item.cantidad}</Text>
        <Pressable
          style={styles.quantityButton}
          onPress={() => updateQuantity(item.id, item.cantidad + 1)}
        >
          <Text style={styles.quantityText}>+</Text>
        </Pressable>
        <Pressable style={styles.removeButton} onPress={() => removeItem(item.id)}>
          <Text style={styles.removeText}>Eliminar</Text>
        </Pressable>
      </View>
    </View>
  );

  if (items.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyTitle}>Carrito vacío</Text>
        <Text style={styles.emptyMessage}>
          Agrega productos para comenzar tu compra.
        </Text>
      </View>
    );
  }

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
          <Text style={styles.summaryLabel}>Total ({count} artículos)</Text>
          <Text style={styles.summaryValue}>{formatPrice(total)}</Text>
        </View>
        <Pressable style={styles.checkoutButton}>
          <Text style={styles.checkoutText}>Finalizar compra</Text>
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
    width: 36,
    height: 36,
    alignItems: 'center',
    justifyContent: 'center',
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
    backgroundColor: colors.accent,
    borderRadius: radius.md,
    paddingVertical: spacing.md - 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkoutText: {
    ...typography.body,
    color: colors.onAccent,
    fontWeight: '700',
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
});
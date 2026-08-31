import { useEffect, useState } from 'react';
import {
  Modal,
  Pressable,
  ScrollView,
  StyleSheet,
  Switch,
  Text,
  TextInput,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors, radius, spacing, typography } from '../theme';
import { availableSizes } from '../data/sizes';
import { availableColors } from '../data/colors';
import { DEFAULT_FILTERS } from '../data/filters';

function PriceInput({ label, value, onChangeText }) {
  return (
    <View style={styles.priceInputGroup}>
      <Text style={styles.inputLabel}>{label}</Text>
      <TextInput
        style={styles.priceInput}
        value={value === Infinity || value === null || value === undefined ? '' : String(value)}
        onChangeText={(text) => {
          const cleaned = text.replace(/[^0-9]/g, '');
          onChangeText(cleaned === '' ? '' : Number(cleaned));
        }}
        keyboardType="numeric"
        placeholder="—"
        placeholderTextColor={colors.textDisabled}
      />
    </View>
  );
}

function MultiSelectChip({ label, selected, onPress, leading }) {
  return (
    <Pressable
      onPress={onPress}
      style={[styles.chip, selected && styles.chipSelected]}
    >
      {leading}
      <Text style={[styles.chipText, selected && styles.chipTextSelected]}>
        {label}
      </Text>
    </Pressable>
  );
}

export default function FilterModal({
  visible,
  initialFilters,
  priceRange,
  onApply,
  onClose,
}) {
  const [localFilters, setLocalFilters] = useState(initialFilters);

  useEffect(() => {
    if (visible) {
      setLocalFilters(initialFilters);
    }
  }, [visible, initialFilters]);

  const toggleSize = (size) => {
    setLocalFilters((prev) => {
      const exists = prev.tallas.includes(size);
      return {
        ...prev,
        tallas: exists ? prev.tallas.filter((s) => s !== size) : [...prev.tallas, size],
      };
    });
  };

  const toggleColor = (color) => {
    setLocalFilters((prev) => {
      const exists = prev.colores.includes(color);
      return {
        ...prev,
        colores: exists ? prev.colores.filter((c) => c !== color) : [...prev.colores, color],
      };
    });
  };

  const handleClear = () => {
    setLocalFilters({
      ...DEFAULT_FILTERS,
      sortBy: localFilters.sortBy,
    });
  };

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent
      onRequestClose={onClose}
      statusBarTranslucent
    >
      <Pressable style={styles.backdrop} onPress={onClose} />
      <SafeAreaView edges={['bottom']} style={styles.sheet}>
        <View style={styles.handle} />
        <View style={styles.header}>
          <Text style={styles.title}>Filtros</Text>
          <Pressable onPress={onClose} hitSlop={8}>
            <Text style={styles.close}>✕</Text>
          </Pressable>
        </View>

        <ScrollView
          contentContainerStyle={styles.content}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Precio (€)</Text>
            <View style={styles.priceRow}>
              <PriceInput
                label="Mín"
                value={localFilters.precioMin}
                onChangeText={(v) =>
                  setLocalFilters((p) => ({
                    ...p,
                    precioMin: v === '' ? priceRange.min : v,
                  }))
                }
              />
              <Text style={styles.priceSeparator}>—</Text>
              <PriceInput
                label="Máx"
                value={localFilters.precioMax === Infinity ? '' : localFilters.precioMax}
                onChangeText={(v) =>
                  setLocalFilters((p) => ({
                    ...p,
                    precioMax: v === '' ? Infinity : v,
                  }))
                }
              />
            </View>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Talla</Text>
            <View style={styles.chipGroup}>
              {availableSizes.map((size) => (
                <MultiSelectChip
                  key={size}
                  label={size}
                  selected={localFilters.tallas.includes(size)}
                  onPress={() => toggleSize(size)}
                />
              ))}
            </View>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Color</Text>
            <View style={styles.chipGroup}>
              {availableColors.map((color) => (
                <MultiSelectChip
                  key={color.nombre}
                  label={color.nombre}
                  selected={localFilters.colores.includes(color.nombre)}
                  onPress={() => toggleColor(color.nombre)}
                  leading={
                    <View
                      style={[
                        styles.colorDot,
                        { backgroundColor: color.codigo },
                      ]}
                    />
                  }
                />
              ))}
            </View>
          </View>

          <View style={styles.section}>
            <View style={styles.switchRow}>
              <Text style={styles.sectionTitle}>Solo disponibles</Text>
              <Switch
                value={localFilters.soloDisponibles}
                onValueChange={(v) =>
                  setLocalFilters((p) => ({ ...p, soloDisponibles: v }))
                }
                trackColor={{ false: colors.border, true: colors.accent }}
                thumbColor={colors.surface}
              />
            </View>
          </View>
        </ScrollView>

        <View style={styles.footer}>
          <Pressable
            style={[styles.footerButton, styles.clearButton]}
            onPress={handleClear}
          >
            <Text style={styles.clearText}>Limpiar</Text>
          </Pressable>
          <Pressable
            style={[styles.footerButton, styles.applyButton]}
            onPress={() => onApply(localFilters)}
          >
            <Text style={styles.applyText}>Aplicar</Text>
          </Pressable>
        </View>
      </SafeAreaView>
    </Modal>
  );
}

const styles = StyleSheet.create({
  backdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.55)',
  },
  sheet: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    maxHeight: '88%',
    backgroundColor: colors.background,
    borderTopLeftRadius: radius.lg,
    borderTopRightRadius: radius.lg,
    borderTopWidth: 1,
    borderColor: colors.border,
  },
  handle: {
    width: 40,
    height: 4,
    borderRadius: radius.pill,
    backgroundColor: colors.borderStrong,
    alignSelf: 'center',
    marginTop: spacing.sm,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.md,
    paddingTop: spacing.sm,
    paddingBottom: spacing.md,
    borderBottomWidth: 1,
    borderColor: colors.border,
  },
  title: {
    ...typography.subheading,
    color: colors.textPrimary,
  },
  close: {
    fontSize: 20,
    color: colors.textSecondary,
    paddingHorizontal: spacing.xs,
  },
  content: {
    padding: spacing.md,
    gap: spacing.lg,
  },
  section: {
    gap: spacing.sm,
  },
  sectionTitle: {
    ...typography.body,
    color: colors.textPrimary,
    fontWeight: '600',
  },
  priceRow: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    gap: spacing.sm,
  },
  priceInputGroup: {
    flex: 1,
    gap: spacing.xs,
  },
  inputLabel: {
    ...typography.caption,
    color: colors.textSecondary,
  },
  priceInput: {
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.sm,
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.sm,
    color: colors.textPrimary,
    fontSize: 16,
  },
  priceSeparator: {
    ...typography.body,
    color: colors.textDisabled,
    paddingBottom: spacing.sm,
  },
  chipGroup: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.xs + 2,
  },
  chip: {
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
  colorDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: colors.borderStrong,
  },
  switchRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  footer: {
    flexDirection: 'row',
    padding: spacing.md,
    gap: spacing.sm,
    borderTopWidth: 1,
    borderColor: colors.border,
  },
  footerButton: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: spacing.md - 2,
    borderRadius: radius.md,
  },
  clearButton: {
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
  },
  clearText: {
    ...typography.body,
    color: colors.textPrimary,
    fontWeight: '600',
  },
  applyButton: {
    backgroundColor: colors.accent,
  },
  applyText: {
    ...typography.body,
    color: colors.onAccent,
    fontWeight: '700',
  },
});

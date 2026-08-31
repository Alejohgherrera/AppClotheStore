import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { colors, radius, spacing, typography } from '../theme';

export default function FilterBar({ onPressFilters, onPressSort, activeFiltersCount }) {
  return (
    <View style={styles.bar}>
      <TouchableOpacity style={styles.button} onPress={onPressFilters}>
        <Text style={styles.icon}>☰</Text>
        <Text style={styles.label}>Filtros</Text>
        {activeFiltersCount > 0 && (
          <View style={styles.badge}>
            <Text style={styles.badgeText}>{activeFiltersCount}</Text>
          </View>
        )}
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={onPressSort}>
        <Text style={styles.icon}>↕</Text>
        <Text style={styles.label}>Ordenar</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  bar: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    gap: spacing.sm,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderRadius: radius.sm,
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.md,
    borderWidth: 1,
    borderColor: colors.border,
    gap: spacing.xs,
  },
  icon: {
    fontSize: 14,
    color: colors.textSecondary,
  },
  label: {
    ...typography.caption,
    color: colors.textPrimary,
  },
  badge: {
    backgroundColor: colors.accent,
    borderRadius: radius.pill,
    minWidth: 18,
    height: 18,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 4,
    marginLeft: 2,
  },
  badgeText: {
    fontSize: 10,
    fontWeight: '700',
    color: colors.onAccent,
  },
});

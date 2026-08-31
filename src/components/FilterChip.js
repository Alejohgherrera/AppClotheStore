import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { colors, radius, spacing, typography } from '../theme';

export default function FilterChip({ label, onRemove }) {
  return (
    <View style={styles.chip}>
      <Text style={styles.label} numberOfLines={1}>
        {label}
      </Text>
      <TouchableOpacity onPress={onRemove} hitSlop={8} style={styles.removeBtn}>
        <Text style={styles.removeText}>✕</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  chip: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surfaceRaised,
    borderRadius: radius.pill,
    paddingVertical: spacing.xs + 2,
    paddingLeft: spacing.sm + 4,
    paddingRight: spacing.xs,
    borderWidth: 1,
    borderColor: colors.border,
    gap: spacing.xs,
    maxWidth: '100%',
  },
  label: {
    ...typography.caption,
    color: colors.textPrimary,
  },
  removeBtn: {
    width: 20,
    height: 20,
    borderRadius: radius.pill,
    backgroundColor: colors.borderStrong,
    alignItems: 'center',
    justifyContent: 'center',
  },
  removeText: {
    fontSize: 10,
    color: colors.textPrimary,
    fontWeight: '700',
  },
});

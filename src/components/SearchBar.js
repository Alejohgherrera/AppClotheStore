import React from 'react';
import { View, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { colors, spacing, radius, typography } from '../theme';

export const SearchBar = ({ onChange, placeholder = 'Buscar productos…', value = '' }) => {
  const handleClear = () => {
    onChange('');
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder={placeholder}
        value={value}
        onChangeText={onChange}
        placeholderTextColor={colors.textDisabled}
      />
      {value && (
        <TouchableOpacity style={styles.clearButton} onPress={handleClear} activeOpacity={0.7}>
          <View style={styles.clearIcon} />
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.md,
    paddingHorizontal: spacing.md,
  },
  input: {
    flex: 1,
    height: 48,
    fontSize: typography.body.fontSize,
    lineHeight: typography.body.lineHeight,
    color: colors.textPrimary,
    paddingRight: spacing.sm,
  },
  clearButton: {
    width: 28,
    height: 28,
    borderRadius: radius.pill,
    backgroundColor: colors.borderStrong,
    justifyContent: 'center',
    alignItems: 'center',
  },
  clearIcon: {
    width: 14,
    height: 14,
    backgroundColor: colors.textSecondary,
    borderRadius: 7,
  },
});
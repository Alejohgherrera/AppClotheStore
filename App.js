import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { colors, spacing, typography } from './src/theme';

export default function App() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>CLOTHES STORE</Text>
      <Text style={styles.subtitle}>Encuentra tu estilo</Text>
      <StatusBar style="light" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.xs,
  },
  title: {
    ...typography.heading,
    color: colors.textPrimary,
  },
  subtitle: {
    ...typography.subheading,
    color: colors.textSecondary,
  },
});

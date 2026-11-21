import { ScrollView, StyleSheet, Text, View } from 'react-native';

import { Colors, Radius, Spacing, Type } from '@/constants/theme';

type Props = {
  title: string;
  route: string;
  /** Path of the design reference in the repo, if this screen has a mockup. */
  mockup?: string;
  /** Build phase from docs/build-plan.md. */
  phase: number;
};

/**
 * Stand-in for a screen that has not been built yet.
 * Replace the whole file's contents when you build the real screen.
 */
export function PlaceholderScreen({ title, route, mockup, phase }: Props) {
  return (
    <ScrollView style={styles.root} contentContainerStyle={styles.content}>
      <Text style={styles.title}>{title}</Text>
      <View style={styles.card}>
        <Text style={styles.label}>Route</Text>
        <Text style={styles.value}>{route}</Text>
        <Text style={styles.label}>Design reference</Text>
        <Text style={styles.value}>{mockup ?? 'Not designed yet'}</Text>
        <Text style={styles.label}>Build phase</Text>
        <Text style={styles.value}>{phase}</Text>
      </View>
      <Text style={styles.note}>This screen is a placeholder.</Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: Colors.background },
  content: { padding: Spacing.xl, paddingTop: 72, gap: Spacing.lg },
  title: { ...Type.title, color: Colors.ink },
  card: {
    backgroundColor: Colors.card,
    borderRadius: Radius.card,
    padding: Spacing.lg,
    gap: Spacing.xs,
  },
  label: { ...Type.label, color: Colors.textSecondary, marginTop: Spacing.sm },
  value: { ...Type.body, color: Colors.ink },
  note: { ...Type.caption, color: Colors.textSecondary },
});

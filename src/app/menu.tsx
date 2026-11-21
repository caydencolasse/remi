import { type Href, Link } from 'expo-router';
import { ScrollView, StyleSheet, Text, View } from 'react-native';

import { APP_ROUTES } from '@/constants/routes';
import { Colors, Radius, Spacing, TouchTarget, Type } from '@/constants/theme';
import { exampleHref } from '@/lib/example-href';

/**
 * Development index of every screen, so each route can be opened on a device
 * before real navigation exists. The real menu (docs/sitemap.md 1.5) replaces this.
 */
export default function MenuScreen() {
  return (
    <ScrollView style={styles.root} contentContainerStyle={styles.content}>
      <Text style={styles.title}>All screens</Text>
      {APP_ROUTES.map((r) => (
        <Link key={r.route} href={exampleHref(r.route) as Href} style={styles.row}>
          <View>
            <Text style={styles.rowTitle}>{r.title}</Text>
            <Text style={styles.rowMeta}>
              {r.route} · phase {r.phase}
              {r.mockup ? '' : ' · not designed'}
            </Text>
          </View>
        </Link>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: Colors.background },
  content: { padding: Spacing.lg, gap: Spacing.sm },
  title: { ...Type.title, color: Colors.ink, marginBottom: Spacing.sm },
  row: {
    minHeight: TouchTarget,
    backgroundColor: Colors.card,
    borderRadius: Radius.card,
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.md,
  },
  rowTitle: { ...Type.bodyStrong, color: Colors.ink },
  rowMeta: { ...Type.caption, color: Colors.textSecondary },
});

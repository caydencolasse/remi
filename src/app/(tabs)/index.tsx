import { Link } from 'expo-router';
import { StyleSheet, View } from 'react-native';

import { PlaceholderScreen } from '@/components/placeholder-screen';
import { Colors, Spacing, Type } from '@/constants/theme';

export default function ChatScreen() {
  return (
    <View style={styles.root}>
      <PlaceholderScreen title="Chat" route="/" mockup="docs/screens/Main.png" phase={1} />
      <Link href="/dev" style={styles.link}>
        Open the list of all screens
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: Colors.background },
  link: { ...Type.bodyStrong, color: Colors.ink, padding: Spacing.xl, textDecorationLine: 'underline' },
});

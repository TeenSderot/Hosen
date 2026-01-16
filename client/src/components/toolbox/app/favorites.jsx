import React, { useMemo } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  I18nManager,
} from 'react-native';
import { useFavorites } from '../hooks/useFavorites';
import { tools } from '../data/toolboxData';
import { Card } from '../Card';
import { Pill } from '../Pill';
import { Colors, cardColors } from '../colors';
import { useNavigation } from '@react-navigation/native';

I18nManager.allowRTL(true);
I18nManager.forceRTL(true);

export default function FavoritesPage() {
  const { favorites, toggleFavorite, isLoaded } = useFavorites();
  const navigation = useNavigation()
  const favoriteTools = useMemo(
    () => tools.filter((t) => favorites.includes(t.id)),
    [favorites]
  );

  if (!isLoaded) {
    return (
      <View style={styles.container}>
        <View style={styles.centerContent}>
          <Text style={styles.loadingText}>טוען...</Text>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.headerBar}>
        {/* <TouchableOpacity
          style={styles.backButton}
          onPress={() => {navigation.navigate('toolbox')}}
        >
          <Text style={styles.backButtonText}>חזרה</Text>
        </TouchableOpacity> */}
        <Text style={styles.headerTitle}> מועדפים</Text>
        <View style={styles.spacer} />
      </View>

      <ScrollView style={styles.scrollView} contentContainerStyle={styles.content}>

        {favoriteTools.length === 0 ? (
          <Card accentColor={Colors.yellow}>
            <Text style={styles.emptyText}>אין עדיין מועדפים.</Text>
            <TouchableOpacity
              style={styles.button}
              onPress={() => {navigation.navigate('toolbox')}}
            >
              <Text style={styles.buttonText}>לבחור כלי</Text>
            </TouchableOpacity>
          </Card>
        ) : (
          favoriteTools.map((tool, index) => (
            <Card key={tool.id} accentColor={cardColors[index % cardColors.length]}>
              <View style={styles.toolRow}>
                <View style={styles.toolContent}>
                  <Text style={styles.toolTitle}>{tool.title}</Text>
                  <Text style={styles.toolDescription}>{tool.description}</Text>
                  <View style={styles.pillRow}>
                    <Pill>
                      {tool.tagEmoji} {tool.tag}
                    </Pill>
                    {tool.duration && (
                      <Pill>⏱️ {tool.duration}</Pill>
                    )}
                  </View>
                </View>
                <View style={styles.actions}>
                  <TouchableOpacity
                    style={styles.actionButton}
                    onPress={() =>{}} //router.push(`/tool/${tool.id}`
                  >
                    <Text style={styles.actionButtonText}>פתיחה</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={[styles.actionButton, styles.removeButton]}
                    onPress={() => toggleFavorite(tool.id)}
                  >
                    <Text style={styles.actionButtonText}>להסיר</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </Card>
          ))
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  headerBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 20,
    paddingTop: 48,
    backgroundColor: Colors.white,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 2,
  },
  backButton: {
    padding: 10,
    borderRadius: 20,
    backgroundColor: Colors.background,
  },
  backButtonText: {
    fontSize: 15,
    color: Colors.text.primary,
    fontFamily: 'Rubik-Medium',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: Colors.text.primary,
    flex: 1,
    textAlign: 'center',
    fontFamily: 'Rubik-Bold',
  },
  spacer: {
    width: 60,
  },
  scrollView: {
    flex: 1,
  },
  content: {
    padding: 20,
    paddingBottom: 32,
  },
  centerContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    fontSize: 16,
    color: Colors.text.secondary,
    fontFamily: 'Rubik-Regular',
    textAlign: 'right',
  },
  emptyText: {
    fontSize: 16,
    color: Colors.text.secondary,
    marginBottom: 16,
    fontFamily: 'Rubik-Regular',
    textAlign: 'right',
  },
  button: {
    marginTop: 8,
    paddingVertical: 12,
    paddingHorizontal: 24,
    backgroundColor: Colors.primary,
    borderRadius: 20,
    alignSelf: 'flex-start',
  },
  buttonText: {
    fontSize: 15,
    color: Colors.white,
    fontFamily: 'Rubik-Medium',
  },
  toolRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12,
  },
  toolContent: {
    flex: 1,
  },
  toolTitle: {
    fontSize: 17,
    fontWeight: '600',
    color: Colors.text.primary,
    marginBottom: 6,
    fontFamily: 'Rubik-SemiBold',
    textAlign: 'right',
  },
  toolDescription: {
    fontSize: 14,
    color: Colors.text.secondary,
    marginBottom: 10,
    fontFamily: 'Rubik-Regular',
    textAlign: 'right',
  },
  pillRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  actions: {
    gap: 8,
  },
  actionButton: {
    paddingVertical: 10,
    paddingHorizontal: 16,
    backgroundColor: Colors.primary,
    borderRadius: 20,
  },
  removeButton: {
    backgroundColor: Colors.accent,
  },
  actionButtonText: {
    fontSize: 14,
    color: Colors.white,
    textAlign: 'center',
    fontFamily: 'Rubik-Medium',
  },
});

import React, { useState, useMemo } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Image,
} from 'react-native';

import { categories, tools } from './data/toolboxData';
import { Card } from './Card';
import { Pill } from './Pill';
import { Colors, cardColors } from './Colors';
import { useNavigation } from "@react-navigation/native";

export default function ToolboxLobby() {
  const [search, setSearch] = useState('');
  const navigation = useNavigation()
  const searchResults = useMemo(() => {
    if (!search.trim()) return [];
    const query = search.trim().toLowerCase();

    return tools
      .filter((tool) => {
        const matchesEmotion = tool.emotions.some((emotion) => {
          const e = emotion.toLowerCase();
          return query.includes(e) || e.includes(query);
        });

        return (
          matchesEmotion ||
          tool.title.toLowerCase().includes(query) ||
          tool.description.toLowerCase().includes(query)
        );
      })
      .slice(0, 6);
  }, [search]);

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollView} contentContainerStyle={styles.content}>
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.breathingButton}
            onPress={() => navigation.navigate('/exercise/breathing')}
          >
            <Image
              source={require('../../../assets/lotus.png')}
              style={styles.lotusImage}
            />
          </TouchableOpacity>
          <Text style={styles.title}>ארגז הכלים</Text>
          <Text style={styles.subtitle}>מה יעזור לי עכשיו?</Text>
        </View>

        <View style={styles.searchContainer}>
          <TextInput
            style={styles.searchInput}
            value={search}
            onChangeText={setSearch}
            placeholder="מה הרגש העיקרי שאני מרגיש כרגע?"
            placeholderTextColor={Colors.text.light}
          />

          {searchResults.length > 0 && (
            <View style={styles.searchResults}>
              {searchResults.map((tool, index) => (
                <Card
                  key={tool.id}
                  onPress={() => {
                    setSearch('');
                    navigation.navigate(`/tool/${tool.id}`);
                  }}
                  accentColor={cardColors[index % cardColors.length]}
                >
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
                </Card>
              ))}
            </View>
          )}
        </View>

        <View style={styles.categories}>
          {categories.map((category, index) => (
            <Card
              key={category.id}
              onPress={() => navigation.navigate(`/category/${category.id}`)}
              accentColor={cardColors[index % cardColors.length]}
            >
              <View style={styles.categoryRow}>
                <View style={styles.categoryContent}>
                  <Text style={styles.emoji}>{category.emoji}</Text>
                  <View style={styles.categoryText}>
                    <Text style={styles.categoryTitle}>{category.title}</Text>
                    <Text style={styles.categoryDescription}>
                      {category.description}
                    </Text>
                  </View>
                </View>
              </View>
            </Card>
          ))}
        </View>

        <View style={styles.bottomButtons}>
          <TouchableOpacity
            style={styles.wisdomButton}
            onPress={() => navigation.navigate('/wisdom')}
          >
            <Text style={styles.wisdomButtonText}>💡 חוכמת ההמונים</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.favoritesButton}
            onPress={() => navigation.navigate('/favorites')}
          >
            <Text style={styles.favoritesButtonText}>⭐ מועדפים</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  scrollView: {
    flex: 1,
  },
  content: {
    padding: 20,
    paddingBottom: 32,
  },
  header: {
    alignItems: 'center',
    marginBottom: 32,
    marginTop: 48,
  },
  breathingButton: {
    position: 'absolute',
    top: 0,
    right: 0,
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: Colors.white,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 5,
  },
  lotusImage: {
    width: 48,
    height: 48,
    borderRadius: 24,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: Colors.text.primary,
    marginBottom: 8,
    fontFamily: 'Rubik-Bold',
  },
  subtitle: {
    fontSize: 18,
    color: Colors.text.secondary,
    fontFamily: 'Rubik-Regular',
  },
  searchContainer: {
    marginBottom: 24,
  },
  searchInput: {
    backgroundColor: Colors.white,
    borderRadius: 20,
    padding: 16,
    fontSize: 15,
    textAlign: 'right',
    fontFamily: 'Rubik-Regular',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 2,
  },
  searchResults: {
    marginTop: 12,
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
  categories: {
    marginBottom: 24,
  },
  categoryRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  categoryContent: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  emoji: {
    fontSize: 32,
    marginRight: 16,
  },
  categoryText: {
    flex: 1,
  },
  categoryTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: Colors.text.primary,
    marginBottom: 4,
    fontFamily: 'Rubik-SemiBold',
    textAlign: 'right',
  },
  categoryDescription: {
    fontSize: 14,
    color: Colors.text.secondary,
    fontFamily: 'Rubik-Regular',
    textAlign: 'right',
  },
  bottomButtons: {
    gap: 16,
  },
  wisdomButton: {
    backgroundColor: Colors.white,
    padding: 20,
    borderRadius: 24,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
  },
  wisdomButtonText: {
    fontSize: 17,
    fontWeight: '600',
    color: Colors.text.primary,
    fontFamily: 'Rubik-SemiBold',
  },
  favoritesButton: {
    backgroundColor: Colors.white,
    padding: 20,
    borderRadius: 24,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
  },
  favoritesButtonText: {
    fontSize: 17,
    fontWeight: '600',
    color: Colors.text.primary,
    fontFamily: 'Rubik-SemiBold',
  },
});

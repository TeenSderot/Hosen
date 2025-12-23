import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';

export const AppLayout = ({ children, title, subtitle, footerContent }) => {
  return (
    <View style={styles.container}>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.headerPadding} />

        {(title || subtitle) && (
          <View style={styles.headerContainer}>
            {title && <Text style={styles.title}>{title}</Text>}
            {subtitle && <Text style={styles.subtitle}>{subtitle}</Text>}
          </View>
        )}

        <View style={styles.contentContainer}>{children}</View>

        {!footerContent && <View style={styles.spacer} />}
      </ScrollView>

      {footerContent && (
        <View style={styles.footerContainer}>
          <View style={styles.footerContent}>{footerContent}</View>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F3F4F6',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
  },
  headerPadding: {
    height: 24,
  },
  headerContainer: {
    paddingHorizontal: 24,
    paddingBottom: 8,
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 8,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#6B7280',
    textAlign: 'center',
    lineHeight: 24,
  },
  contentContainer: {
    flex: 1,
    paddingHorizontal: 24,
    paddingBottom: 24,
    paddingTop: 8,
    // Make sure all inner content is laid out RTL-friendly by default
    writingDirection: 'rtl',
  },
  spacer: {
    height: 32,
  },
  footerContainer: {
    padding: 24,
    paddingBottom: 32,
    backgroundColor: 'transparent',
    marginBottom:50
  },
  footerContent: {
    width: '100%',
  },
});



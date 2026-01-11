import React from 'react';
import { Pressable, Text, View, StyleSheet } from 'react-native';
import { ChevronRight } from 'lucide-react-native'; // Assuming you're using lucide-react-native for icons
import { Commandment } from "./commandments";



const colorClasses = {
  "notebook-green": { bg: "#10B981", border: "#065F46", light: "#D1F7E6" },
  "notebook-lime": { bg: "#84CC16", border: "#4D7C0F", light: "#E1F8B5" },
  "notebook-orange": { bg: "#FB923C", border: "#9C4C26", light: "#FBE0C8" },
  "notebook-blue": { bg: "#3B82F6", border: "#1E40AF", light: "#BFDBFE" },
  "notebook-yellow": { bg: "#FBBF24", border: "#9A6F20", light: "#FBE4A8" },
};

const CommandmentDetail = ({ commandment, onClose }) => {
  const colors = colorClasses[commandment.color] || { bg: "#3B82F6", border: "#1E40AF", light: "#BFDBFE" };

  return (
    <View style={styles.backdrop}>
      {/* Backdrop */}
      <Pressable style={styles.backdrop} onPress={onClose} />

      {/* Modal */}
      <View style={[styles.modal, { backgroundColor: '#FFFFFF' }]}>
        {/* Content */}
        <View style={styles.content}>
          {/* Number badge */}
          <View style={[styles.badge, { backgroundColor: colors.bg }]}>
            <Text style={styles.badgeText}>{commandment.id}</Text>
          </View>

          {/* Title */}
          <Text style={styles.title}>
            {commandment.title}
          </Text>

          {/* Description box */}
          <View style={[styles.descriptionBox, { backgroundColor: '#D7F7F8', borderColor: '#84C7DA' }]}>
            <Text style={styles.descriptionText}>
              {commandment.description}
            </Text>
          </View>

          {/* Back button */}
          <Pressable
            onPress={onClose}
            style={[styles.backButton, { backgroundColor: '#FD954E' }]}
          >
            {/* <ChevronRight style={styles.icon} />*/}
            <Text style={styles.buttonText}>חזרה</Text> 
          </Pressable>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  backdrop: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.1)', // Backdrop with transparency
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 50,
  },
  modal: {
    width: '100%',
    maxWidth: 400,
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    padding: 16,
    position: 'relative',
  },
  content: {
    paddingBottom: 16,
  },
  badge: {
    width: 64,
    height: 64,
    borderRadius: 32,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
  },
  badgeText: {
    color: '#FFF',
    fontWeight: 'bold',
    fontSize: 24,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 24,
    color: '#000',
  },
  descriptionBox: {
    padding: 16,
    borderWidth: 2,
    borderRadius: 16,
  },
  descriptionText: {
    color: '#000',
    textAlign: 'center',
    fontSize: 16,
    lineHeight: 24,
  },
  backButton: {
    width: '100%',
    paddingVertical: 12,
    borderRadius: 30,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 24,
  },
  icon: {
    width: 20,
    height: 20,
    color: '#FFF',
    marginRight: 8,
  },
  buttonText: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default CommandmentDetail;

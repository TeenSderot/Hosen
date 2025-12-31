import { useState } from "react";
import { StyleSheet, View, ScrollView } from "react-native";
import { commandments } from "./commandments";
import NotebookHeader from "./NotebookHeader";
import CommandmentItem from "./CommandmentItem";
import CommandmentDetail from "./CommandmentDetail";

const Divrot = () => {
  const [selectedId, setSelectedId] = useState(null);
  
  const selectedCommandment = selectedId 
    ? commandments.find(c => c.id === selectedId) 
    : null;

  return (
    <View style={styles.container}>
      {/* Notebook container */}
      <View style={styles.notebookContainer}>
        {/* Header */}
        <NotebookHeader />

        {/* Commandments list */}
        <ScrollView contentContainerStyle={styles.commandmentsList}>
          {commandments.map((commandment, index) => (
            <CommandmentItem
              key={commandment.id}
              id={commandment.id}
              title={commandment.title}
              color={commandment.color}
              onClick={() => setSelectedId(commandment.id)}
              delay={index * 50}
            />
          ))}
        </ScrollView>

        {/* Footer decoration */}
        <View style={styles.footerDecoration}>
          <View style={styles.footerLine} />
        </View>
      </View>

      {/* Detail modal */}
      {selectedCommandment && (
        <CommandmentDetail
          commandment={selectedCommandment}
          onClose={() => setSelectedId(null)}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA', // background color
  },
  notebookContainer: {
    maxWidth: '90%',
    alignSelf: 'center',
    flex: 1,
    backgroundColor: '#FFFFFF', // Card color
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  commandmentsList: {
    padding: 16,
  },
  footerDecoration: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    maxWidth: '90%',
    alignSelf: 'center',
  },
  footerLine: {
    height: 1,
    backgroundColor: 'linear-gradient(to right, #4CAF50, #FF9800, #2196F3)', // gradient as background
    opacity: 0.5,
  },
});

export default Divrot;

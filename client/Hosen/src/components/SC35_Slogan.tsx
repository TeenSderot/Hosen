import React, { useState } from 'react';
import { StyleSheet, Text, View, Pressable } from 'react-native';
import AppLayout from '../components/layout/AppLayout';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import { setString } from '../lib/storage';

const suggestions = ['ביחד ננצח', 'משפחה חזקה', 'אנחנו צוות', 'יש בנו כוח'];

export default function SC35_Slogan({ navigation }) {
  const [slogan, setSlogan] = useState('');

  const handleSave = async () => {
    await setString('familySlogan', slogan || 'אנחנו משפחה חזקה');
    navigation.navigate('Communication');
  };

  return (
    <AppLayout>
      <View style={styles.header}>
        <Text style={styles.bigIcon}>🛡️</Text>
        <Text style={styles.h1}>הכוח המשפחתי שלנו</Text>
        <Text style={styles.p}>
          בחרו משפט אחד, קצר וחזק, שילווה אתכם.{'\n'}
          משהו שרק אתם מבינים ונותן לכם כוח.
        </Text>
      </View>

      <View style={styles.card}>
        <Input
          value={slogan}
          onChangeText={setSlogan}
          placeholder={'לדוגמה: "משפחת כהן לא מוותרת", "אנחנו צוות מנצח"'}
        />
      </View>

      <View style={styles.chips}>
        {suggestions.map((s) => (
          <Pressable key={s} onPress={() => setSlogan(s)} style={styles.chip}>
            <Text style={styles.chipText}>{s}</Text>
          </Pressable>
        ))}
      </View>

      <Button title="שמור סיסמה" onPress={handleSave} />
    </AppLayout>
  );
}

const styles = StyleSheet.create({
  header: { alignItems: 'center', gap: 10, paddingVertical: 10 },
  bigIcon: { fontSize: 44 },
  h1: { color: '#E6EEF8', fontSize: 28, fontWeight: '900', textAlign: 'center' },
  p: { color: '#AFC0D6', fontSize: 16, lineHeight: 22, textAlign: 'center' },
  card: {
    backgroundColor: '#101824',
    borderRadius: 18,
    padding: 14,
    borderWidth: 1,
    borderColor: '#233043',
    marginVertical: 10,
  },
  chips: {
    flexDirection: 'row-reverse',
    flexWrap: 'wrap',
    gap: 8,
    justifyContent: 'center',
    marginBottom: 14,
  },
  chip: {
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 999,
    backgroundColor: '#111A27',
    borderWidth: 1,
    borderColor: '#233043',
  },
  chipText: { color: '#AFC0D6', fontSize: 13, textAlign: 'center' },
});

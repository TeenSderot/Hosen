import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import { Mail, Lock, Eye, EyeOff, User } from 'lucide-react-native';
import { useApi } from './hooks/useApiService';
import * as SecureStore from 'expo-secure-store';
import { useError } from './hooks/context/ErrorContext';
import { useNavigation } from '@react-navigation/native';

export default function UserInfo() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const { API_BASE } = useApi();
  const { error, warning } = useError();
  const navigation = useNavigation()

  useEffect(() => {
    loadUser();
  }, []);

  const loadUser = async () => {
    try {
      const token = await SecureStore.getItemAsync('access_token');
      const id = await SecureStore.getItemAsync('_id');
      const res = await fetch(`${API_BASE}/users/me`, {
        method: 'POST', // אם השרת שלך דורש POST עם _id
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify({ _id: id }),
      });

      if (!res.ok) throw new Error();
      const data = await res.json();
      
      setName(data.user?.name || '');
      setEmail(data.user?.email || '');
    } catch (e) {
        
      error('לא ניתן לטעון פרטי משתמש');
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    if (!name.trim()) {
      warning('שם לא יכול להיות ריק');
      return;
    }

    if (password || confirmPassword) {
      if (password !== confirmPassword) {
        warning('הסיסמאות לא תואמות');
        return;
      }
      if (password.length < 6) {
        warning('הסיסמה חייבת להכיל לפחות 6 תווים');
        return;
      }
    }

    const id = await SecureStore.getItemAsync('_id');
    setSaving(true);

    try {
      const token = await SecureStore.getItemAsync('access_token');
      const body = {
        _id: id,
        name,
        email,
        ...(password ? { password } : {}), // נשלח סיסמה רק אם שונה
      };

      const res = await fetch(`${API_BASE}/users/update`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(body),
      });

      if (!res.ok) throw new Error();
    } catch (e) {
      error('שמירה נכשלה');
    } finally {
      setSaving(false);
    }
  };
  const handleLogoff=async ()=>{
      await SecureStore.deleteItemAsync('access_token');
      await SecureStore.deleteItemAsync('_id');
      navigation.navigate('Login')
  }

  if (loading) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View style={styles.content}>
          <Text style={styles.title}>פרטי משתמש</Text>
          <Text style={styles.subtitle}>עדכן את הפרטים שלך</Text>

          <View style={styles.label_container}>
            <Text style={styles.label}>שם</Text>
          </View>
          <Input
            value={name}
            onChangeText={setName}
            placeholder="השם שלכם"
            icon={<User size={20} color="#84C7DA" />}
          />

          <View style={styles.label_container}>
            <Text style={styles.label}>אימייל</Text>
          </View>
          <Input
            value={email}
            editable={false}
            placeholder="name@example.com"
            icon={<Mail size={20} color="#84C7DA" />}
          />

          {/* סיסמה חדשה */}
          <View style={styles.label_container}>
            <Text style={styles.label}>סיסמה חדשה</Text>
          </View>
          <Input
            value={password}
            onChangeText={setPassword}
            placeholder="השאר ריק אם אין שינוי"
            secureTextEntry={!showPassword}
            icon={<Lock size={20} color="#84C7DA" />}
            toggleIcon={showPassword ? <EyeOff size={20} color="#84C7DA" /> : <Eye size={20} color="#84C7DA" />}
            onToggle={() => setShowPassword(v => !v)}
          />

          {/* אימות סיסמה */}
          <View style={styles.label_container}>
            <Text style={styles.label}>אימות סיסמה</Text>
          </View>
          <Input
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            placeholder="הקלד שוב את הסיסמה"
            secureTextEntry={!showConfirmPassword}
            icon={<Lock size={20} color="#84C7DA" />}
            toggleIcon={showConfirmPassword ? <EyeOff size={20} color="#84C7DA" /> : <Eye size={20} color="#84C7DA" />}
            onToggle={() => setShowConfirmPassword(v => !v)}
          />

          <TouchableOpacity
            style={[styles.button, saving && { opacity: 0.6 }]}
            onPress={handleSave}
            disabled={saving}
          >
            {saving ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text style={styles.buttonText}>שמירת שינויים</Text>
            )}
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.button, saving && { opacity: 0.6 },{backgroundColor:'#84C7DA'}]}
            onPress={handleLogoff}
            disabled={saving}
          >
            {saving ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text style={styles.buttonText}>התנתקות</Text>
            )}
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

/* ---------- Input Component ---------- */
function Input({ icon, toggleIcon, onToggle, ...props }) {
  return (
    <View style={styles.inputWrapper}>
      <View style={styles.inputContainer}>
        <View style={styles.iconEnd}>{icon}</View>

        <TextInput
          {...props}
          style={styles.input}
          placeholderTextColor="#999"
          textAlign="right"
        />

        {toggleIcon && (
          <TouchableOpacity style={styles.iconStart} onPress={onToggle}>
            {toggleIcon}
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}

/* ---------- Styles ---------- */
const styles = StyleSheet.create({
  loader: { flex: 1, justifyContent: 'center', alignItems: 'center' },

  content: {
    flex: 1,
    padding: 24,
    justifyContent: 'center',
  },

  title: { fontSize: 32, textAlign: 'center', marginBottom: 8 },
  subtitle: { textAlign: 'center', color: '#666', marginBottom: 32 },

  label_container: { alignItems: 'flex-start' },
  label: { textAlign: 'right', marginBottom: 8 },

  inputWrapper: { marginBottom: 20 },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#84C7DA',
    borderRadius: 25,
    height: 50,
    paddingHorizontal: 12,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: '#000',
    textAlign: 'right',
  },
  iconEnd: { marginLeft: 8 },
  iconStart: { marginRight: 8 },

  button: {
    backgroundColor: '#FD954E',
    padding: 16,
    borderRadius: 25,
    marginTop: 12,
    alignItems: 'center',
  },
  buttonText: { color: '#fff', fontSize: 18 },
});

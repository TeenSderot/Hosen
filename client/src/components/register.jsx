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
import { Mail, Lock, Eye, EyeOff, ArrowLeft, User } from 'lucide-react-native';
import { useApi } from './hooks/useApiService';
import { useNavigation } from '@react-navigation/native';
import * as SecureStore from 'expo-secure-store';
import { useError } from './hooks/context/ErrorContext';

export default function RegisterScreen() {
  const [checkingAuth, setCheckingAuth] = useState(true);
  const [loading, setLoading] = useState(false);

  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const { warning, error } = useError();
  const { API_BASE } = useApi();
  const navigation = useNavigation();
console.log('navigation', navigation);
  useEffect(() => {
    const checkExistingUser = async () => {
      try {
        const token = await SecureStore.getItemAsync('access_token');
        if (token) {
          navigation.navigate('Hand');
        }
      } catch (e) {
        console.log(e);
      } finally {
        setCheckingAuth(false);
      }
    };
    checkExistingUser();
  }, []);

  const handleRegister = async () => {
    if (password !== confirmPassword) {
      warning('הסיסמאות לא תואמות');
      return;
    }

    setLoading(true);
    try {
      const res = await fetch(`${API_BASE}/users/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password, name }),
      });

      if (!res.ok) throw new Error('Register failed');

      navigation.navigate('Login');
    } catch (err) {
      error('משהו השתבש, נסה שוב');
    } finally {
      setLoading(false);
    }
  };

  if (checkingAuth) {
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
      <ScrollView
        keyboardDismissMode="on-drag"
        keyboardShouldPersistTaps="always"
        contentContainerStyle={{ flexGrow: 1 }}
      >
        <View style={styles.content}>
          <Text style={styles.title}>יצירת חשבון</Text>
          <Text style={styles.subtitle}>הצטרפו אלינו והתחילו את המסע</Text>

          <View style={styles.label_container}><Text style={styles.label}>שם (אופציונלי)</Text></View>
          <Input
            value={name}
            onChangeText={setName}
            placeholder="השם שלכם"
            icon={<User size={20} color="#84C7DA" />}
            editable={!loading}
          />

          <View style={styles.label_container}><Text style={styles.label}>אימייל</Text></View>
          <Input
            value={email}
            onChangeText={setEmail}
            placeholder="name@example.com"
            keyboardType="email-address"
            icon={<Mail size={20} color="#84C7DA" />}
            editable={!loading}
          />

          <View style={styles.label_container}><Text style={styles.label}>סיסמה</Text></View>
          <Input
            value={password}
            onChangeText={setPassword}
            placeholder="בחרו סיסמה"
            secureTextEntry={!showPassword}
            icon={<Lock size={20} color="#84C7DA" />}
            toggleIcon={showPassword ? <EyeOff size={20} color="#84C7DA" /> : <Eye size={20} color="#84C7DA" />}
            onToggle={() => setShowPassword(v => !v)}
            editable={!loading}
          />

          <View style={styles.label_container}><Text style={styles.label}>אימות סיסמה</Text></View>
          <Input
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            placeholder="הזינו שוב את הסיסמה"
            secureTextEntry={!showConfirmPassword}
            icon={<Lock size={20} color="#84C7DA" />}
            toggleIcon={showConfirmPassword ? <EyeOff size={20} color="#84C7DA" /> : <Eye size={20} color="#84C7DA" />}
            onToggle={() => setShowConfirmPassword(v => !v)}
            editable={!loading}
          />

          <TouchableOpacity
            style={[styles.button, loading && { opacity: 0.6 }]}
            onPress={handleRegister}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <View style={styles.buttonContent}>
                <ArrowLeft size={20} color="#fff" />
                <Text style={styles.buttonText}>הרשמה</Text>
              </View>
            )}
          </TouchableOpacity>

          <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: 24, alignSelf: 'stretch' }}>
            <Text style={{ textAlign: 'right' }}>כבר יש לכם חשבון? </Text>
            <TouchableOpacity onPress={() => navigation.navigate('Login')}>
              <Text style={styles.link}>התחברות</Text>
            </TouchableOpacity>
          </View>
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
        {/* אייקון ימין */}
        <View style={styles.iconEnd}>{icon}</View>

        {/* TextInput */}
        <TextInput
          {...props}
          style={styles.input}
          placeholderTextColor="#999"
          textAlign="right"
        />

        {/* אייקון שמאל (עין) */}
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
    width: '100%',
    
  },

  title: { fontSize: 32, textAlign: 'center', marginBottom: 8 },
  subtitle: { textAlign: 'center', color: '#666', marginBottom: 32 },
  label_container:{
    alignItems:'flex-start'
  },
  label: { textAlign: 'right', marginBottom: 8 },

  inputWrapper: {
    marginBottom: 20,
    width: '100%',
  },

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
    paddingVertical: 0,
    textAlign: 'right',
  },

  iconEnd: {
    marginLeft: 8,
  },

  iconStart: {
    marginRight: 8,
  },

  button: {
    backgroundColor: '#FD954E',
    padding: 16,
    borderRadius: 25,
    marginTop: 12,
    alignItems: 'center',
  },

  buttonContent: { flexDirection: 'row', gap: 8 },

  buttonText: { color: '#fff', fontSize: 18 },

  footer: { textAlign: 'center', marginTop: 24 },

  link: { color: '#71A674', fontWeight: 'bold' },
});

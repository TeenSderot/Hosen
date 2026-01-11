import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  ActivityIndicator,
  TextInput,
} from 'react-native';
import * as SecureStore from "expo-secure-store";
import { Mail, Lock, Eye, EyeOff, ArrowLeft } from 'lucide-react-native';
import { useNavigation } from '@react-navigation/native';
import { useApi } from './hooks/useApiService';
import { useError } from './hooks/context/ErrorContext';

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigation();
  const { API_BASE } = useApi();
  const { error,success } = useError();

  const handleLogin = async () => {
    setLoading(true);
    try {
      const loginRes = await fetch(API_BASE + "/users/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (!loginRes.ok) throw new Error("Login failed");
      const loginData = await loginRes.json();
      
      await SecureStore.setItemAsync("_id", String(loginData?.userId));
      await SecureStore.setItemAsync("access_token", String(loginData?.token));
      await SecureStore.setItemAsync("full_name", loginData?.name || "");
      
    // success("ברוך הבא 🙌");
      navigate.navigate("Hand");
    } catch (err) {
      error("שגיאה בהתחברות")
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.content}>
          <Text style={styles.title}>התחברות</Text>
          <Text style={styles.subtitle}>הזינו את הפרטים שלכם כדי להמשיך</Text>

          <View style={styles.form}>
            {/* אימייל */}
            <View style={styles.text_container}>
              <Text style={styles.label}>אימייל</Text>
            </View>
            <View style={styles.inputWrapper}>
              <TextInput
                style={styles.input}
                placeholder="name@example.com"
                placeholderTextColor="#999"
                value={email}
                onChangeText={setEmail}
                autoCapitalize="none"
                keyboardType="email-address"
                editable={!loading}
                textAlign="right"
              />
              <Mail size={20} color="#84C7DA" style={styles.inputIconLeft} />
            </View>

            {/* סיסמה */}
            <View style={styles.text_container}>
              <Text style={styles.label}>סיסמה</Text>
            </View>
            <View style={styles.inputWrapper}>
              <TextInput
                style={styles.input}
                placeholder="הזינו סיסמה"
                placeholderTextColor="#999"
                value={password}
                onChangeText={setPassword}
                secureTextEntry={!showPassword}
                editable={!loading}
                textAlign="right"
              />
              <Lock size={20} color="#84C7DA" style={styles.inputIconLeft} />
              
              <TouchableOpacity
                onPress={() => setShowPassword(!showPassword)}
                style={styles.inputIconRight}
              >
                {showPassword ? (
                  <EyeOff size={20} color="#84C7DA" />
                ) : (
                  <Eye size={20} color="#84C7DA" />
                )}
              </TouchableOpacity>
            </View>

            {/* שכחתי סיסמה - מיושר לאמצע */}
            <TouchableOpacity
              onPress={() => navigate.navigate("ResetPassword")}
              disabled={loading}
              style={styles.forgotPasswordContainer}
            >
              <Text style={styles.forgotPassword}>שכחתי סיסמה</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.button, loading && styles.buttonDisabled]}
              onPress={handleLogin}
              disabled={loading}
            >
              <View style={styles.buttonContent}>
                {loading ? (
                  <ActivityIndicator color="#fff" />
                ) : (
                  <>
                    {/* <ArrowLeft size={20} color="#fff" /> */}
                    <Text style={styles.buttonText}>כניסה</Text>
                  </>
                )}
              </View>
            </TouchableOpacity>

            <View style={styles.footer}>
              <Text style={styles.footerText}>
                עדיין אין לכם חשבון?{' '}
                <Text
                  style={styles.linkText}
                  onPress={() => !loading && navigate.navigate("Register")}
                >
                  הרשמה
                </Text>
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollContent: {
    flexGrow: 1,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    padding: 24,
    paddingTop: 60,
  },
  title: {
    fontSize: 32,
    fontFamily: 'Rubik-Bold',
    color: '#000',
    textAlign: 'center',
    marginBottom: 12,
  },
  subtitle: {
    fontSize: 16,
    fontFamily: 'Rubik-Regular',
    color: '#666',
    textAlign: 'center',
    marginBottom: 48,
  },
  form: {
    width: '100%',
  },
  text_container:{
    width:'100%',
    alignItems: 'flex-start',
  },
  label: {
    fontSize: 14,
    fontFamily: 'Rubik-Medium',
    color: '#000',
    marginBottom: 8,
  },
  inputWrapper: {
    position: 'relative',
    marginBottom: 24,
    justifyContent: 'center',
  },
  input: {
    backgroundColor: '#fff',
    borderWidth: 2,
    borderColor: '#84C7DA',
    borderRadius: 25,
    padding: 16,
    paddingRight: 50, 
    paddingLeft: 50,  
    fontSize: 16,
    fontFamily: 'Rubik-Regular',
    color: '#000',
    textAlign: 'right',
    writingDirection: 'rtl',
  },
  inputIconRight: {
    position: 'absolute',
    right: 16,
  },
  inputIconLeft: {
    position: 'absolute',
    left: 16,
  },
  forgotPasswordContainer: {
    alignItems: 'center', // מיישר את כפתור הטאצ' לאמצע
    marginBottom: 32,
  },
  forgotPassword: {
    color: '#71A674',
    fontSize: 14,
    fontFamily: 'Rubik-Regular',
    textAlign: 'center', // טקסט במרכז
  },
  button: {
    backgroundColor: '#FD954E',
    padding: 18,
    borderRadius: 25,
    alignItems: 'center',
    marginBottom: 24,
    elevation: 6,
  },
  buttonDisabled: {
    opacity: 0.6,
  },
  buttonContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontFamily: 'Rubik-Bold',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 8,
    marginBottom: 24,
  },
  footerText: {
    fontSize: 14,
    fontFamily: 'Rubik-Regular',
    color: '#666',
  },
  linkText: {
    fontSize: 14,
    fontFamily: 'Rubik-SemiBold',
    color: '#71A674',
  },
});
import React, { useState } from 'react';
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
  I18nManager,
} from 'react-native';
import { Eye, EyeOff, ArrowLeft } from 'lucide-react-native';
import { useError } from './hooks/context/ErrorContext';
import { useApi } from './hooks/useApiService';
import * as SecureStore from "expo-secure-store"
import { useNavigation } from '@react-navigation/native';


I18nManager.allowRTL(true);
I18nManager.forceRTL(true);

export default function ResetPasswordScreen() {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const {postData,API_BASE} = useApi();
  const { warning, success, error } = useError()
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
  const navigation = useNavigation();

  const validateFields = () => {
     if (password && !passwordRegex.test(password.trim())) {
      warning("אנא הזן סיסמה תקינה")
      return false
    }
    if (password !== confirmPassword) {
      warning("הסיסמאות לא תואמות")
      return false
    }

    return true
  }
  const handleResetPassword = async () => {
    
try{
    if (!validateFields()) {
      return
    }
    const _id = await SecureStore.getItemAsync("_id")
    
    const regRes = await fetch(API_BASE + "/users/restpassword", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ _id,password}),
          })
    
          if (!regRes.ok) throw new Error("Register failed")
          
    setLoading(true);

      success('הסיסמה עודכנה בהצלחה!');
      setTimeout(() => {
        navigation.navigate('Login');
      }, 2000);
    } catch (err) {
      error('אירעה שגיאה. נסה שוב מאוחר יותר');
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
          <Text style={styles.title}>איפוס סיסמה</Text>
          <Text style={styles.subtitle}>הזן את הסיסמה החדשה שלך</Text>

          <View style={styles.form}>

            <Text style={styles.label}>סיסמה חדשה</Text>
            <View style={styles.inputWrapper}>
              <TextInput
                style={styles.input}
                value={password}
                onChangeText={setPassword}
                placeholder="הזן סיסמה חדשה"
                placeholderTextColor="#999"
                secureTextEntry={!showPassword}
                editable={!loading}
                autoCapitalize="none"
              />
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

            <Text style={styles.label}>אימות סיסמה</Text>
            <View style={styles.inputWrapper}>
              <TextInput
                style={styles.input}
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                placeholder="הזן שוב את הסיסמה"
                placeholderTextColor="#999"
                secureTextEntry={!showConfirmPassword}
                editable={!loading}
                autoCapitalize="none"
              />
              <TouchableOpacity
                onPress={() => setShowConfirmPassword(!showConfirmPassword)}
                style={styles.inputIconRight}
              >
                {showConfirmPassword ? (
                  <EyeOff size={20} color="#84C7DA" />
                ) : (
                  <Eye size={20} color="#84C7DA" />
                )}
              </TouchableOpacity>
            </View>

            <TouchableOpacity
              style={[styles.button, loading && styles.buttonDisabled]}
              onPress={handleResetPassword}
              disabled={loading}
            >
              <View style={styles.buttonContent}>
                {loading ? (
                  <ActivityIndicator color="#fff" />
                ) : (
                  <>
                    <ArrowLeft size={20} color="#fff" />
                    <Text style={styles.buttonText}>עדכן סיסמה</Text>
                  </>
                )}
              </View>
            </TouchableOpacity>

            <View style={styles.footer}>
              <Text style={styles.footerText}>
                זוכר את הסיסמה?{' '}
                <Text
                  style={styles.linkText}
                  onPress={() => !loading && navigation.navigate("Login")}
                >
                  חזרה להתחברות
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
    paddingTop: 80,
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
    lineHeight: 24,
    paddingHorizontal: 16,
  },
  form: {
    width: '100%',
  },
  label: {
    fontSize: 14,
    fontFamily: 'Rubik-Medium',
    color: '#000',
    marginBottom: 8,
    textAlign: 'right',
  },
  inputWrapper: {
    position: 'relative',
    marginBottom: 24,
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
    top: 16,
  },
  button: {
    backgroundColor: '#FD954E',
    padding: 18,
    borderRadius: 25,
    alignItems: 'center',
    marginBottom: 24,
    marginTop: 12,
    shadowColor: '#FD954E',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
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
  errorContainer: {
    backgroundColor: '#ffebee',
    padding: 12,
    borderRadius: 8,
    marginBottom: 16,
  },
  errorText: {
    color: '#c62828',
    fontSize: 14,
    fontFamily: 'Rubik-Regular',
    textAlign: 'center',
  },
  successContainer: {
    backgroundColor: '#e8f5e9',
    padding: 12,
    borderRadius: 8,
    marginBottom: 16,
  },
  successText: {
    color: '#2e7d32',
    fontSize: 14,
    fontFamily: 'Rubik-Regular',
    textAlign: 'center',
  },
});

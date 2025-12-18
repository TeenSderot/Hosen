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
  I18nManager,
} from 'react-native';
import { Mail, Lock, Eye, EyeOff, ArrowLeft, User } from 'lucide-react-native';
import { useApi } from './hooks/useApiService';
import { useNavigation } from '@react-navigation/native';
import * as SecureStore from "expo-secure-store"
import { useError } from './hooks/context/ErrorContext';

I18nManager.allowRTL(true);
I18nManager.forceRTL(true);

export default function RegisterScreen() {
  const [loading, setLoading] = useState(true) // נטען כברירת מחדל
  const [password, setPassword] = useState("")
  const [email, setEmail] = useState("")
  const [name, setName] = useState("")
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const { warning, success, error } = useError()
  const { API_BASE } = useApi()
  const navigate = useNavigation()
  
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  const fullNameRegex = /^[a-zA-Zא-ת]+(?: [a-zA-Zא-ת]+){0,2}$/
  
    // בדיקה מיידית אם כבר יש _id ושמירה על כניסה אוטומטית
    useEffect(() => {
      const checkExistingUser = async () => {
        try {
          const token = await SecureStore.getItemAsync("access_token")
        
         
          if (token) {
            navigate.navigate("Hand") // כניסה אוטומטית
          }
        } catch (err) {
          console.log("Error checking existing user:", err)
        } finally {
          setLoading(false)
        }
      }
  
      checkExistingUser()
    }, [])

 const validateFields = () => {
    if (password !== confirmPassword) {
      warning("הסיסמאות לא תואמות")
      return false
    }

    if (password && !passwordRegex.test(password.trim())) {
      warning("אנא הזן סיסמה תקינה")
      return false
    }

    if (email && !emailRegex.test(email.trim())) {
      warning("אנא הזן כתובת אימייל תקינה")
      return false
    }

    if (name && !fullNameRegex.test(name.trim())) {
      warning("אנא הזן שם מלא תקין")
      return false
    }

    return true
  }
  const handleRegister = async () => {
    //if (!validateFields()) return
        setLoading(true)
        try {
          // 1) Register
          const regRes = await fetch(API_BASE + "/users/register", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, password }),
          })
    
          if (!regRes.ok) throw new Error("Register failed")
          const regData = await regRes.json()
          
          const registeredOk = !!(regData._id || regData.id || regData.message === "Success")
          if (!registeredOk) throw new Error("Register response not recognized")
    
          navigate.navigate("Login")
        } catch (err) {
          console.log("handleSave error:", err)
          error(err?.message || "משהו השתבש, אנא נסה שוב")
        } finally {
          setLoading(false)
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
          <Text style={styles.title}>יצירת חשבון</Text>
          <Text style={styles.subtitle}>הצטרפו אלינו והתחילו את המסע</Text>
          <View style={styles.form}>
            <Text style={styles.label}>שם (אופציונלי)</Text>
            <View style={styles.inputWrapper}>
              <TextInput
                style={styles.input}
                placeholder="השם שלכם"
                placeholderTextColor="#999"
                value={name}
                onChangeText={setName}
                editable={!loading}
              />
              <User size={20} color="#84C7DA" style={styles.inputIconRight} />
            </View>

            <Text style={styles.label}>אימייל</Text>
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
              />
              <Mail size={20} color="#84C7DA" style={styles.inputIconRight} />
            </View>

            <Text style={styles.label}>סיסמה</Text>
            <View style={styles.inputWrapper}>
              <TextInput
                style={styles.input}
                placeholder="בחרו סיסמה"
                placeholderTextColor="#999"
                value={password}
                onChangeText={setPassword}
                secureTextEntry={!showPassword}
                editable={!loading}
              />
              <Lock size={20} color="#84C7DA" style={styles.inputIconRight} />
              <TouchableOpacity
                onPress={() => setShowPassword(!showPassword)}
                style={styles.inputIconLeft}
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
                placeholder="היזינו שוב את הסיסמה"
                placeholderTextColor="#999"
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                secureTextEntry={!showConfirmPassword}
                editable={!loading}
              />
              <Lock size={20} color="#84C7DA" style={styles.inputIconRight} />
              <TouchableOpacity
                onPress={() => setShowConfirmPassword(!showConfirmPassword)}
                style={styles.inputIconLeft}
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
              onPress={handleRegister}
              disabled={loading}
            >
              <View style={styles.buttonContent}>
                {loading ? (
                  <ActivityIndicator color="#fff" />
                ) : (
                  <>
                    <ArrowLeft size={20} color="#fff" />
                    <Text style={styles.buttonText}>הרשמה</Text>
                  </>
                )}
              </View>
            </TouchableOpacity>

            <View style={styles.footer}>
              <Text style={styles.footerText}>
                כבר יש לכם חשבון?{' '}
                <Text
                  style={styles.linkText}
                  onPress={() => {navigate.navigate("Login")}}
                >
                  התחברות
                </Text>
              </Text>
            </View>

            <Text style={styles.termsText}>
              בהרשמה אתם מסכימים לי תנאי השימוש ומי מדיניות הפרטיות
            </Text>
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
    paddingTop: 40,
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
    marginBottom: 40,
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
    marginBottom: 20,
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
 
  },
  inputIconRight: {
    position: 'absolute',
    right: 16,
    top: 16,
  },
  inputIconLeft: {
    position: 'absolute',
    left: 16,
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
  termsText: {
    fontSize: 12,
    fontFamily: 'Rubik-Regular',
    color: '#999',
    textAlign: 'center',
    lineHeight: 18,
  },
});

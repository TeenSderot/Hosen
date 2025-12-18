import { useEffect, useState } from "react"
import {
  View,
  StyleSheet,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  ActivityIndicator,
  Text,
  TextInput,
} from "react-native"
import { useTheme } from 'react-native-paper'
import { useError } from "./hooks/context/ErrorContext"
import * as SecureStore from "expo-secure-store"
import { useApi } from "./hooks/useApiService"
import { useNavigation } from "@react-navigation/native"

export default function UserInfo() {
  const [loading, setLoading] = useState(true) // נטען כברירת מחדל
  const [password, setPassword] = useState("")
  const [email, setEmail] = useState("")
  const [name, setName] = useState("")

  const { warning, success, error } = useError()
  const { API_BASE } = useApi()
  const theme = useTheme()
  const navigate = useNavigation()

  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  const fullNameRegex = /^[a-zA-Zא-ת]+(?: [a-zA-Zא-ת]+){0,2}$/

  // בדיקה מיידית אם כבר יש _id ושמירה על כניסה אוטומטית
  useEffect(() => {
    const checkExistingUser = async () => {
      try {
        const id = await SecureStore.getItemAsync("_id")
        const exists = await SecureStore.getItemAsync("exists")
        const full_name = await SecureStore.getItemAsync("full_name")||"אורח"
        
        if (id && exists === "true") {
          navigate.navigate("Hand") // כניסה אוטומטית
          return
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

  const handleSave = async () => {
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

      // 2) Login
      const loginRes = await fetch(API_BASE + "/users/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      })

      if (!loginRes.ok) throw new Error("Login failed")
      const loginData = await loginRes.json()

      const token = loginData?.token 
      const userId = loginData?.userId 
      const full_name = loginData?.name || ""
      if (!token || !userId) throw new Error("Missing token/userId from login response")

      await SecureStore.setItemAsync("_id", String(userId))
      await SecureStore.setItemAsync("access_token", String(token))
      await SecureStore.setItemAsync("exists", "true")
      await SecureStore.setItemAsync("full_name", full_name)
     
      success("ברוך הבא 🙌")
      navigate.navigate("Hand")
    } catch (err) {
      console.log("handleSave error:", err)
      error(err?.message || "משהו השתבש, אנא נסה שוב")
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <View style={[styles.container, styles.center]}>
        <ActivityIndicator size="large" color={theme.colors?.primary || '#3B82F6'} />
      </View>
    )
  }

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <ScrollView contentContainerStyle={styles.scrollContainer} keyboardShouldPersistTaps="handled">
        <View style={[styles.card, { backgroundColor: theme.colors?.surface || styles.card.backgroundColor }]}>
          <Text style={[styles.header, { color: theme.colors?.primary || styles.header.color }]}>פרטי משתמש</Text>

          <TextInput
            style={styles.input}
            placeholder="שם (אופציונלי)"
            value={name}
            onChangeText={setName}
            placeholderTextColor={theme.dark ? "#9CA3AF" : "#6B7280"}
            maxLength={50}
          />

          <TextInput
            style={styles.input}
            placeholder='אימייל'
            keyboardType='email-address'
            value={email}
            onChangeText={setEmail}
            autoCapitalize="none"
            placeholderTextColor={theme.dark ? "#9CA3AF" : "#6B7280"}
          />

          <TextInput
            style={styles.input}
            placeholder='סיסמה'
            value={password}
            onChangeText={setPassword}
            placeholderTextColor={theme.dark ? "#9CA3AF" : "#6B7280"}
            secureTextEntry
            maxLength={10}
          />

          <TouchableOpacity
            style={[styles.button, { backgroundColor: theme.colors?.primary || styles.button.backgroundColor }]}
            onPress={handleSave}
          >
            <Text style={styles.buttonText}>שמירה</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  )
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#EFF6FF" },
  center: { justifyContent: "center", alignItems: "center" },
  scrollContainer: { flexGrow: 1, justifyContent: "center", alignItems: "center", padding: 16 },
  card: {
    width: "100%",
    maxWidth: 400,
    backgroundColor: "#F8FAFC",
    padding: 20,
    borderRadius: 12,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    elevation: 3,
  },
  header: { fontSize: 20, fontWeight: "bold", color: "#1E3A8A", marginBottom: 16, textAlign: "center" },
  input: { backgroundColor: "#fff", padding: 14, borderRadius: 10, marginBottom: 12, borderWidth: 1, borderColor: "#D1D5DB", color:"black" },
  button: { padding: 14, borderRadius: 10, alignItems: "center", marginTop: 8, backgroundColor: "#3B82F6" },
  buttonText: { color: "#fff", fontWeight: "600", fontSize: 16 },
})

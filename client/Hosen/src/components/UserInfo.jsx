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

export default function UserInfo({ setUserExists }) {
  const [_id, setID] = useState(null)
  const [loading, setLoading] = useState(false)
  const [password, setpassword] = useState("")
  const [email, setEmail] = useState("")
  const { warning, success, error } = useError()
  const { API_BASE } = useApi()
  const theme = useTheme()

  const passwordRegex = /^$/ ///^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

  useEffect(() => {
    const getID = async () => {
      const id = await SecureStore.getItemAsync("_id")
      setID(id)
    }
    getID()
  }, [])

  useEffect(() => {
    const checkExists = async () => {
      const exists = await SecureStore.getItemAsync("exists")
      if (exists === "true") {
        getSetToken()
        setUserExists(true)
      }
    }

    checkExists()
  }, [loading])

  const getSetToken = async () => {
  setLoading(true)
    setTimeout(() => {
          setLoading(false)

    }, 10000);    
    try {
      const response = await fetch(API_BASE + "/gettoken", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ user_id: _id }),
      })
      //send sms to user
      if (!response.ok) throw new Error("שגיאת נתונים/רשת")

      const data = await response.json()

      if (data.message === "Success") {
        await SecureStore.setItemAsync("access_token", data.token)
      } else warning("אירעה שגיאה בהזדהות.")
    } catch (err) {
      error("משהו השתבש בניתוח הנתונים, אנא נסה שוב")
    } finally {
      setLoading(false)
    }
  }
const validateFields = () => {

  if (!passwordRegex.test(password.trim())) {
    warning("אנא הזן מספר טלפון תקין")
    return false
  }

  if (!emailRegex.test(email.trim())) {
    warning("אנא הזן כתובת אימייל תקינה")
    return false
  }

  return true
}
const handleSave = async () => {
  setLoading(true);

  try {
    console.log("REGISTER ->", API_BASE + "/users/register");

    // 1) Register
    const regRes = await fetch(API_BASE + "/users/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
      
    });

    const regText = await regRes.text();
    console.log("REGISTER status:", regRes.status, "body:", regText);

    if (!regRes.ok) throw new Error("Register failed");

    const regData = regText ? JSON.parse(regText) : {};
    // מספיק לנו לדעת שהצליח: או שהחזיר id/_id או הודעה
    const registeredOk = !!(regData._id || regData.id || regData.message === "Success");
    if (!registeredOk) throw new Error("Register response not recognized");

    // 2) Login
    console.log("LOGIN ->", API_BASE + "/users/login");

    const loginRes = await fetch(API_BASE + "/users/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const loginText = await loginRes.text();
    console.log("LOGIN status:", loginRes.status, "body:", loginText);

    if (!loginRes.ok) throw new Error("Login failed");

    const loginData = loginText ? JSON.parse(loginText) : {};

    // ⚠️ כאן תתאים לפי מה שהשרת מחזיר בפועל
    const token = loginData.token || loginData.access_token || loginData.accessToken;
    const userId = loginData.userId || loginData.id || (loginData.user && loginData.user.id);

    if (!token || !userId) {
      throw new Error("Missing token/userId from login response");
    }

    await SecureStore.setItemAsync("_id", String(userId));
    await SecureStore.setItemAsync("access_token", String(token));
    await SecureStore.setItemAsync("exists", "true");

    success("ברוך הבא 🙌");
  } catch (err) {
    console.log("❌ handleSave error:", err);
    error(err?.message || "משהו השתבש, אנא נסה שוב");
  } finally {
    setLoading(false);
  }
};


  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={[styles.card, { backgroundColor: theme.colors?.surface || styles.card.backgroundColor }] }>
          <Text style={[styles.header, { color: theme.colors?.primary || styles.header.color }]}>פרטי משתמש</Text>

         

     

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
            keyboardType='password-pad'
            value={password}
            onChangeText={setpassword}
            placeholderTextColor={theme.dark ? "#9CA3AF" : "#6B7280"}
            maxLength={10}
          />
          {loading ? (
            <ActivityIndicator size='small' color={theme.colors?.primary || '#3B82F6'} />
          ) : (
            <TouchableOpacity style={[styles.button, { backgroundColor: theme.colors?.primary || styles.button.backgroundColor }]} onPress={handleSave}>
              <Text style={styles.buttonText}>שמירה</Text>
            </TouchableOpacity>
          )}
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#EFF6FF", // רקע בהיר כמו ב־Dashboard/Roadmap
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
  },
  card: {
    width: "100%",
    maxWidth: 400,
    backgroundColor: "#F8FAFC", // כרטיס כמו ב־Dashboard
    padding: 20,
    borderRadius: 12,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    elevation: 3,
  },
  header: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#1E3A8A",
    marginBottom: 16,
    textAlign: "center",
  },
  input: {
    backgroundColor: "#fff",
    padding: 14,
    borderRadius: 10,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "#D1D5DB",
    color:"black"
  },
  button: {
    backgroundColor: "#3B82F6",
    padding: 14,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 8,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 16,
  },
})

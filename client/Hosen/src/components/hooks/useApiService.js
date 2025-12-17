import { useCallback } from "react"
import * as SecureStore from "expo-secure-store"
const API_BASE ="http://localhost:10000"//"https://hosen.onrender.com"//"http://10.0.0.14:5000"////////////

export function useApi() {
  // אחזור טוקן מה־AsyncStorage
  const getToken = async () => {
    return await SecureStore.getItemAsync("access_token")
  }

  // שמירה של טוקן חדש
  const setToken = async (token) => {
    await SecureStore.setItemAsync("access_token", token)
  }

  // ריענון טוקן
  const refreshToken = async () => {
    const refresh = await SecureStore.getItemAsync("refresh_token")
    if (!refresh) throw new Error("No refresh token available")

    const res = await fetch(`${API_BASE}/auth/refresh`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ refreshToken: refresh }),
    })

    if (!res.ok) throw new Error("Failed to refresh token")
    const data = await res.json()

    await setToken(data.accessToken)
    return data.accessToken
  }

  // קריאה לשרת (GET/POST)
  const request = useCallback(async (endpoint, method = "GET", body = null) => {
    let token = await getToken()

    let res = await fetch(`${API_BASE}/${endpoint}`, {
      method,
      headers: {
        "Content-Type": "application/json",
        Authorization: token ? `Bearer ${token}` : undefined,
      },
      body: body ? JSON.stringify(body) : undefined,
    })

    // אם טוקן פג תוקף (401) ננסה לרענן
    if (res.status === 401) {
      try {
        token = await refreshToken()

        res = await fetch(`${API_BASE}/${endpoint}`, {
          method,
          headers: {
            "Content-Type": "application/json",
            Authorization: token ? `Bearer ${token}` : undefined,
          },
          body: body ? JSON.stringify(body) : undefined,
        })
      } catch (err) {
        throw new Error("Session expired, please login again")
      }
    }

    if (!res.ok) {
      const text = await res.text()
      throw new Error(text || "Request failed")
    }
  

    return await res.json()
  }, [])

  // פונקציה נקייה לשימוש חיצוני
  const postData = useCallback((endpoint, body) => request(endpoint, "POST", body), [request])
  const getData = useCallback((endpoint) => request(endpoint, "GET"), [request])

  return { postData, getData, API_BASE,getToken,setToken }
}

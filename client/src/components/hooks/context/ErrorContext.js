import { createContext, useContext, useState } from "react"

const ErrorContext = createContext()

export const ErrorProvider = ({ children }) => {
  const [context_error, setContextError] = useState(null)

  const show = (message, severity = "info", duration = 3000) => {
    setContextError({ message, severity })
    // סגירה אוטומטית אחרי duration
    setTimeout(() => setContextError(null), duration)
  }

  const success = (message, duration) => show(message, "success", duration)
  const error = (message, duration) => show(message, "error", duration)
  const info = (message, duration) => show(message, "info", duration)
  const warning = (message, duration) => show(message, "warning", duration)

  return (
    <ErrorContext.Provider value={{ context_error, success, error, info, warning,setContextError }}>
      {children}
    </ErrorContext.Provider>
  )
}

// Hook נוח לקריאה מהקונטקסט
export const useError = () => {
  const context = useContext(ErrorContext)
  if (!context) throw new Error("useError must be used within an ErrorProvider")
  return context
}

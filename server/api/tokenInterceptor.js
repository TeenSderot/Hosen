const jwt = require("jsonwebtoken")

// Middleware function to check the token
const tokenInterceptor = (req, res, next) => {
  const token = req.headers.authToken
  const secretKey = process.env.JWT_SECRET

  if (req.path.includes("login") || req.path.includes("signup")) {
    return next()
  }

  if (!token) {
    return res.status(401).json({ message: "Access denied. No token provided." })
  }

  // Verify token
  jwt.verify(token, secretKey, (err, decoded) => {
    if (err) {
      if (err.name === "TokenExpiredError") {
        // If token is expired, regenerate a new token if user information is available
        const { id, username } = jwt.decode(token) // decode old token payload

        // Sign and set a new token in the cookie
        const newToken = jwt.sign({ id, username }, secretKey, { expiresIn: "1h" })
        res.cookie("authToken", newToken, {
          httpOnly: true,
          secure: true,
          sameSite: "None", // Change from "Strict" to "None"
          domain: ".vercel.app", // Ensure it's accessible across subdomains
        })

        // Attach user info to the request and continue
        req.user = { id, username }
        return next()
      }
      return res.status(403).json({ message: "Invalid token." })
    }

    // Token is valid, attach decoded user information
    req.user = decoded
    next()
  })
}

module.exports = tokenInterceptor
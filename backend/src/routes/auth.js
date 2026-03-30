import express from "express"
import axios from "axios"

const router = express.Router()

router.post("/token", async (req, res) => {
  const { code, code_verifier } = req.body
  try {
    const response = await axios.post(
      `https://${process.env.AUTH_DOMAIN}/oauth/token`,
      {
        grant_type: "authorization_code",
        client_id: process.env.CLIENT_ID,
        code,
        redirect_uri: "http://localhost:5173/callback",
        code_verifier,
      },
      {
        headers: { "Content-Type": "application/json" }
      }
    )
    res.json(response.data)
  } catch (err) {
    console.error("TOKEN ERROR:", err.response?.data || err.message)
    res.status(500).json({ error: "Token exchange failed" })  }
})

export default router
import pkceChallenge from "pkce-challenge"

const clientId = import.meta.env.VITE_AUTH0_CLIENT_ID
const domain = import.meta.env.VITE_AUTH0_DOMAIN
const redirectUri = "http://localhost:5173/callback"

export function isAuthenticated() {
  return !!localStorage.getItem("token")
}

export async function login() {
  const { code_verifier, code_challenge } = await pkceChallenge()
  sessionStorage.setItem("code_verifier", code_verifier)

  const params = new URLSearchParams({
    response_type: "code",
    client_id: clientId,
    redirect_uri: redirectUri,
    code_challenge,
    code_challenge_method: "S256",
    scope: "openid profile email"
  })

  window.location.href = `https://${domain}/authorize?${params}`
}

export function logout() {
  const domain = import.meta.env.VITE_AUTH0_DOMAIN
  const clientId = import.meta.env.VITE_AUTH0_CLIENT_ID

  localStorage.removeItem("token")

  const logoutUrl = `https://${domain}/v2/logout?client_id=${clientId}&returnTo=http://localhost:5173/login`

  window.location.href = logoutUrl
}
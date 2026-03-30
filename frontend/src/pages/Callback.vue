<script setup lang="ts">
import { onMounted } from "vue"
import { useRoute, useRouter } from "vue-router"
import { useAuthStore } from '../store/auth';

const route = useRoute()
const router = useRouter()
const authStore = useAuthStore()

onMounted(async () => {
  const code = route.query.code as string
  const code_verifier = sessionStorage.getItem("code_verifier")

  if (!code || !code_verifier) return

  const res = await fetch("http://localhost:3000/auth/token", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ code, code_verifier })
  })

  const data = await res.json()
  localStorage.setItem("token", data.access_token)
  authStore.setToken(true)

  router.push("/") // go back to home
})
</script>

<template>
  <p>Logging you in...</p>
</template>
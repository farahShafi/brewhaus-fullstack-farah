<script setup lang="ts">
// import { login } from "../services/auth"
import { useAuthStore } from "../store/auth";

const store = useAuthStore()

</script>

<template>
  <div class="login">
    <h1>Welcome to BrewHaus 🍺</h1>
    <button @click="store.loginAction">Login with Auth0</button>
  </div>
</template>

<style scoped>
.login {
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
</style>
// store/auth.ts
import { defineStore } from 'pinia';
import { ref } from 'vue';
import { login, logout } from "../services/auth"

export const useAuthStore = defineStore('auth', () => {

const tokenKey = 'token';    
const isLoggedIn = ref(!!localStorage.getItem(tokenKey));


//   const isLoggedIn = computed(() => !!token.value);

  function setToken(status: boolean) {
    isLoggedIn.value = status
  }

  function loginAction() {
    login()
  }

  function logoutAction() {
    logout()
  }

  return { isLoggedIn, logoutAction, setToken, loginAction };
});
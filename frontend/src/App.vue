<script setup>
import Navbar from './components/navbar.vue'
import { isAuthenticated } from './services/auth'
</script>

<template>
  <Navbar :isAuthenticated="isAuthenticated()"/>
  <router-view v-if="isAuthenticated()" />
  <router-view v-else />
</template>

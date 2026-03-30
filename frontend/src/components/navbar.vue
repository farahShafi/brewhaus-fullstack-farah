<script setup lang="ts">
import { useBreweryStore } from '../store/brewery';
import { useSourceStore } from '../store/source';
import { useRoute } from 'vue-router';
import { useAuthStore } from '../store/auth';

import { isAuthenticated, logout } from '../services/auth';
import { computed, onMounted } from 'vue';

 const props = defineProps<{
        isAuthenticated: string | boolean
    }>()
const authStore = useAuthStore()

const store = useSourceStore()
const breweriesStore = useBreweryStore()
const route = useRoute()

function changeSource(event: Event) {
    const target = event.target as HTMLSelectElement
    store.setSource(target.value)
    breweriesStore.resetSearch("")
}


</script>
<template>
  <nav class="navbar">
    <div class="logo">BrewHaus</div>

    <ul v-if="authStore.isLoggedIn" class="nav-links">
      <li><a href="/">Home</a></li>
      <li><a href="" @click="logout()">Logout</a></li>
      <li>
        <select v-if="route.name === 'breweries'" :value="store.source" @change="changeSource($event)">
            <option value="public">Public Breweries</option>
            <option value="internal">Internal Breweries</option>
        </select>
      </li>
    </ul>
  </nav>
</template>

<style scoped>
.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #2c3e50;
  padding: 12px 20px;
  color: white;
}

.logo {
  font-weight: bold;
  font-size: 18px;
}

.nav-links {
  display: flex;
  list-style: none;
  gap: 20px;
}

.nav-links a {
  color: white;
  text-decoration: none;
}
</style>
<script setup lang="ts">
import { useBreweryStore } from '../store/brewery';
import { useSourceStore } from '../store/source';
import { useRoute } from 'vue-router';
import { ref } from 'vue';

const store = useSourceStore()
const breweriesStore = useBreweryStore()
const route = useRoute()
const isOpen = ref(false)

function toggleMenu() {
  isOpen.value = !isOpen.value
}

function changeSource(event: Event) {
    const target = event.target as HTMLSelectElement
    store.setSource(target.value)
    breweriesStore.resetSearch("")

}


</script>
<template>
  <nav class="navbar">
    <div class="logo">BrewHaus</div>
    <!-- Mobile Menu Button -->
    <button class="menu-btn" @click="toggleMenu">
      ☰
    </button>

    <!-- Desktop Nav -->
    <ul class="nav-links">
      <li><a href="/">Home</a></li>
      <li v-if="store.source === 'internal'"><a href="/brewery/dashboard">Dashboard</a></li>
      <li>
        <select v-if="route.name === 'breweries'" :value="store.source" @change="changeSource($event)">
            <option value="public">Public Breweries</option>
            <option value="internal">Internal Breweries</option>
        </select>
      </li>
    </ul>

    <!-- Mobile Dropdown -->
    <div v-if="isOpen" class="mobile-menu">
      <a href="/">Home</a>
      <a v-if="store.source === 'internal'" href="/brewery/dashboard">
        Dashboard
      </a>

      <select
        v-if="route.name === 'breweries'"
        :value="store.source"
        @change="changeSource($event)"
      >
        <option value="public">Public Breweries</option>
        <option value="internal">Internal Breweries</option>
      </select>
    </div>
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
/* Mobile button hidden by default */
.menu-btn {
  display: none;
  background: none;
  border: none;
  color: white;
  font-size: 22px;
  cursor: pointer;
}

/* Mobile dropdown */
.mobile-menu {
  position: absolute;
  top: 60px;
  right: 20px;
  background: #34495e;
  padding: 12px;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.mobile-menu a {
  color: white;
  text-decoration: none;
}

/* Responsive breakpoint */
@media (max-width: 768px) {
  .nav-links {
    display: none;
  }

  .menu-btn {
    display: block;
  }
}
</style>
<script setup lang="ts">
import { onMounted } from "vue"
import { useBreweryStore } from "../store/brewery.ts"
import { useSourceStore } from "../store/source.ts"
import BreweryCard from "../components/breweryCard.vue"
import Header from "../components/header.vue"
import breweryImage from "../assets/beer-mug.svg"

const breweryStore = useBreweryStore()
const sourceStore = useSourceStore()
let timeout: ReturnType<typeof setTimeout>

// methods

function handleSearch(event: Event) {

  const target = event.target as HTMLInputElement
  clearTimeout(timeout)

  timeout = setTimeout(() => {
    breweryStore.fetchBreweries(undefined, target.value)
  }, 300)
}

// life cycle hooks
onMounted(() => {
    breweryStore.fetchBreweries(undefined, undefined)
})
</script>
    
<template>
    <div>
        
        <Header :image="breweryImage" title="Breweries"></Header>
        <div class="banner">
            data loaded from {{ sourceStore.source === 'public' ? 'Open Brewery DB https://www.openbrewerydb.org/documentation' : 'Internal Node.js API' }}
        </div>

        <input
            type="text"
            placeholder="Search breweries"
            @input="handleSearch"
            />
        
        <div class="grid">
            <BreweryCard 
                v-for="brewery in breweryStore.breweries" 
                :key="brewery?.id" 
                :brewery="brewery">
            </BreweryCard>
        </div>
    </div>
</template>

<style scoped>
    .grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
    gap: 24px;
    align-items: stretch;
    padding: 24px;
    }
</style>
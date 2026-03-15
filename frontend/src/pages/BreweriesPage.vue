<script setup lang="ts">
import { ref, onMounted, watch } from "vue"
import { useBreweryStore } from "../store/brewery.ts"
import { useSourceStore } from "../store/source.ts"
import BreweryCard from "../components/breweryCard.vue"
import Header from "../components/header.vue"
import breweryImage from "../assets/beer-mug.svg"

const breweryStore = useBreweryStore()
const sourceStore = useSourceStore()
const search = ref('')
let timeout: ReturnType<typeof setTimeout>

// methods
watch(() => sourceStore.source, (newSource: string, oldSource: string) => {
    console.log(newSource, oldSource)
    clearSearch()
    breweryStore.fetchBreweries() // reload breweries
})

function handleSearch() {

//   const target = 
  clearTimeout(timeout)

  timeout = setTimeout(() => {
    breweryStore.fetchBreweries(undefined, search.value)
  }, 300)
}

function clearSearch() {
    search.value = ''
    breweryStore.fetchBreweries()
}

// life cycle hooks
onMounted(() => {
    breweryStore.fetchBreweries()
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
            v-model="search"
            @input="handleSearch"
            />
            <button @click="clearSearch">Clear</button>    
        
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
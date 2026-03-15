<script setup lang="ts">
import { onMounted, onUnmounted, watch } from "vue"
import { useBreweryStore } from "../store/brewery.ts"
import { useSourceStore } from "../store/source.ts"

import BreweryCard from "../components/breweryCard.vue"
import Header from "../components/header.vue"

import breweryImage from "../assets/beer-mug.svg"

const breweryStore = useBreweryStore()
const sourceStore = useSourceStore()

let timeout: ReturnType<typeof setTimeout>


watch(() => sourceStore.source, (newSource: string, oldSource: string) => {
    console.log(newSource, oldSource)
    clearSearch()
})

// methods

function handleSearch() {
  clearTimeout(timeout)

  timeout = setTimeout(() => {
    breweryStore.resetSearch(breweryStore.search)
  }, 300)
}

function clearSearch() {
    breweryStore.resetSearch("")
}

function handleScroll() {
    const scrollConatiner = document.documentElement

    if ( 
        scrollConatiner.scrollTop + window.innerHeight >= 
        scrollConatiner.scrollHeight - 10
    ) {
        breweryStore.fetchBreweries()
    }
}

// life cycle hooks
onMounted(() => {
    breweryStore.fetchBreweries()
    window.addEventListener('scroll', handleScroll)
})

onUnmounted(() => {
    window.removeEventListener('scroll', handleScroll)
})
</script>
    
<template>
    <div>
        
        <Header :image="breweryImage" title="Breweries"></Header>
        <div :class="['banner', sourceStore.source === 'public' ? 'banner-public' : 'banner-internal']">
            data loaded from {{ sourceStore.source === 'public' ? 'Open Brewery DB https://www.openbrewerydb.org/documentation' : 'Internal Node.js API backed by a SQLite database' }}
        </div>

        <input
            type="text"
            placeholder="Search breweries"
            v-model="breweryStore.search"
            @input="handleSearch"
            />
            <button :disabled="!breweryStore.search.length" @click="clearSearch">Clear</button>   
            
            <div v-if = "breweryStore.breweries.length > 0">count {{ breweryStore.breweries.length }}</div>
        
        <div v-if="breweryStore.error === 'backend' && sourceStore.source === 'internal'" class="state-msg state-error">
            Backend is not running. Start the server at <code>localhost:3000</code> and refresh.
        </div>

        <div v-else-if="!breweryStore.loading && breweryStore.breweries.length === 0" class="state-msg state-empty">
            No breweries found.
        </div>

        <div v-else class="grid">
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

    .banner {
        padding: 8px 24px;
        font-size: 13px;
        font-weight: 500;
        margin-bottom: 25px;
    }

    .banner-public {
        background-color: #e8f4fd;
        color: #1a6fa8;
        /* border-left: 4px solid #1a6fa8; */
    }

    .banner-internal {
        background-color: #eafaf1;
        color: #1e7e4a;
        /* border-left: 4px solid #1e7e4a; */
    }

    .state-msg {
        margin: 48px auto;
        text-align: center;
        font-size: 15px;
        max-width: 480px;
    }

    .state-error {
        color: #c0392b;
    }

    .state-empty {
        color: #888;
    }
</style>
<script setup lang="ts">
    import { ref, onMounted } from "vue"
    import Header from "../components/header.vue"
    import type { Brewery } from '../types/brewery'    
    import { useBreweryStore } from "../store/brewery"
    import breweryImage from "../assets/beer-mug.svg"
    import BreweryCard from "../components/breweryCard.vue"


    const breweryStore = useBreweryStore()

    const props = defineProps<{
        id: string
    }>()

    const brewery = ref<Brewery | null>(null)
    const loading = ref<boolean>(false)  
    const error = ref<string | null>(null) 
        
    async function loadBrewery() {
        try {
            loading.value = true

    // check store cache first
    const cached = breweryStore.breweriesMap[props.id]

    // if (cached) {
    //   brewery.value = cached
    //   return
    // }

    // fallback to API (this will work when page is refreshed)
    brewery.value = await breweryStore.getBreweryItem(props.id)
        } catch (err) {
            error.value = "Failed to load"
            alert(error.value)
        } finally {
            loading.value = false
        }
    }
    
    onMounted(loadBrewery)
</script>

<template>
  <div class="container">

    <div v-if="loading">
      Loading brewery...
    </div>

    <div v-else-if="brewery" class="card">
      <Header :image="breweryImage" title="Breweries Details"></Header>
      <BreweryCard 
        :key="brewery?.id" 
        :brewery="brewery">
        <a
            :href="brewery.website_url"
            target="_blank"
        >
            Visit Website
        </a>
        <p v-if="brewery.website_url"></p>

        <p v-if="brewery.phone">
            Phone: {{ brewery.phone }}
        </p>
        </BreweryCard>  
    </div>

  </div>
</template>
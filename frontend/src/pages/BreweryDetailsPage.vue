<script setup lang="ts">
    import { ref, onMounted, computed } from "vue"
    import Header from "../components/header.vue"
    import type { Brewery } from '../types/brewery'    
    import { useBreweryStore } from "../store/brewery"
    import breweryImage from "../assets/beer-mug.svg"
    import BreweryCard from "../components/breweryCard.vue"
    import { useSourceStore }from "../store/source"


    const breweryStore = useBreweryStore()
    const sourceStore = useSourceStore()

    const props = defineProps<{
        id: string
    }>()

    const brewery = ref<Brewery | null>(null)
    const loading = ref<boolean>(false)  
    const error = ref<string | null>(null) 
    const title = "Breweries Details"    
    async function loadBrewery() {
        try {
            loading.value = true

            // fallback to API (this will work when page is refreshed)
            brewery.value = await breweryStore.getBreweryItem(props.id)
        } catch (err) {
            error.value = "Failed to load"
            alert(error.value)
        } finally {
            loading.value = false
        }
    }

    const allowEdit = computed(() => {
        return sourceStore.source === 'internal' &&  isEdit.value ? true : false
    })
    const isEdit = ref(false)

    function cancelEdit() {
        isEdit.value = false
    }
    async function saveEdit(formData: any) {
        console.log('save edit', formData.value)
        try {
            const updated = await breweryStore.updateBrewery(formData.value.id, formData.value)
            if (updated) brewery.value = updated
             cancelEdit()
        } catch(err) {
            console.error("Failed to save edit", err)
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
      <Header :image="breweryImage" :title="title"></Header>
      <button class="edit-button" v-if="sourceStore.source === 'internal' && !isEdit" @click="isEdit = true">&#9998</button>
      <BreweryCard 
        :key="brewery?.id" 
        :brewery="brewery"
        :edit="allowEdit"
        @cancel-edit="cancelEdit"
        @save-edit="saveEdit">
            <div v-if="!allowEdit">
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
            </div>
        
        </BreweryCard>  
    </div>

  </div>
</template>

<style>
    .edit-button {
        display: inline-block;
        font-family: var(--sans);
        font-size: 16px;
        font-weight: 500;
        line-height: 1.4;
        color: var(--bg); /* text on colored background */
        background-color: var(--accent);
        border: 2px solid var(--accent-border);
        border-radius: 8px;
        cursor: pointer;
        transition: all 0.2s ease-in-out;
        box-shadow: var(--shadow);
        text-align: center;
        text-decoration: none;
        display: inline-block;
        transform: rotateZ(90deg);
    }

</style>
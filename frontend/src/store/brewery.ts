import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { getBreweries, getBrewery } from '../services/breweryService-external'
import { getBreweriesList, getBreweryItemById } from '../services/breweryService-internal'
import type { Brewery, Pagination } from '../types/brewery'
import { useSourceStore } from './source'

export const useBreweryStore = defineStore("brewery", () => {
    const breweries = ref<Brewery[]>([])
    const loading = ref(false)
    const page = ref(1)
    const search = ref("")
    // const pagination = ref<Pagination>({})

    const breweriesMap = computed(() => {
        const map: Record<string, Brewery> = {}
        breweries.value.forEach((brewery => {
            map[brewery.id] = brewery
        }))
        return map
    })

    async function fetchBreweries(limit?: number, search?: string) {
        loading.value = true
        let data
        if (useSourceStore().source === 'public') {
            data = await getBreweries()
            breweries.value = data
        } else {
            data = await getBreweriesList(page.value, limit, search)
            breweries.value = data.data
            // console.log('pagination', pagination)
            // pagination.value = data.pagination
        }
         
        // breweries.value = data.data
    }

    async function getBreweryItem(id:string) {
        loading.value = true
        if (useSourceStore().source === 'public') {
            return await getBrewery(id) 
        } else {
            return await getBreweryItemById(id)
        }
    }

    return {
        fetchBreweries,
        getBreweryItem,
        breweries,
        breweriesMap,
        page,
        search
    }
})
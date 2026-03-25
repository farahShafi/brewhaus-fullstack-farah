import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { getBreweries, getBrewery } from '../services/breweryService-external'
import { getBreweriesList, getBreweryItemById } from '../services/breweryService-internal'
import type { Brewery } from '../types/brewery'
import { useSourceStore } from './source'

export const useBreweryStore = defineStore("brewery", () => {
    const breweries = ref<Brewery[]>([])
    const loading = ref(false)
    const error = ref<string | null>(null)
    const page = ref(1)
    const search = ref("")
    const hasMore = ref(true)
    const limit = ref(20) // per page
    const stateName = ref("")
    const cityName = ref("")

    const breweriesMap = computed(() => {
        const map: Record<string, Brewery> = {}
        breweries.value.forEach((brewery => {
            map[brewery.id] = brewery
        }))
        return map
    })

    // fetch breweries with lazy load support
    async function fetchBreweries(reset = false) {
        if (reset) {
            breweries.value = []
            page.value = 1
            hasMore.value = true
        }

        if (loading.value || !hasMore.value) return

        loading.value = true
        error.value = null

        
        try {

            let data
            if (useSourceStore().source === 'public') {
                console.log('public')
                data = await getBreweries(page.value, limit.value, search.value, stateName.value, cityName.value)
            } else {
                const res = await getBreweriesList(page.value, limit.value, search.value, stateName.value)
                data = res.data
                if (page.value >= res.pagination.totalPages) hasMore.value = false
                else page.value++
            }

            breweries.value.push(...data)

            if (useSourceStore().source === 'public') {
                if (data.length < limit.value) hasMore.value = false
                else page.value++
            }

        } catch (err) {
            console.error("Failed to fetch breweries", err)
            error.value = "backend"
        } finally {
            loading.value = false
        }     
    }

    // reset and fetch first page
    function resetSearch(query?: string | null) {
        if (query === null) search.value = ""
        if (query?.length)  search.value = query
       
        fetchBreweries(true)
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
        resetSearch,
        loading,
        error,
        hasMore,
        breweries,
        breweriesMap,
        page,
        search,
        stateName,
        cityName,
    }
})
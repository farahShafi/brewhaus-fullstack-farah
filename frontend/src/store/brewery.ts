import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { getBreweries, getBrewery } from '../services/breweryService-external'
import { getBreweriesList, getBreweryItemById, updateBreweryItem } from '../services/breweryService-internal'
import type { Brewery } from '../types/brewery'
import { useSourceStore } from './source'
import { io } from 'socket.io-client'

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

    const socket = io('http://localhost:3000')

    socket.on('connect', () => {
        console.log('Connected:', socket.id)
    })

    socket.on('breweryUpdated', (data) => {
        updateBreweryItemState(data)
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
            // Commenting out because we dont want to call different api for public and internal
            // Now we are calling the same API and node backend will response back with the correct source of breweries

            // if (useSourceStore().source === 'public') {
            //     console.log('public')
            //     data = await getBreweries(page.value, limit.value, search.value, stateName.value, cityName.value)
            // } else {
            //     const res = await getBreweriesList(page.value, limit.value, search.value, stateName.value)
            //     data = res.data
            //     if (page.value >= res.pagination.totalPages) hasMore.value = false
            //     else page.value++
            // }

            const res = await getBreweriesList(page.value, limit.value, search.value, stateName.value, useSourceStore().source)
            
                if (useSourceStore().source === 'public') {
                    data = res
                    if (data.length < limit.value) hasMore.value = false
                    else page.value++
                } else {
                    data = res.data
                    if (page.value >= res.pagination.totalPages) hasMore.value = false
                        else page.value++
                    }
                

            breweries.value.push(...data)


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

    async function updateBreweryItemState(data: Brewery) {
        const index = breweries.value.findIndex(b => b.id === data.id)
        if (index !== -1) breweries.value[index] = data

        // Also update map if using
        breweriesMap.value[data.id] = data        
    }

    async function updateBrewery(id: string, data: Brewery) {
        // return updateBreweryItem(id, data)
        try {
        // Call API
        const updated = await updateBreweryItem(id, data)
        
        console.log('updated', updated)
        if (!updated) return null
            console.log('in store update func')
        // Update local Pinia state

        updateBreweryItemState(updated)

        return updated
      } catch (err) {
        console.error("Failed to update brewery in store", err)
        throw err
      }
    }

    return {
        fetchBreweries,
        getBreweryItem,
        updateBrewery,
        updateBreweryItemState,
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
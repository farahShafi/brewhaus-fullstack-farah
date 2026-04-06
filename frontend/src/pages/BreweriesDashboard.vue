<script setup lang="ts">
import { onMounted, onUnmounted } from "vue"
import { useBreweryStore } from "../store/brewery.ts"
import { useSourceStore } from "../store/source.ts"
import KpiCard from '../components/charts/KpiCard.vue'
import LocationChart from '../components/charts/LocationChart.vue'
import TypeChart from '../components/charts/TypeChart.vue'

import Header from "../components/header.vue"

import breweryImage from "../assets/beer-mug.svg"

const breweryStore = useBreweryStore()
const sourceStore = useSourceStore()



// life cycle hooks
onMounted(() => {
   breweryStore.getDashboard()
    console.log('breweryStore dashboard', breweryStore.dashboard) 
})

onUnmounted(() => {
    
})
</script>
    
<template>
    <div>
        
        <Header :image="breweryImage" title="Dashboard"></Header>
        <div :class="['banner', sourceStore.source === 'public' ? 'banner-public' : 'banner-internal']">
            data loaded from {{ sourceStore.source === 'public' ? 'Open Brewery DB https://www.openbrewerydb.org/documentation' : 'Internal Node.js API backed by a SQLite database' }}
        </div>
        <div v-if="breweryStore.dashboard">
            <!-- KPI -->
            <KpiCard :total="breweryStore.dashboard.total" />

            <!-- Charts -->
            <div class="grid">
            <LocationChart :data="breweryStore.dashboard.byLocation" />
            <TypeChart :data="breweryStore.dashboard.byType" />
            </div>
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
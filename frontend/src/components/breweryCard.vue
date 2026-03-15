<script setup lang="ts">
import { useRouter } from "vue-router"

import type { Brewery } from '../types/brewery'

const router = useRouter()

const props = defineProps<{
    brewery: Brewery
}>()

function goToDetails() {
    router.push(`/brewery/${props.brewery.id}`)
}
</script>

<template>
    <div>
        <div class="brewery-card" @click="goToDetails">
            <h3>{{ brewery.name }}</h3>
            <p>
                {{ brewery.city }}, {{ brewery.state }}
            </p>
            <p>
                Type: {{ brewery.brewery_type }}
            </p>
            <!-- Slot for extra content -->
            <slot></slot>
        </div>
    </div>
</template>

<style scoped>
    .brewery-card {
        display: flex;
        flex-direction: column;
        box-sizing: border-box;
        border: 1px solid var(--border);
        border-radius: 10px;
        padding: 16px;
        background: var(--bg);
        transition: 0.2s ease;
    }

    .brewery-card:hover {
        box-shadow: var(--shadow);
        border-color: var(--accent-border);
    }

    .brewery-card a {
        text-decoration: none;
        color: inherit;
    }

    .brewery-card h3 {
        color: var(--text-h);
        margin: 0 0 8px;
    }

    .brewery-card p {
        color: var(--text);
        font-size: 14px;
        margin: 4px 0;
    }

    .brewery-card p:last-child {
        margin-top: auto;
        color: var(--accent);
        font-weight: 500;
    }
</style>
<script setup lang="ts">
import { useRouter } from "vue-router"
import {  ref } from "vue";

import type { Brewery } from '../types/brewery'

const router = useRouter()

const props = defineProps<{
    brewery: Brewery,
    edit: Boolean
}>()

const emit = defineEmits(['cancelEdit', 'saveEdit'])


const form = ref({
    id: props.brewery.id,
    name: props.brewery.name,
    brewery_type: props.brewery.brewery_type
})

function goToDetails() {
    if (!props.edit) {
        router.push(`/brewery/${props.brewery.id}`)
    }
}
function cancelEdit() {
    emit('cancelEdit')
}
function save() {
    console.log('save clicked')
    emit('saveEdit', form)
}

</script>

<template>
    <div>
        <div class="brewery-card" @click="goToDetails">
            <template v-if="props.edit">
                <div>
                    <div class="form-input">
                        <label class="form-label" for="brewery-name">Brewery Name:</label>
                        <input
                            v-model="form.name"
                            placeholder="Brewery Name"
                        />
                    </div>
                    
                    <div class="form-input">
                        <label class="form-label" for="brewery-name">Choose Type:</label>
                        <select v-model="form.brewery_type" label="Type:">
                            <option value="micro">Micro</option>
                            <option value="nano">Nano</option>
                            <option value="regional">Regional</option>
                            <option value="brewpub">Brewpub</option>
                            <option value="large">Large</option>
                        </select>
                    </div>
                    

                    <div class="actions">
                        <button class="breweryButton" @click.stop="save">Save</button>
                        <button class="breweryButton" @click.stop="cancelEdit">Cancel</button>                
                    </div>
                </div>
                
            </template>
            <template v-else>
                <h3>{{ brewery.name }}</h3>
                <p>
                    {{ brewery.city }}, {{ brewery.state }}
                </p>
                <p>
                    Type: {{ brewery.brewery_type }}
                </p>
            </template>
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
    .breweryButton {
        margin: 5px;
        background: var(--accent);
        border: none;
        border-radius: 5px;
        color: white;
        padding: 4px 9px;
        cursor: pointer;
        box-shadow: var(--shadow);
        text-align: center;
        text-decoration: none;
        display: inline-block;
    }

    .form-label {
        margin-right: 10px;
        font-weight: 500;
    }
    .form-input {
        margin-bottom: 12px;
    }
</style>
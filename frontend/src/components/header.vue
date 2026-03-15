<script setup lang="ts">

defineProps<{
    title: string,
    image: string
}>()
</script>

<template>
  <header>
    <div class="heading">
        <span class="heading-span">
            <img :src="image" class="img" />
            <h1>{{ title }}</h1>
        </span>
    </div>
    <!-- <div v-if="searchIncluded" class="heading-search">
      <input v-model="searchTerm" @input="emitOnSearch(searchTerm)" type="text" class="search-input" placeholder="Enter a name to search..." />
    </div> -->
  </header>
</template>

<style scoped>
    .heading-span {
        display: flex;
        align-items: center; /* vertical center */
        justify-content: center; /* horizontal center */
        gap: 10px;           /* space between image and text */
    }

    .img {
        width: 32px;
        height: 32px;
    }
</style>

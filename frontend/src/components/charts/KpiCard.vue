<template>
  <div class="card">
    <h3>Total Breweries</h3>
    <p class="number">{{ total }}</p>
  </div>
</template>

<script setup>
defineProps({
  total: Number
})
</script>

<style>
.card {
  padding: 20px;
  border: 1px solid #eee;
  border-radius: 10px;
}
.number {
  font-size: 28px;
  font-weight: bold;
}
</style>
<template>
    <div class="chart-container">
        <Doughnut :data="chartData" :options="options"/>
    </div>
  
</template>

<script setup>
import { Doughnut } from 'vue-chartjs'
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend
} from 'chart.js'

ChartJS.register(ArcElement, Tooltip, Legend)

const props = defineProps({
  data: Array
})

const chartData = {
  labels: props.data.map(d => d.type),
  datasets: [
    {
      label: 'Breweries by Type',
      data: props.data.map(d => d.count),
      backgroundColor: [
        '#4CAF50',
        '#2196F3',
        '#FF9800',
        '#9C27B0',
        '#F44336',
        '#00BCD4',
        '#8BC34A'
      ]
    }
  ]
}
const options = {
  responsive: true,
  maintainAspectRatio: false
}
</script>
<style>
    .chart-container {
    position: relative;
    height: 300px;  /* 👈 key fix */
    width: 100%;
    }
</style>
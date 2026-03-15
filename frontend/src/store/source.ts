import { defineStore } from "pinia"
import { ref } from "vue"

export const useSourceStore = defineStore("source", () => {
  const source = ref(localStorage.getItem("source") ?? "public")

  function setSource(value: string) {
    source.value = value
    localStorage.setItem("source", value)
  }

  return { source, setSource }
})
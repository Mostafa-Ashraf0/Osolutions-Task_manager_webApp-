import { ref, reactive } from 'vue'
import { defineStore } from 'pinia'

export const UseTaskStore = defineStore('task', () => {
  const tasks = ref([]);
  const categories = ref([]);
  return {categories, tasks}
})

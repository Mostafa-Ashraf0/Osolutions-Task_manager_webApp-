import { ref, reactive } from 'vue'
import { defineStore } from 'pinia'

export const UseTaskStore = defineStore('task', () => {
  const tasks = ref([]);
  const categories = ref([]);
  const loading = ref(false);
  return {categories, tasks, loading}
})

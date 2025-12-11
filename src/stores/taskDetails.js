import { ref, reactive } from 'vue'
import { defineStore } from 'pinia'

export const useDetailsStore = defineStore('taskDetails', () => {
  const display = ref(false);
  const taskData = ref(null);
  const loading = ref(false);
  return {display, taskData, loading}
})

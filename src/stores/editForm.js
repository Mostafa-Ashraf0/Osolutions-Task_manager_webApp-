import { ref, reactive } from 'vue'
import { defineStore } from 'pinia'

export const useEditForm = defineStore('editform', () => {
  const formDisplay = ref(false);
  const editFormData = ref(null);
  const loading = ref(false);
  return {formDisplay,editFormData,loading}
})

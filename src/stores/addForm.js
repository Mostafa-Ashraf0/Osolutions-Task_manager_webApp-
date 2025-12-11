import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useAddForm = defineStore('addForm', () => {
  const formDisplay = ref(false);
  const addFormData = ref({
                title: "",
                categoryId: "",
                priority: "",
                description: "",
                img: ""
            });
  const loading = ref(false);
  return {formDisplay, addFormData, loading}
})

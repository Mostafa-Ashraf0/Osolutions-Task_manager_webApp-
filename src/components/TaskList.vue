<script setup>
    import { computed,ref } from 'vue';
    import Task from './Task.vue';
    import { UseTaskStore } from '@/stores/task';
    import { useAddForm } from '@/stores/addForm';
    //data store
    const addFormStore = useAddForm();
    const taskStore = UseTaskStore();
    const allTasks = computed(()=>{
        return taskStore.tasks;
    })
    const allCategories = computed(()=>{
        return taskStore.categories;
    })
    const categoryFilter = ref("");
    const handeAdd = ()=>{
        addFormStore.formDisplay = !addFormStore.formDisplay;
    }
</script>

<template>
    <div class="main">
        <h2>Tasks List</h2>
        <select name="filter" v-model="categoryFilter">
            <option value="">All</option>
            <option v-for="c in allCategories.value" :value="c.id">{{ c.name }}</option>
        </select>
        <button @click="handeAdd">Add</button>
        <span>{{ categoryFilter }}</span>
        <div v-if="categoryFilter" class="taskList">
            <Task v-for="(task, index) in allTasks.value.filter(t=>t.category_id === categoryFilter)" 
            :key="task.id" 
            :title="task.title"
            :completed="task.completed"
            :date="task.created_at"
            :description="task.description"
            :img="task.image_url"
            :categoryId="task.category_id"
            :categoryColor="allCategories.value.find(c=>c.id === task.category_id).color"
            :categoryName = "allCategories.value.find(c=>c.id === task.category_id).name"
            :categoryIcon = "allCategories.value.find(c=>c.id === task.category_id).icon_url"
            :priority = "task.priority"
            :updated = false
            />
        </div>
        <div v-else class="taskList">
            <Task v-for="(task, index) in allTasks.value" 
            :key="task.id" 
            :id="task.id"
            :title="task.title"
            :completed="task.completed"
            :date="task.created_at"
            :description="task.description"
            :img="task.image_url"
            :categoryId="task.category_id"
            :categoryColor="allCategories.value.find(c=>c.id === task.category_id)?.color"
            :categoryName = "allCategories.value.find(c=>c.id === task.category_id)?.name || 'none'"
            :categoryIcon = "allCategories.value.find(c=>c.id === task.category_id)?.icon_url"
            :priority = "task.priority"
            :updated = false
            />
        </div>

    </div>
</template>

<style scoped>
    .main{
        width: 100%;
        background-color: #E6ECF0;
        padding: 20px;
        border-radius: 5px;
    }
    .taskList{
        padding: 0 10px;
        display: flex;
        flex-wrap: wrap;
        gap: 10px;
        justify-content: space-between;
        height: 500px;
    }
    .main h2{
        margin: 0 0 15px;
    }
</style>
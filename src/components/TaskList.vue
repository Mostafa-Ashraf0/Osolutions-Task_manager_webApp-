<script setup>
    import { computed } from 'vue';
import Task from './Task.vue';
    import { UseTaskStore } from '@/stores/task';
    //data store
    const taskStore = UseTaskStore();
    const allTasks = computed(()=>{
        return taskStore.tasks;
    })
    const allCategories = computed(()=>{
        return taskStore.categories;
    })

</script>

<template>
    <div class="main">
        <h2>Tasks List</h2>
        <div class="taskList">
            <Task v-for="(task, index) in allTasks.value" 
            :key="task.id" 
            :title="task.title"
            :completed="task.completed"
            :date="task.created_at"
            :description="task.description"
            :img="task.image_url"
            :categoryColor="allCategories.value.find(c=>c.id === task.category_id).color"
            :categoryName = "allCategories.value.find(c=>c.id === task.category_id).name"
            :priority = "task.priority"
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
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
    const loadingIcon = new URL('@/assets/images/loading.png', import.meta.url).href;
    const priorityImg = {
        high: new URL('@/assets/images/redIcon.png', import.meta.url).href,
        medium: new URL('@/assets/images/blueIcon.png', import.meta.url).href,
        low: new URL('@/assets/images/yellowIcon.png', import.meta.url).href
    }
</script>

<template>
    <div class="main">
        <h2>Tasks List</h2>
        <div class="control">
            <select class="category-option" name="filter" v-model="categoryFilter">
                <option value="">All Categories</option>
                <option v-for="c in allCategories.value" :value="c.id">{{ c.name }}</option>
            </select>
            <div class="info">
                <span class="priorityCard">
                    <span>high</span>
                    <img :src="priorityImg.high" alt="">
                    <span>medium</span>
                    <img :src="priorityImg.medium" alt="">
                    <span>low</span>
                    <img :src="priorityImg.low" alt="">
                </span>
                <button @click="handeAdd" class="add">Add Task +</button>
            </div>
        </div>
        <div class="loading" v-if="taskStore.loading">
            <img class="loadingImg" :src="loadingIcon" alt=""></img>
            <span>Loading...</span>
        </div>
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
    
    .loading{
        width: 150px;
        height: 150px;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 5px;
    }
    .loading .loadingImg{
        width: 100px;
        height: 100px;
        border-radius: 10px;
    }
    .control{
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-bottom: 20px;
    }
    .category-option{
        width: 200px;
        padding: 10px;
        font-size: 15px;
        font-weight: 400;
        border: 1px solid #1D2D35;
        border-radius: 5px;
        background-color: #1d2d35cb;
        color: white;
    }
    .add{
        width: 100px;
        padding: 10px;
        cursor: pointer;
        font-size: 15px;
        font-weight: 500;
        border-radius: 5px;
        border: none;
        color: white;
        background-color: rgb(6, 182, 212);
    }
    .info{
        display: flex;
        align-items: center;
        gap: 10px;
    }
    .info .priorityCard{
        background-color: white;
        border: 1px solid #b6babd;
        border-radius: 5px;
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.08);
        padding: 10px;
        color: #1D2D35;
        font-weight: 500;
    }
    .info .priorityCard{
        display: flex;
        align-items: center;
        gap:10px
    }
    .priorityCard img{
        width: 20px;
        height: 20px;
    }
    /*tablet view */
    @media (min-width: 770px) and (max-width: 992px) {

    }
    @media (max-width: 769px) {
        .control{
            flex-direction: column;
            align-items: start;
            gap: 10px;
        }
        .control .info{
            flex-direction: column;
            align-items: start;
        }
    }
</style>
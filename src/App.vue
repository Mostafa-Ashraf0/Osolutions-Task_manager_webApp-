<script setup>
    import { onMounted } from 'vue';
    import { UseTaskStore } from './stores/task';
    import TaskList from './components/TaskList.vue';
    import DetailsPage from './components/DetailsPage.vue';
    import { getCategories } from './Api/getCategories';
    import { getTasks } from './Api/getTasks';
    import EditForm from './components/EditForm.vue';
    //data store
    const tasksStore = UseTaskStore();

    onMounted(async() => {
        const fetchedCategories = await getCategories();
        const fetchedTasks = await getTasks();
        //add fetched data in state
        tasksStore.categories.value = fetchedCategories;
        console.log(tasksStore.categories.value)
        tasksStore.tasks.value = fetchedTasks;
        console.log(tasksStore.tasks.value)
    });

</script>
    
<template>
    <TaskList/>
    <DetailsPage/>
    <EditForm/>
</template>

<style>
    *{
        box-sizing: border-box;
        margin: 0;
        overflow-x: hidden;
        font-family: "Roboto", sans-serif;
    }
    body{
        padding: 20px 100px;
    }
</style>

<script setup>
    import { onMounted } from 'vue';
    import { UseTaskStore } from './stores/task';
    import TaskList from './components/TaskList.vue';
    import DetailsPage from './components/DetailsPage.vue';
    import { getCategories } from './Api/getCategories';
    import { getTasks } from './Api/getTasks';
    import EditForm from './components/EditForm.vue';
    import AddForm from './components/AddForm.vue';
    import { useDetailsStore } from './stores/taskDetails';
    import { useAddForm } from './stores/addForm';
    import { useEditForm } from './stores/editForm';
    const add = useAddForm();
    const edit = useEditForm();
    const details = useDetailsStore();
    //data store
    const tasksStore = UseTaskStore();

    onMounted(async() => {
        const fetchedCategories = await getCategories();
        const fetchedTasks = await getTasks();
        //add fetched data in state
        tasksStore.categories.value = fetchedCategories;
        tasksStore.tasks.value = fetchedTasks;
    });

</script>
    
<template>
    <TaskList/>
    <DetailsPage/>
    <EditForm/>
    <AddForm/>
    <div class="overlay" :style="{display:details.display||add.formDisplay||edit.formDisplay?'block':'none'}"></div>
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
    .overlay{
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100vh;
        background-color: rgba(0, 0, 0, 0.541);
        z-index: 999;
    }
    /*tablet view */
    @media (min-width: 770px) and (max-width: 992px) {
        body{
            padding: 20px;
        }
    }
    @media (max-width: 769px) {
        body{
            padding: 20px;
        }
    }
</style>

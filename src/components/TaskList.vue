<script setup>
    import Task from './Task.vue';
</script>

<template>
    <div class="main">
        <h2>Tasks List</h2>
        <div class="taskList">
            <Task/>
            <Task/>
            <Task/>
            <Task/>
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
    }
    .main h2{
        margin: 0 0 15px;
    }
</style>
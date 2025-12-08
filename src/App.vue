<script setup>
    import { useCounterStore } from './stores/counter';
    import TaskList from './components/TaskList.vue';
    const counter = useCounterStore();
</script>
    
<template>
    <TaskList/>
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

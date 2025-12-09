<script setup>
    defineProps({
        title: String,
        description:String,
        completed:Boolean,
        img:String,
        date:String,
        categoryColor: String,
        categoryName: String,
        priority: String
    })
    const expandIcon = new URL('@/assets/images/expand.png', import.meta.url).href;
    const priorityImg = {
        high: new URL('@/assets/images/redIcon.png', import.meta.url).href,
        medium: new URL('@/assets/images/blueIcon.png', import.meta.url).href,
        low: new URL('@/assets/images/yellowIcon.png', import.meta.url).href
    }
</script>

<template>
    <div class="task">
        <div class="text">
            <div class="head">
                <h3>{{ title }}</h3>
                <div class="expandIcon">
                    <img class="expand" :src="expandIcon" alt="img"></img>
                </div>
            </div>
            <p>{{ description }}</p>
        </div>
        <div class="info">
            <div class="tags">
                <span :style="{backgroundColor: categoryColor}">{{categoryName}}</span>
                <span v-if="completed" style="background-color: #28a745;">completed</span>
                <span v-if="!completed" style="background-color: #6c757d;">pending</span>
                <img class="priorityIcon" :src="priorityImg[priority]" alt="img">
            </div>
        </div>
    </div>
</template>

<style scoped>
    .task{
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        padding: 12px 0;
        background-color: white;
        border: 1px solid #E6ECF0;
        border-radius: 5px;
        width: calc(33.33% - 10px);
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.08);
    }
    .task .text{
        padding: 0 12px;
    }
    .text .head{
        display: flex;
        align-items: center;
        justify-content: space-between;
    }
    .text .head .expandIcon{
        border-radius: 50%;
        width: 30px;
        height: 30px;
        display: flex;
        justify-content: center;
        align-items: center;
        cursor: pointer;
    }
    .text .head .expandIcon:hover{
        background-color: rgba(128, 128, 128, 0.137);
    }
    .text .head .expand{
        cursor: pointer;
        width: 18px;
        height: 18px;
    }
    .task h3,
    .task p{
        margin: 0 0 10px;
        color: #1D2D35;
        font-size: 15px;
    }
    .task h3{
        font-weight: 700;
    }
    .task p{
        font-weight: 400;
    }
    .task .info{
        border-top: 2px solid #E6ECF0;
        padding: 12px 12px 0;
    }
    .tags{
        display: flex;
        align-items: center;
        justify-content: start;
        gap: 10px;
    }
    .tags span{
        background-color: #0013FE;
        color: white;
        padding: 4px 12px;
        border-radius: 5px;
        text-align: center;
        font-size: 15px;
        font-weight: 500;
    }

    .priorityIcon{
        width: 20px;
        height: 20px;
    }


</style>
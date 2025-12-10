<script setup>
    import { useEditForm } from '@/stores/editForm';
    import { useDetailsStore } from '@/stores/taskDetails';
    import { computed } from 'vue';

    const editFormStore = useEditForm();
    const detailsStore = useDetailsStore();
    const taskData = computed(()=>{
        return editFormStore.editFormData;
    })
    const closeIcon = new URL('@/assets/images/close.jpg', import.meta.url).href;
    const closePage = ()=>{
        editFormStore.formDisplay = !editFormStore.formDisplay
    }
    const handleCancel = ()=>{
        detailsStore.display = !detailsStore.display;
        editFormStore.formDisplay = !editFormStore.formDisplay;
    }
</script>

<template>
    <div class="detailsPage" :style="{display:editFormStore.formDisplay?'flex':'none'}">
        <div class="closeIcon" @click="closePage">
            <img class="close" :src="closeIcon" alt="icon"></img>
        </div>
        <div v-if="taskData" class="inputSection">
            <div class="inputGroup">
                <label for="title">Title</label>
                <input type="text" v-model="editFormStore.editFormData.title" required>
            </div>
            <div class="inputGroup">
                <label for="category">Category</label>
                <input type="text" v-model="editFormStore.editFormData.categoryName" required>
            </div>
            <div class="inputGroup">
                <label for="priority">Priority</label>
                <input type="text" v-model="editFormStore.editFormData.priority">
            </div>

        </div>
        <div v-if="taskData" class="inputSection">
            <div class="inputGroup">
                <label for="description">Description</label>
                <textarea name="description" v-model="editFormStore.editFormData.description"></textarea>
            </div>
            <div class="inputGroup">
                <label for="imgUrl">ImgUrl</label>
                <input type="text" v-model="editFormStore.editFormData.img">
            </div>
            <div class="btns">
                <button class="save">Save</button>
                <button class="cancel" @click="handleCancel">Cancel</button>
            </div>
        </div>
    </div>
</template>

<style scoped>
    .detailsPage{
        width: 80%;
        height: 80vh;
        background-color: white;
        color: black;
        position: absolute;
        top: 10vh;
        left: 10%;
        padding: 30px;
        border-radius: 5px;
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.08);
    }
    .detailsPage .closeIcon{
        border-radius: 50%;
        width: 40px;
        height: 40px;
        display: flex;
        justify-content: center;
        align-items: center;
        cursor: pointer;
        position: absolute;
        right: 5px;
        top: 5px;
    }
    .detailsPage .closeIcon:hover{
        background-color: rgba(128, 128, 128, 0.137);
    }
    .detailsPage .close{
        cursor: pointer;
        width: 30px;
        height: 30px;
    }

    .inputSection{
        width: 50%;
        height: 100%;
        display: flex;
        flex-direction: column;
        gap:20px;
    }
    .inputSection .inputGroup{
        display: flex;
        flex-direction: column;
        gap: 5px;
    }

    .inputSection .inputGroup label{
        font-size: 14px;
        font-weight: 500;
    }
    .inputSection .inputGroup input,
    .inputSection .inputGroup textarea{
        padding: 10px;
        font-size: 15px;
        font-weight: 400;
        border: 1px solid rgb(168, 162, 162);
        border-radius: 5px;
        background-color: #E6ECF0;
        color: #1D2D35;
    }
    .inputSection .inputGroup input{
        height: 30px;
        width: 70%;
    }
    .inputSection .inputGroup textarea{
        height: 150px;
    }
    .taskImg{
        width: 100%;
        height: 170px;
        object-fit: cover;
        border-radius: 5px;
    }
    .btns{
        display: flex;
        align-items: center;
        justify-content: flex-end;
        gap: 10px;
    }
    .btns button{
        width: 100px;
        padding: 5px 10px;
        cursor: pointer;
        font-size: 15px;
        font-weight: 500;
        border-radius: 5px;
        border: none;
        color: white;
    }
    .btns .save{
        background-color: #1D2D35;
    }
    .btns .cancel{
        background-color: #ef4444;
    }
    
</style>
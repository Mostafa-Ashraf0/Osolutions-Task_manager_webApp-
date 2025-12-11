<script setup>
    import toastr from 'toastr';
    import "toastr/build/toastr.min.css";
    import { useEditForm } from '@/stores/editForm';
    import { useAddForm } from '@/stores/addForm';
    import { useDetailsStore } from '@/stores/taskDetails';
    import { UseTaskStore } from '@/stores/task';
    import { getTasks } from '@/Api/getTasks';
    import { computed } from 'vue';

    const taskStore = UseTaskStore();
    const editFormStore = useEditForm();
    const addFormStore = useAddForm();
    const detailsStore = useDetailsStore();

    const allCategories = computed(()=>{
        return taskStore.categories;
    })
    const taskData = computed(()=>{
        return addFormStore.addFormData;
    })
    const closeIcon = new URL('@/assets/images/close.jpg', import.meta.url).href;
    const closePage = ()=>{
        addFormStore.formDisplay = !addFormStore.formDisplay;
    }
    const handleCancel = ()=>{
        addFormStore.formDisplay = !addFormStore.formDisplay;
    }
    const handleAdd = async()=>{
        const baseUrl = `https://${import.meta.env.VITE_SUPABASE_PROJECT_ID}.supabase.co/rest/v1/tasks`
        try{
        addFormStore.loading = true;
        const res = await fetch(baseUrl,{
            method: 'POST',
            headers:{
                'Authorization': `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`,
                'apikey': import.meta.env.VITE_SUPABASE_ANON_KEY,
                'Content-Type': 'application/json',
                'Prefer':'return=representation'
            },
            body: JSON.stringify({
                title: taskData.value.title,
                category_id: taskData.value.categoryId,
                priority: taskData.value.priority||null,
                description: taskData.value.description||null,
                image_url: taskData.value.img||null
            })
            }
            );
            const data = await res.json();
            console.log("added",data)
            const fetchedTasks = await getTasks();
            addFormStore.addFormData = {
                title: "",
                categoryId: "",
                priority: "",
                description: "",
                img: ""
            }
            taskStore.tasks.value = fetchedTasks;
            addFormStore.formDisplay = !addFormStore.formDisplay;
            return data;
            
        }catch(error){
            addFormStore.loading = false;
            toastr.error("failed to add task")
        }finally{
            addFormStore.loading = false;
            toastr.success("Task Added successfuly")
        }
    }
    const loadingIcon = new URL('@/assets/images/loading.png', import.meta.url).href;
</script>

<template>
    <form class="detailsPage" @submit.prevent="handleAdd" :style="{display:addFormStore.formDisplay?'flex':'none'}">
        <div class="closeIcon" @click="closePage">
            <img class="close" :src="closeIcon" alt="icon"></img>
        </div>
        <div class="loading" v-if="addFormStore.loading">
            <img class="loadingImg" :src="loadingIcon" alt=""></img>
            <span>loading...</span>
        </div>
        <div class="inputSection" :style="{ display: addFormStore.loading ? 'none' : 'flex' }">
            <div class="inputGroup">
                <label for="title">Title</label>
                <input type="text" v-model="addFormStore.addFormData.title" required>
            </div>
            <div class="inputGroup">
                <label for="category">Category</label>
                <select name="category" v-model="addFormStore.addFormData.categoryId" required>
                    <option v-for="c in allCategories.value" :value="c.id">{{ c.name }}</option>
                </select>
            </div>
            <div class="inputGroup">
                <label for="priority">Priority</label>
                <select name="priority" v-model="addFormStore.addFormData.priority">
                    <option value="high">high</option>
                    <option value="medium">medium</option>
                    <option value="low">low</option>
                </select>
            </div>

        </div>
        <div class="inputSection" :style="{ display: addFormStore.loading ? 'none' : 'flex' }">
            <div class="inputGroup">
                <label for="description">Description</label>
                <textarea name="description" v-model="addFormStore.addFormData.description"></textarea>
            </div>
            <div class="inputGroup">
                <label for="imgUrl">ImgUrl</label>
                <input type="text" v-model="addFormStore.addFormData.img">
            </div>
            <div class="btns">
                <button class="save" type="submit">Add</button>
                <button class="cancel" type="button" @click="handleCancel">Cancel</button>
            </div>
        </div>
    </form>
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
        z-index: 1000;
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
    .inputSection .inputGroup textarea,
    .inputSection .inputGroup select{
        padding: 10px;
        font-size: 15px;
        font-weight: 400;
        border: 1px solid rgb(168, 162, 162);
        border-radius: 5px;
        background-color: #E6ECF0;
        color: #1D2D35;
    }
    .inputSection .inputGroup input,
    .inputSection .inputGroup select{
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
    @media (min-width: 770px) and (max-width: 992px) {
        .inputSection .inputGroup input,
        .inputSection .inputGroup select{
            width: 90%;
        }
    }
    @media (max-width: 769px) {
        .detailsPage{
            height: auto;
            display: flex;
            flex-direction: column;
            gap: 10px;
        }
        .inputSection{
            width: 100%;
        }
        .inputSection .inputGroup input,
        .inputSection .inputGroup select{
            width: 100%;
        }
    }
</style>
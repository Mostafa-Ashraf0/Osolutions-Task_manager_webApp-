<script setup>
    import toastr from 'toastr';
    import "toastr/build/toastr.min.css";
    import { useDetailsStore } from '@/stores/taskDetails';
    import { UseTaskStore } from '@/stores/task';
    import { computed } from 'vue';
    import { useEditForm } from '@/stores/editForm';
    import { deleteTask } from '@/Api/deleteTask';

    const editFormStore = useEditForm();
    const taskStore = UseTaskStore();
    //selected task
    const detailsStore = useDetailsStore();
    const taskData = computed(()=>{
        return detailsStore.taskData;
    })
    
    const closeIcon = new URL('@/assets/images/close.jpg', import.meta.url).href;
    const closePage = ()=>{
        detailsStore.display = !detailsStore.display
    }
    const toggleStatus = async()=>{
        const baseUrl = `https://${import.meta.env.VITE_SUPABASE_PROJECT_ID}.supabase.co/rest/v1/tasks?id=eq.${taskData.value.id}`
        try{
        detailsStore.loading = true;
        const res = await fetch(baseUrl,{
            method: 'PATCH',
            headers:{
                'Authorization': `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`,
                'apikey': import.meta.env.VITE_SUPABASE_ANON_KEY,
                'Content-Type': 'application/json',
                'Prefer':'return=representation'
            },
            body: JSON.stringify({
                completed: !taskData.value.completed
            })
            }
            );
            const data = await res.json();
            console.log("updated",data)
            //edit completed state in details page
            detailsStore.taskData.completed = data[0].completed;
            //edit completed state in tasks list
            const mainTask = taskStore.tasks.value.find(t=>t.id === taskData.value.id)
            mainTask.completed = data[0].completed;
            return data;
            
        }catch(error){
            detailsStore.loading = false;
            toastr.error(error);
        }finally{
            detailsStore.loading = false;
            console.log("fetched")
            toastr.success("Status edited");
        }
    }
    const handleEdit = ()=>{
        detailsStore.display = !detailsStore.display;
        editFormStore.formDisplay = !editFormStore.formDisplay;
    }
    const handleDelete = async()=>{
        await deleteTask(taskData.value.id);
        detailsStore.display = !detailsStore.display
    }
    const loadingIcon = new URL('@/assets/images/loading.png', import.meta.url).href;
</script>

<template>
    <div class="detailsPage" :style="{display:detailsStore.display?'flex':'none'}">
        <div class="closeIcon" @click="closePage">
            <img class="close" :src="closeIcon" alt="icon"></img>
        </div>
        <div class="loading" v-if="detailsStore.loading">
            <img class="loadingImg" :src="loadingIcon" alt=""></img>
            <span>loading...</span>
        </div>
        <div class="inputSection" :style="{ display: detailsStore.loading ? 'none' : 'flex' }">
            <div class="inputGroup">
                <label for="title">Title</label>
                <input type="text" :value="taskData?.title" readonly>
            </div>
            <div class="inputGroup">
                <label for="category">Category</label>
                <input type="text" :value="taskData?.categoryName" readonly>
            </div>
            <div class="inputGroup">
                <label for="priority">Priority</label>
                <input type="text" :value="taskData?.priority" readonly>
            </div>
            <span v-if="taskData?.completed"
             style="background-color: rgb(108, 117, 125);"
             class="toggle"
            @click="toggleStatus"
             >change to pending</span>
             <span v-else
             style="background-color: rgb(40, 167, 69);"
             class="toggle"
            @click="toggleStatus"
             >change to completed</span>

        </div>
        <div class="inputSection" :style="{ display: detailsStore.loading ? 'none' : 'flex' }">
            <div class="inputGroup">
                <label for="description">Description</label>
                <textarea name="description" :value="taskData?.description" readonly></textarea>
            </div>
            <img class="taskImg" :src="taskData?.img" alt="image">
            <div class="btns">
                <button class="edit" @click="handleEdit">Edit</button>
                <button class="delete" @click="handleDelete">Delete</button>
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
    .btns .edit{
        background-color: #1D2D35;
    }
    .btns .delete{
        background-color: #ef4444;
    }
    .toggle{
        cursor: pointer;
        width: 200px;
        height: 30px;
        color: white;
        border-radius: 10px;
        display: flex;
        align-items: center;
        justify-content: center;
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
</style>
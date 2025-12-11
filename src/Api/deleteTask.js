import { getTasks } from "./getTasks";
import { UseTaskStore } from '@/stores/task';
import { useDetailsStore } from '@/stores/taskDetails';
import toastr from 'toastr';
import "toastr/build/toastr.min.css";

const deleteTask = async(id)=>{
    const detailsStore = useDetailsStore();
    const taskStore = UseTaskStore();
    const baseUrl = `https://${import.meta.env.VITE_SUPABASE_PROJECT_ID}.supabase.co/rest/v1/tasks?id=eq.${id}`

    try{
        detailsStore.loading = true;
        const res = await fetch(baseUrl,{
            method: 'DELETE',
            headers:{
                'Authorization': `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`,
                'apikey': import.meta.env.VITE_SUPABASE_ANON_KEY,
                'Content-Type': 'application/json',
                'Prefer':'return=representation'
            }
        }
        );
        const data = await res.json();
        const fetchedTasks = await getTasks();
        taskStore.tasks.value = fetchedTasks;
        return data;
        
    }catch(error){
        detailsStore.loading = false;
        toastr.error(error);
    }finally{
        detailsStore.loading = false;
        toastr.success("Task deleted")
    }
}

export {deleteTask};
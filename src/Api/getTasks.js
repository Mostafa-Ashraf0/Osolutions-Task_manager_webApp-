import { UseTaskStore } from '@/stores/task';
import toastr from 'toastr';
import "toastr/build/toastr.min.css";

const getTasks = async()=>{
    const taskStore = UseTaskStore();
    const baseUrl = `https://${import.meta.env.VITE_SUPABASE_PROJECT_ID}.supabase.co/rest/v1/tasks?order=created_at.desc`

    try{
        taskStore.loading = true;
        const res = await fetch(baseUrl,{
            method: 'GET',
            headers:{
                'Authorization': `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`,
                'apikey': import.meta.env.VITE_SUPABASE_ANON_KEY,
                'Content-Type': 'application/json',
                'Prefer':'return=representation'
            }
        }
        );
        const data = await res.json();
        console.log(data)
        return data;
        
    }catch(error){
        taskStore.loading = false;
        toastr.error("Failed to retreve data")
    }finally{
        taskStore.loading = false;
        console.log("fetched")
    }
}

export {getTasks};
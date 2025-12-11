import toastr from 'toastr';
import "toastr/build/toastr.min.css";

const getCategories = async()=>{
    const baseUrl = `https://${import.meta.env.VITE_SUPABASE_PROJECT_ID}.supabase.co/rest/v1/categories?order=name.asc`
    try{
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
        return data;
    }catch(error){
        toastr.error("Failed to retreve data");
    }finally{
        console.log("fetched");
    }
}

export {getCategories};
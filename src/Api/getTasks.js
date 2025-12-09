
const getTasks = async()=>{
    const baseUrl = `https://${import.meta.env.VITE_SUPABASE_PROJECT_ID}.supabase.co/rest/v1/tasks?order=created_at.desc`

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
        console.log(data)
        return data;
        
    }catch(error){
        alert(error);
    }finally{
        console.log("fetched")
    }
}

export {getTasks};


async function register(url,values){
    try{
        const response = api.post(url, {values})
        const data = await response.data
        if (response.status === 200) {
            return { status: true, data: data }
        }
        else {
            return { status: false }
        }
    }
    catch (e) {
        console.error("Network error", e)
        return { status: false }
    }
}
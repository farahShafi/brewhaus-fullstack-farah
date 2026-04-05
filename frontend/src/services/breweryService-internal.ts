import type { Brewery } from "../types/brewery"

const internalNodeAPI = "http://localhost:3000/api"

export async function getBreweriesList(
    page: number = 1, 
    limit: number = 20, 
    search?: string,
    state?: string,
    source?: string ) {


    try {
        const res = await fetch(`${internalNodeAPI}/breweries?page=${page}&limit=${limit}&search=${search || ""}&state=${state}&source=${source}`)
        
        if (!res.ok) {
            throw new Error(`API Error: ${res.status}`)
        }

        return await res.json()

    } catch(err: any) {
        // ignore aborted requests
        if (err.name === "AbortError") {
            return []
        }

        console.error("Failed to fetch breweries:", err)
        return []
    }   
    
}

export async function updateBreweryItem(id: string, data: Brewery) {
    try { 
        console.log('data in internal', data)
        const res = await fetch (`${internalNodeAPI}/breweries/${id}`, 
            {
                method: "PUT",
                headers: {
                "Content-Type": "application/json"
                },
                body: JSON.stringify(data)
            })
        if (!res) {
            throw new Error(`API Error: ${res}`)
        }    
        return await res.json()
    } catch (err: any) {
        console.error(" failed to update brewery", err)
    }
}

export async function getBreweryItemById(id: string) {
    try {
        const res = await fetch (`${internalNodeAPI}/breweries/${id}`)

        if (!res.ok) {
            throw new Error(`API Error: ${res.status}`)
        }
        return await res.json()

     } catch (err: any) {
        console.error("Failed to fetch brewery:", err)
        return null
    } 
    
}
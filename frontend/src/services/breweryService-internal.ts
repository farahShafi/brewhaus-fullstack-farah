const internalNodeAPI = "http://localhost:3000/api"

export async function getBreweriesList(page?: number, limit?: number, search?: string) {
    const res = await fetch(`${internalNodeAPI}/breweries?page=${page}&limit=${limit || 200}&search=${search || ""}`)
    return res.json()
}

export async function getBreweryItemById(id: string) {
    const res = await fetch (`${internalNodeAPI}/breweries/${id}`)
    return res.json()
}
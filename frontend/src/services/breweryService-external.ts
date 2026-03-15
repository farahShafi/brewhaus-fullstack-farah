const openbreweryAPI = "https://api.openbrewerydb.org/v1"

export async function getBreweries(
  page: number = 1,
  limit: number = 20,
  search?: string
) {

  try {
    let url = `${openbreweryAPI}/breweries?page=${page}&per_page=${limit}`

    if (search && search.trim().length > 0) {
      const query = encodeURIComponent(search)
      url += `&by_name=${query}`
    }

    const res = await fetch(url, {
      cache: "no-store"
    })

    if (!res.ok) {
      throw new Error(`API Error: ${res.status}`)
    }

    return await res.json()

  } catch (err: any) {

    // ignore aborted requests
    if (err.name === "AbortError") {
      return []
    }

    console.error("Failed to fetch breweries:", err)
    return []
  }
}



export async function getBrewery(id: string) {

  try {

    const res = await fetch(`${openbreweryAPI}/breweries/${id}`)

    if (!res.ok) {
      throw new Error(`API Error: ${res.status}`)
    }

    return await res.json()

  } catch (err) {

    console.error("Failed to fetch brewery:", err)
    return null
  }
}



export async function searchBreweries(query: string) {

  try {

    const encodedQuery = encodeURIComponent(query)

    const res = await fetch(
      `${openbreweryAPI}/breweries?by_name=${encodedQuery}`
    )

    if (!res.ok) {
      throw new Error(`API Error: ${res.status}`)
    }

    return await res.json()

  } catch (err) {

    console.error("Search failed:", err)
    return []
  }
}
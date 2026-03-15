const openbreweryAPI = "https://api.openbrewerydb.org/v1"

export async function getBreweries(page?: number, limit?:number, search?: string) {
  let url = `${openbreweryAPI}/breweries?page=${page}&per_page=${limit || 200}`
  const query = encodeURIComponent(search?.toString() || "")
  if (search) {
    url += `&by_name=${query}`
  }
  // avoid CORS errors when calling external APIs
  const res = await fetch(url, { cache: "no-store" })
  return res.json()
}

export async function getBrewery(id:string) {
    console.log('in service', id)
  const res = await fetch(`${openbreweryAPI}/breweries/${id}`)
  return res.json()
}

export async function searchBreweries(query:string) {
  const res = await fetch(`${openbreweryAPI}/breweries?by_name=${query}`)
  return res.json()
}
const openbreweryAPI = "https://api.openbrewerydb.org/v1"

export async function getBreweries() {
  const res = await fetch(`${openbreweryAPI}/breweries`)
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
import axios from "axios"

const BASE_URL = "https://api.openbrewerydb.org/v1"

export async function fetchFromExternalSource(page, limit, search, state) {
    let url = `${BASE_URL}/breweries?page=${page}&per_page=${limit}`

    if (search && search.trim().length > 0) {
      const query = encodeURIComponent(search)
      url += `&by_name=${query}`
    }

    if (state) {
      url += `&by_state=${state}`
    }
    const response = await axios.get(`${url}`)
    return response.data
}
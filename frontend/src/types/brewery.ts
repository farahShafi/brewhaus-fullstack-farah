export interface Brewery {
  id: string
  name: string
  city: string
  state: string
  brewery_type: string
  website_url?: string
  phone?: string
}

export interface Pagination {
  limit?: number
  page?: number
  total?: number
  totalPages?: number
}
import * as breweryRepository from "../repositories/breweryRepository.js"

export function getBreweries(page, limit, search, state) {
    const offset = (page -1) * limit
    const breweries =  breweryRepository.findAll(limit, offset, search, state)
    const total = breweryRepository.count(search)

    return {
        data: breweries,
        pagination: {
            page,
            limit,
            total,
            totalPages: Math.ceil(total / limit)
        }
    }

}

export function getBrewery(id) {
    return breweryRepository.findById(id)
}
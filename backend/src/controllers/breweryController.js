import * as breweryService from '../services/breweryServices.js'

export function getBreweries(req, res) {
    try {
        const page = parseInt(req.query.page) || 1
        const limit = parseInt(req.query.limit) || 10
        const search = req.query.search || ""

        const breweries = breweryService.getBreweries(page, limit, search)

        res.json(breweries)
    } catch (err) {
        console.error(err)
        res.status(500).json({ error: "Failed to fetch"})
    }
    
}

export function getBrewery(req, res) {
    const { id } = req.params
    const brewery = breweryService.getBrewery(id)
    res.json(brewery)
}
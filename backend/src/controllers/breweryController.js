import * as breweryService from '../services/breweryServices.js'
import * as breweryExternalService from '../services/breweryExternalServices.js'

export async function getBreweries(req, res) {
    try {
        const page = parseInt(req.query.page) || 1
        const limit = parseInt(req.query.limit) || 10
        const search = req.query.search || ""
        const state = req.query.state || ""
        const source = req.query.source
        let breweries 
        
        if (source !== 'public') {
            breweries = breweryService.getBreweries(page, limit, search, state)
        } else {
            breweries = await breweryExternalService.fetchFromExternalSource(page, limit, search, state)
        }
        res.json(breweries)

    } catch (err) {
        console.error(err)
        res.status(500).json({ error: "Failed to fetch"})
    }
    
}

export async function updateBrewery(req, res) {
    try {
        const { id } = req.params
        const data = req.body

        const updated = await breweryService.update(id, data)

        if(!updated) {
            return res.status(404).json({
                message: 'Brewery not found'
            })
        }

        
        return res.json(updated);
    } catch(err) {
        console.error(err)
        res.status(500).json({ error: "Failed to update"})
    }
}

export function getBrewery(req, res) {
    const { id } = req.params
    const brewery = breweryService.getBrewery(id)
    res.json(brewery)
}

export async function getDashboard(req, res) {
    try {
        const result = await breweryService.getDashboard()
        return res.json(result)
    } catch(err) {
        console.error(err)
        res.status(500).json({ error: "Failed to get Dashboard data"})
    }
}
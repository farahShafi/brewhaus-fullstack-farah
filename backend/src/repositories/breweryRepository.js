import db from "../db/database.js"
import Redis from "ioredis"

const redis = new Redis()
export function findAll(limit, offset, search, state) {
    const query = `
    SELECT * 
    FROM breweries
    WHERE NAME LIKE ?
    AND STATE LIKE ?
    LIMIT ?
    OFFSET ?`
    return db.prepare(query).all(`%${search}%`, `%${state}%`, limit, offset)
}

export function count(search) {
    const query = `
        SELECT COUNT(*) as total
        FROM breweries
        WHERE name LIKE ?
    `
    return db.prepare(query).get(`%${search}%`).total
}

export async function update(id, data) {
    if (data.id) delete data.id

    const fields = Object.keys(data)

    if (fields.length === 0) {
        throw new Error("No fields provided for update")
    }

    const setClause = fields.map(field => `${field} = ?`).join(", ");
    const value = fields.map(field => data[field])

    // Full query
    const query = `UPDATE breweries SET ${setClause} WHERE id = ?`

    const stmt = db.prepare(query)
    const result = stmt.run(...value, id)

    if (result.changes === 0) {
        return null
    }
    // find updated row
    const item = findById(id)

    // realtime Event TO do
    await redis.publish('breweryUpdates',
        JSON.stringify({
            id,
            ...item
        })
    )
    // console.log('Published to Redis', {id, ...data})
    return item
}

export function findById(id) {
    return db.prepare("SELECT * FROM breweries WHERE id = ?").get(id)
}

export function findByName(name) {
    return db.prepare("SELECT * FROM breweries WHERE name = ?").get(name)
}

export async function getDashboard() {
    const totalCountQuery = `
    SELECT COUNT(*) as total
    FROM breweries
    `
    const totalCount = db.prepare(totalCountQuery).get()

    const locationResultQuery = `
    SELECT state, COUNT(*) AS count
    FROM breweries
    GROUP BY state
    ORDER BY count DESC
    `

    const locationResult = db.prepare(locationResultQuery).all()

    const typeResultQuery = `
    SELECT brewery_type, COUNT(*) as count
    FROM breweries
    GROUP BY brewery_type
    ORDER BY count DESC
    `

    const typeResult = db.prepare(typeResultQuery).all()

    const finalResult = {
        total: totalCount,
        byLocation: locationResult.map(row => ({
            location: row.state,
            count: Number(row.count)
        })),
        byType: typeResult.map(row => ({
            type: row.brewery_type,
            count: Number(row.count)
        }))
    }
    return finalResult
    // return format
    // {
    //     "total": 1245,
    //     "byLocation": [
    //         { "location": "California", "count": 300 },
    //         { "location": "Texas", "count": 200 }
    //     ],
    //     "bySize": [
    //         { "size": "Small", "count": 700 },
    //         { "size": "Medium", "count": 400 },
    //         { "size": "Large", "count": 145 }
    //     ]
    // }
}
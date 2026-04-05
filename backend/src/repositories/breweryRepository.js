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
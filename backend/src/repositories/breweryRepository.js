import db from "../db/database.js"

export function findAll(limit, offset, search) {
    const query = `
    SELECT * 
    FROM breweries
    WHERE NAME LIKE ?
    LIMIT ?
    OFFSET ?`
    return db.prepare(query).all(`%${search}%`, limit, offset)
}

export function count(search) {
    const query = `
        SELECT COUNT(*) as total
        FROM breweries
        WHERE name LIKE ?
    `
    return db.prepare(query).get(`%${search}%`).total
}

export function findById(id) {
    return db.prepare("SELECT * FROM breweries WHERE id = ?").get(id)
}

export function findByName(name) {
    return db.prepare("SELECT * FROM breweries WHERE name = ?").get(name)
}
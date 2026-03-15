// import db from "./database.js"
// import { breweries } from "./seeds/breweries.js"

// db.prepare(`
//     CREATE TABLE IF NOT EXISTS breweries (
//         id INTEGER PRIMARY KEY AUTOINCREMENT,
//         name TEXT,
//         street TEXT,
//         city TEXT,
//         state TEXT,
//         postal_code TEXT,
//         brewery_type TEXT,
//         phone TEXT,
//         website_url TEXT
//         )
//     `).run()

// const insert = db.prepare(`
//     INSERT INTO breweries (name, street, city, state, postal_code, brewery_type, phone, website_url)
//     VALUES (?, ?, ?, ?, ?, ?, ?, ?)
//     `)

// db.prepare("DELETE FROM breweries").run()

// for (const brewery of breweries) {
//     insert.run(
//         brewery.name,
//         brewery.street,
//         brewery.city,
//         brewery.state,
//         brewery.postal_code,
//         brewery.brewery_type,
//         brewery.phone,
//         brewery.website_url
//     )
// }
// console.log("Breweries successfully seeded")

import db from "./database.js"

const breweries = []

const cities = [
  { city: "Portland", state: "Oregon", postal_code: "97201" },
  { city: "Austin", state: "Texas", postal_code: "73301" },
  { city: "Denver", state: "Colorado", postal_code: "80202" },
  { city: "Seattle", state: "Washington", postal_code: "98101" },
  { city: "San Diego", state: "California", postal_code: "92101" },
  { city: "Chicago", state: "Illinois", postal_code: "60601" },
  { city: "Boston", state: "Massachusetts", postal_code: "02108" },
  { city: "Phoenix", state: "Arizona", postal_code: "85001" },
  { city: "Atlanta", state: "Georgia", postal_code: "30301" },
  { city: "Dallas", state: "Texas", postal_code: "75201" }
]

const breweryTypes = ["micro", "regional", "brewpub", "large"]

for (let i = 1; i <= 201; i++) {
  const location = cities[i % cities.length]
  const type = breweryTypes[i % breweryTypes.length]

  breweries.push({
    name: `Demo Brewery ${i}`,
    street: `${100 + i} Main St`,
    city: location.city,
    state: location.state,
    postal_code: location.postal_code,
    brewery_type: type,
    phone: `555000${String(i).padStart(4, "0")}`,
    website_url: `http://demobrewery${i}.com`
  })
}

const insert = db.prepare(`
INSERT INTO breweries 
(name, street, city, state, postal_code, brewery_type, phone, website_url)
VALUES (?, ?, ?, ?, ?, ?, ?, ?)
`)

const insertMany = db.transaction((breweries) => {
  for (const b of breweries) {
    insert.run(
      b.name,
      b.street,
      b.city,
      b.state,
      b.postal_code,
      b.brewery_type,
      b.phone,
      b.website_url
    )
  }
})

insertMany(breweries)

console.log("✅ 201 breweries seeded successfully")
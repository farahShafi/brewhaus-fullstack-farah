import express from "express"
import cors from "cors"
import breweryRoutes from "./routes/breweryRoutes.js"

const app = express()
app.use(cors())
app.use(express.json())

app.use("/api/breweries", breweryRoutes)

const port = 3000
app.listen(port, () => {
    console.log(`srever is running at http://localhost:${port}`)
})
import express from "express"
import cors from "cors"
import breweryRoutes from "./routes/breweryRoutes.js"
import { createServer } from "http"
import { Server } from "socket.io"
import Redis from "ioredis"

const app = express()
app.use(cors())
app.use(express.json())
app.use("/api/breweries", breweryRoutes)

// Create HTTP server for Socket.io
const server = createServer(app)
const io = new Server(server, {
  cors: { origin: "http://localhost:5173" } // replace '*' with your frontend URL in prod
})


const redis = new Redis()     // publisher
const redisSub = new Redis()  // subscriber
// Listen to Redis events and broadcast via Socket.io
redisSub.subscribe('breweryUpdates', (err) => {
  if (err) console.error(err)
  else console.log('Subscribed to breweryUpdates channel')  
})

// Broadcast Redis messages via Socket.io
redisSub.on('message', (channel, message) => {
  const data = JSON.parse(message)
  io.emit('breweryUpdated', data)
  console.log('Broadcasted brewery update:', data)
})

// Log client connections
io.on('connection', (socket) => {
  console.log('Client connected:', socket.id)
  socket.on('disconnect', () => console.log('Client disconnected:', socket.id))
})

const port = 3000
server.listen(port, () => {
    console.log(`srever is running at http://localhost:${port}`)
})

export default app
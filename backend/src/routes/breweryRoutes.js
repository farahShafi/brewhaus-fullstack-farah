import express from "express"
import { getBreweries, getBrewery } from "../controllers/breweryController.js"
import { auth } from "../middleware/auth.js"

const router = express.Router()

// apply middleware to ALL routes
router.use(auth) 

router.get("/", getBreweries)
router.get("/:id", getBrewery)

export default router
import express from "express"
import { getBreweries, getBrewery } from "../controllers/breweryController.js"

const router = express.Router()

router.get("/", getBreweries)
router.get("/:id", getBrewery)

export default router
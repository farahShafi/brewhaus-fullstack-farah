import express from "express"
import { getBreweries, getBrewery, updateBrewery } from "../controllers/breweryController.js"

const router = express.Router()

router.get("/", getBreweries)
router.get("/:id", getBrewery)
router.put("/:id", updateBrewery)

export default router
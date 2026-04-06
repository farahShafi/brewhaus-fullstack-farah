import express from "express"
import { getBreweries, getBrewery, getDashboard, updateBrewery } from "../controllers/breweryController.js"

const router = express.Router()

router.get("/", getBreweries)
router.get("/dashboard", getDashboard )
router.get("/:id", getBrewery)
router.put("/:id", updateBrewery)

export default router
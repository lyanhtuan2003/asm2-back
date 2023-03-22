import express from "express"
import { create, getAll, getOne, remove, update } from "../contrenler/product"
const router = express.Router()
router.post("/products", create)
router.get("/products", getAll)
router.get("/products/:id", getOne)
router.put("/products/:id", update)
router.delete("/products/:id", remove)
export default router
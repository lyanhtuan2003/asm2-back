import express from "express"
import { create, getAll, getOne, remove, update } from "../contrenler/products"
import { checkquyen } from "../middelwer/auth"

const router = express.Router()
router.get("/products", getAll)
router.get("/products/:id", getOne)
router.post("/products", checkquyen, create)
router.delete("/products/:id", checkquyen, remove)
router.put("/products/:id", checkquyen, update)
export default router
import express from "express"
import { create, getAll, getOne, remove, update } from "../contrenler/categorys"
import { checkquyen } from "../middelwer/auth"
const router = express.Router()
router.get("/categorys", getAll)
router.get("/categorys/:id", getOne)
router.post("/categorys", checkquyen, create)
router.delete("/categorys/:id", remove)
router.put("/categorys/:id", update)
export default router
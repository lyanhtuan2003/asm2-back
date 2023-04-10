import express from 'express'
import { getAll, singin, singup } from '../contrenler/auth'
const router = express.Router()
router.post("/singup", singup)
router.get("/singup", getAll)
router.post("/singin", singin)
export default router
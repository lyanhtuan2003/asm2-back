import express from "express"
import mongoose from "mongoose";
import productrouter from "./route/product";
const app = express()
app.use(express.json())
app.use("/api", productrouter)
mongoose.connect("mongodb://127.0.0.1:27017/Asm")
export const viteNodeApp = app;
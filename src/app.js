import express from "express"
import mongoose from "mongoose";
import routerproduct from "./route/products";
import routercategorys from "./route/categorys";
import routeruser from "./route/auth";
import cors from "cors"

const app = express()
app.use(cors())
app.use(express.json())
app.use("/api", routerproduct)
app.use("/api", routercategorys)
app.use("/api", routeruser)
mongoose.connect("mongodb://127.0.0.1:27017/we17302")
export const viteNodeApp = app;
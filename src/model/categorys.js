import mongoose from "mongoose";
const schmleCategory = mongoose.Schema({
    name: String,
    products: [{ type: mongoose.Types.ObjectId, ref: "products" }]
})
export default mongoose.model("categorys", schmleCategory)
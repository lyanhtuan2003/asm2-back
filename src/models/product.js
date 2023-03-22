import mongoose from "mongoose";
const productSchaml = mongoose.Schema({
    name: String,
    price: Number,
    desc: String,
    status: Boolean,
    quantaty: Number
})
export default mongoose.model("products", productSchaml)
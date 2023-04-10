import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2"
const schmleProduct = mongoose.Schema({
    name: String,
    image: String,
    price: Number,
    description: String,
    categoryId: {
        type: mongoose.Types.ObjectId,
        ref: "categorys"
    }
})
schmleProduct.plugin(mongoosePaginate)
export default mongoose.model("products", schmleProduct)
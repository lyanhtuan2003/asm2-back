import mongoose from "mongoose";

const SchemaUser = mongoose.Schema({
    username: String,
    email: {
        type: String,
        unique: true,
        require: true
    },
    password: {
        type: String,
        require: true
    },
    role: {
        type: String,
        default: "member"
    }
})

export default mongoose.model("users", SchemaUser)
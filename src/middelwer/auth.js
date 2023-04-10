import Jwt from "jsonwebtoken";
import user from "../model/user";
export const checkquyen = async (req, res, next) => {


    try {
        if (!req.headers.authorization) {
            return res.json({
                message: "bạn chưa đăng nhập"
            })
        }
        const token = req.headers.authorization.split(" ")[1]
        Jwt.verify(token, "banthaydat", async (error, payload) => {
            if (error) {
                if (error.name == "TokenExpiredError") {
                    return res.json({
                        message: "token đã hết hạn"
                    })
                }
                if (error.name == "JsonWebTokenError") {
                    return res.json({
                        message: "token không hợp lệ"
                    })
                }
            }
            const users = await user.findById({ _id: payload._id })

            if (users.role !== "admin") {
                return res.status(400).json({
                    message: 'bạn không có quyền truy cập vào tài nguyên này'
                })
            }
            next()
        })

    } catch (error) {

    }
}
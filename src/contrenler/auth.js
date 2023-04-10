import user from "../model/user";
import bcryptjs from "bcryptjs"
import Jwt from "jsonwebtoken";
import { validatesingup, validatesingin } from "../validate/user";
export const singup = async (req, res) => {
    try {
        const { error } = validatesingup.validate(req.body, { abortEarly: false })
        if (error) {
            const errors = error.details.map((item) => item.message)
            return res.status(400).json({
                message: errors
            })
        }
        const chekcmail = await user.findOne({ email: req.body.email })
        if (chekcmail) {
            return res.status(400).json({
                message: "email đã tồn tải"
            })
        }
        const hashpassword = await bcryptjs.hash(req.body.password, 10)
        const User = await user.create({
            username: req.body.username,
            email: req.body.email,
            password: hashpassword
        })

        const accessToken = Jwt.sign({ _id: User._id }, "banthaydat", { expiresIn: "1d" })

        return res.status(200).json({
            message: "thêm tài khoản thành công",
            User,
            accessToken
        })

    } catch (error) {
        return res.status(400).json({
            message: error
        })
    }
}

export const singin = async (req, res) => {
    try {
        const email = req.body.email
        const password = req.body.password
        const { error } = validatesingin.validate(req.body, { abortEarly: false })
        if (error) {
            const errors = error.details.map((item) => item.message)
            return res.status(400).json({
                message: errors
            })
        }
        const users = await user.findOne({ email })
        if (!users) {
            return res.json({
                message: "bạn chưa đăng kí tài khoản"
            })
        }

        const comperpassword = await bcryptjs.compare(password, users.password)
        if (!comperpassword) {
            return res.json({
                message: "mật khẩu k đúng"
            })
        }
        const accessToken = Jwt.sign({ _id: users._id }, "banthaydat", { expiresIn: "1d" })

        return res.json({
            message: "đăng nhập tài khaonr thành công",
            users,
            accessToken
        })
    } catch (error) {
        return res.status(400).json({
            message: error
        })
    }
}
export const getAll = async (req, res) => {
    try {
        const users = await user.find()
        if (!users) {
            return res.status(400).json({
                message: "không có tài khaonr  nào"
            })
        }
        else {
            return res.status(200).json(users)
        }
    } catch (error) {
        return res.status(400).json({
            message: error
        })
    }
}

import product from "../models/product";
import Joi from "joi"
const productValidate = Joi.object({
    name: Joi.string().required(),
    price: Joi.number().required(),
    desc: Joi.string(),
    status: Joi.boolean(),
    quantaty: Joi.number()
})

export const create = async function (req, res) {
    try {
        const body = req.body
        const data = await product.create(body)
        const { error } = productValidate.validate(body)
        if (error) {
            const errors = error.details.map((item) => item.message)
            return res.json({
                message: errors
            })
        }
        if (!data) {
            return res.status(400).json({ message: "thêm sản phẩm thất bại" })
        }
        else {
            return res.status(200).json({ message: "thêm sản phẩm thành công", data })
        }
    } catch (error) {
        return res.json({
            message: error
        })
    }
}
export const getAll = async function (req, res) {
    try {

        const data = await product.find()
        if (!data) {
            return res.status(400).json({ message: "không có sản phẩm nào" })
        }
        else {
            return res.status(200).json(data)
        }
    } catch (error) {
        return res.json({
            message: error
        })
    }
}
export const update = async function (req, res) {
    try {
        const body = req.body
        const id = req.params.id
        const { error } = productValidate.validate(body)
        if (error) {
            const errors = error.details.map((item) => item.message)
            return res.json({
                message: errors
            })
        }
        const data = await product.findByIdAndUpdate({ _id: id }, body, { new: true })
        if (!data) {
            return res.status(400).json({ message: "cập nhật sản phẩm thất bại" })
        }
        else {
            return res.status(200).json({ message: "cập nhật sản phẩm thành công", data })
        }
    } catch (error) {
        return res.json({
            message: error
        })
    }
}
export const remove = async function (req, res) {
    try {

        const data = await product.findByIdAndDelete(req.params.id)

        return res.status(200).json({ message: "xoá sản phẩm thành công", data })


    } catch (error) {
        return res.json({
            message: error
        })
    }
}
export const getOne = async function (req, res) {
    try {

        const data = await product.findById(req.params.id)
        if (!data) {
            return res.status(400).json({ message: "không có sản phẩm nào" })
        }
        else {
            return res.status(200).json(data)
        }
    } catch (error) {
        return res.json({
            message: error
        })
    }
}
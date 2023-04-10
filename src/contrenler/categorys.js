import categorys from "../model/categorys";
import Joi from "joi";
import products from "../model/products";
const validateproduct = Joi.object({
    name: Joi.string().required().messages({
        "string.empty": "không được để trống"
    })
})
export const getAll = async (req, res) => {
    try {
        const category = await categorys.find()
        if (category.length == 0) {
            return res.status(400).json({
                message: "không có danh mục nào"
            })
        }
        else {
            return res.status(200).json(category)
        }
    } catch (error) {
        return res.status(400).json({
            message: error
        })
    }
}

export const getOne = async (req, res) => {
    try {
        const category = await categorys.findById(req.params.id)
        if (!category) {
            return res.status(400).json({
                message: "không có danh mục nào"
            })
        }
        else {
            const product = await products.find({ categoryId: req.params.id })
            return res.status(200).json({ ...category.toObject(), product })
        }
    } catch (error) {
        return res.status(400).json({
            message: error
        })
    }
}


export const remove = async (req, res) => {
    try {
        const category = await categorys.findByIdAndDelete(req.params.id)
        if (!category) {
            return res.status(400).json({
                message: "xoa danh mục thất bại"
            })
        }
        else {
            return res.status(200).json({
                message: "xoá danh mục thành công thành công",
                category
            })
        }
    } catch (error) {
        return res.status(400).json({
            message: error
        })
    }
}


export const update = async (req, res) => {
    try {
        const id = req.params.id
        const body = req.body
        const category = await categorys.findByIdAndUpdate({ _id: id }, body, { new: true })
        if (!category) {
            return res.status(400).json({
                message: "cập nhật thất bại"
            })
        }
        else {
            return res.status(200).json({
                message: "cập nhật danh mục thành công",
                category
            })
        }
    } catch (error) {
        return res.status(400).json({
            message: error
        })
    }
}
export const create = async (req, res) => {
    try {
        const category = await categorys.create(req.body)
        const { error } = validateproduct.validate(req.body)
        if (error) {
            const errors = error.details.map((item) => item.message)
            return res.status(400).json({
                message: errors
            })
        }
        if (!category) {
            return res.status(400).json({
                message: "thêm danh mục thất bại"
            })
        }
        else {
            return res.status(200).json({
                message: "thêm danh mục thành công",
                category
            })
        }
    } catch (error) {
        return res.status(400).json({
            message: error
        })
    }
}
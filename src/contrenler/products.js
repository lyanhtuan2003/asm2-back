import products from "../model/products";
import categorys from "../model/categorys";
import Joi from "joi";
const validateproduct = Joi.object({
    name: Joi.string().required().messages({
        "string.empty": "không được để trống"
    }),
    image: Joi.string().required().messages({
        "string.empty": "không được để trống"
    }),
    price: Joi.number().required().messages({
        "string.empty": "không được để trống"
    }),
    description: Joi.string().required().messages({
        "string.empty": "không được để trống"
    }),
    categoryId: Joi.string().required().messages({
        "string.empty": "không được để trống"
    }),
})
export const getAll = async (req, res) => {
    const { _sort = "createAt", _order = "asc", _limit = 9, _page = 1 } = req.query
    const options = {
        page: _page,
        limit: _limit,
        sort: {
            [_sort]: _order == "desc" ? -1 : 1
        }
    }
    try {
        const { docs, totalDocs, totalPages } = await products.paginate({}, options)
        const data = await products.find()
        if (data.length == 0) {
            return res.status(400).json({
                message: "không có sản phẩm nào"
            })
        }
        else {
            return res.status(200).json(docs, totalDocs, totalPages)
        }
    } catch (error) {
        return res.status(400).json({
            message: error
        })
    }
}

export const getOne = async (req, res) => {
    try {
        const data = await products.findOne({ _id: req.params.id }).populate('categoryId')
        if (!data) {
            return res.status(400).json({
                message: "không có sản phẩm nào"
            })
        }
        else {
            return res.status(200).json({
                message: "lấy sản phẩm thành công",
                data
            })
        }
    } catch (error) {
        return res.status(400).json({
            message: error
        })
    }
}


export const remove = async (req, res) => {
    try {
        const data = await products.findByIdAndDelete(req.params.id)
        if (!data) {
            return res.status(400).json({
                message: "xoa sản phẩm thất bại"
            })
        }
        else {
            return res.status(200).json({
                message: "xoá sản phẩm thành công thành công",
                data
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
        const data = await products.findByIdAndUpdate({ _id: id }, body, { new: true })
        if (!data) {
            return res.status(400).json({
                message: "cập nhật thất bại"
            })
        }
        else {
            return res.status(200).json({
                message: "cập nhật sản phẩm thành công",
                data
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
        const data = await products.create(req.body)
        await categorys.findByIdAndUpdate(data.categoryId, {
            $addToSet: {
                products: data._id
            }
        })
        const { error } = validateproduct.validate(req.body)
        if (error) {
            const errors = error.details.map((item) => item.message)
            return res.status(400).json({
                message: errors
            })
        }
        if (!data) {
            return res.status(400).json({
                message: "thêm sản phẩm thất bại"
            })
        }
        else {
            return res.status(200).json({
                message: "thêm sản phẩm thành công",
                data
            })
        }
    } catch (error) {
        return res.status(400).json({
            message: error
        })
    }
}
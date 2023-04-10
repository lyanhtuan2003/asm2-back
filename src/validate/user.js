import Joi from "joi";
const validatesingup = Joi.object({
    username: Joi.string().required().messages({
        "string.empty": "trường nay không được để trống",
        "any.required": "trường này phải bắt buộc"
    }),
    email: Joi.string().email().required().messages({
        "string.empty": "trường nay không được để trống",
        "any.required": "trường này phải bắt buộc",
        "string.email": "email không đúng đỉnh dạng"
    }),
    password: Joi.string().required().messages({
        "string.empty": "trường nay không được để trống",
        "any.required": "trường này phải bắt buộc",
        "string.min": "pass word ít nhất ${#limit} phần tự"
    }),
    confirmpassword: Joi.string().required().valid(Joi.ref("password")).messages({
        "string.empty": "trường nay không được để trống",
        "any.required": "trường này phải bắt buộc",
        "any.only": "không trùng với mật khẩu"
    })
})


const validatesingin = Joi.object({
    email: Joi.string().email().required().messages({
        "string.empty": "không được để trống",
        "string.required": "trường này không được để trống",
        "string.email": "emial k đúng định dạng"
    }),
    password: Joi.string().required().messages({
        "string.empty": "trường này k được để trống",
        "string.required": "trường này bắt buộc phải nhập",
        "string.min": "pass word ít nhất ${#limit} phần tự"
    })
})

export { validatesingup, validatesingin }
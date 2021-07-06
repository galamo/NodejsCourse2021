import joi from "joi";


export const customerSchema = joi.object({
    params: joi.object({
        city: joi.string().required()
    })
})
import joi from "joi";


export const carsSchema = joi.object({
    query: joi.object({
        carType: joi.string().required()
    })
})
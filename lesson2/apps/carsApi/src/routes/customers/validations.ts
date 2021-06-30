import joi from "joi";


export const carsSchema = joi.object({
    query: joi.object({
        // customer: joi.string().required()
    })
})
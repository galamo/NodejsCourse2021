import { carsSchema } from "../routes/cars/validations"

const schemas = {
    "/cars": carsSchema,

    // "/users": usersSchema
}

export function getSchemaValidation(path) {
    const current = schemas[path]
    return current
}

export function validate(req, res, next) {
    const schemaValidation = getSchemaValidation(req.baseUrl)
    const { error } = schemaValidation.validate({ query: req.query });
    if (error) {
        return next({ ...new Error(), isBadReuqest: true })
    }
    return next();
}



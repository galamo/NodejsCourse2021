import { getCustomers, getCustomerByCity } from "../../controllers/customers";
export const handler = async (req, res, next) => {
    const { customerName } = req.query
    const result = await getCustomers(customerName)
    return res.json(result)
}

export const customerCityHandler = async (req, res, next) => {
    const { city } = req.params
    const result = await getCustomerByCity(city)
    return res.json(result)
}


import { getCars } from "../../controllers/cars";
import { getConnection } from "../../db"
export const handler = async (req, res, next) => {
    // THIS ONE WILL MOVE TO CONTROLLER and not API
    const { customerName } = req.query
    const [result] = await getConnection().execute("select * from customers where first_name = ?", [customerName])
    return res.json(result)
}


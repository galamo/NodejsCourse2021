import { getCars } from "../../controllers/cars";
export const handler = async (req, res, next) => {
    console.log("inside entry point ")
    return res.json(getCars())
}
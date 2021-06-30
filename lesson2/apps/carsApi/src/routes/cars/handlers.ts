import { getCars } from "../../controllers/cars";
export const handler = async (req, res, next) => {
    const { carType } = req.query;
    if (carType === "mazda") return res.json([])
    console.log("inside entry point")
    return res.json(getCars())
}
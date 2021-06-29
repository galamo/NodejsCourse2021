import cars from "./data.json"
import mongoose from "mongoose";
import { CarsSchema } from "../../mode.car";

const [first] = cars;
type ICar = typeof first

const globalCars = cars
function addCar(car: ICar) {
    globalCars.push(car)
}

async function getCars() {
    const result = await CarsSchema.find();
    return result;
}

export { getCars, addCar }
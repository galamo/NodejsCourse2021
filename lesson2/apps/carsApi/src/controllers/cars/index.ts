import cars from "./data.json"

const [first] = cars;
type ICar = typeof first

const globalCars = cars
function addCar(car: ICar) {
    globalCars.push(car)
}

function getCars(): Array<ICar> {
    return globalCars;
}

export { getCars, addCar }
import values from "./values.json";

const [firstCar] = values;

type Car = typeof firstCar;

type Cr = { y: number }
interface ICar extends Cr {
    y: number
}

function addCar(car: Car) {
    console.log([...values, car])

}
addCar({
    "Name": "chevrolet chevelle malibu",
    "Miles_per_Gallon": 18,
    "Cylinders": 8,
    "Displacement": 307,
    "Horsepower": 130,
    "Weight_in_lbs": 3504,
    "Acceleration": 12,
    "Year": "1970-01-01",
    "Origin": "USA"
})


interface IProduct {
    name: string,
    price: number,
}
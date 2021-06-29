import mongoose from "mongoose";
const carsSchema = new mongoose.Schema({
    Name: {
        type: String,
        required: true
    },
    Miles_per_Gallon: {
        type: Number,
        required: true
    },
    Displacement: {
        type: Number,
        required: true
    },
    Weight_in_lbs: {
        type: Number,
        required: true
    },
    Acceleration: { //Maybe we will change this one!
        type: Number,
        required: false
    },
    Origin: {
        type: String,
        required: true
    }

});
const CarsSchema = mongoose.model("cars", carsSchema)
export { CarsSchema }
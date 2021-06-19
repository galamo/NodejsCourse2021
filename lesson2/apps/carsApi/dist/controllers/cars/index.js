"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.addCar = exports.getCars = void 0;
const data_json_1 = __importDefault(require("./data.json"));
const [first] = data_json_1.default;
const globalCars = data_json_1.default;
function addCar(car) {
    globalCars.push(car);
}
exports.addCar = addCar;
function getCars() {
    return globalCars;
}
exports.getCars = getCars;

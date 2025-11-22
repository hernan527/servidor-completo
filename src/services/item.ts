import { Car } from "../interfaces/car.interface"
import ItemModel from "../models/item";

const insertCar = async (item:Car) => {
    const responseInsert = await ItemModel.create(item)
    return responseInsert
};

const getCars = async () => {
    const responseGet = await ItemModel.find({})
    return responseGet
};

const getCar = async (id: string) => {
    const responseGetOne = await ItemModel.findOne({_id:id})
    return responseGetOne
};

const updateCar = async (id: string, data: Car) => {
    const responseUpdate = await ItemModel.findOneAndUpdate({_id:id},data,{new: true})
    return responseUpdate
};

const deleteCar = async (id: string) => {
    const responsedelete = await ItemModel.deleteOne({_id:id})
    return responsedelete
};

export { insertCar, getCars, getCar, updateCar, deleteCar };

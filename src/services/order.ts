import ItemModel from "../models/item";


const getOrders = async () => {
    const responseInsert = await ItemModel.find({})
    return responseInsert
};

export { getOrders }

import StorageModel from "../models/storage";
import { Storage } from "../interfaces/storage.interface";


const registerUpload = async ({ filename, idUser, path }: Storage) => {
    const responseInsert = await StorageModel.create({ filename, idUser, path })
    return responseInsert
};

export { registerUpload }

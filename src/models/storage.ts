import { Schema, Types, model, Model } from "mongoose";
import { Storage } from "../interfaces/storage.interface";

const StorageSchema = new Schema<Storage>(
  {
    filename: {
      type: String,
      required:true
    },
    path: {
      type: String,
      required:true
    },
    idUser: {
      type: String,
      required:true,
    },
  },
  {
     timestamps: true,
     versionKey: false,
  }
);

const StorageModel = model('storage', StorageSchema);
export default StorageModel;
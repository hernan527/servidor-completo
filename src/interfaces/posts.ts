import { Imagen as MiImagen, Content as MiContent  } from './interfaces';
import * as mongodb from "mongodb";

export interface Posts {
    _id?: mongodb.ObjectId;
    title?:string,
    imagen?: MiImagen[],
    content?: MiContent[]
}

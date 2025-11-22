import { Request, Response } from 'express';
import { handleHttp } from "../utils/error.handle";
 import { getEmployees, getEmployeeById, createEmployee, updateEmployee, deleteEmployee } from "../services/employees";




const  getItems = async (req: Request, res: Response) => {
  try {
    const response = await getEmployees()
    res.status(200).send(response);
  } catch (e) {
    handleHttp(res,'ERROR_POST_ITEM',e)
}
};

const  getItemById = async (req: Request, res: Response) => {
  try {
    const response = await getEmployeeById(req,res)
    res.send(response);
  } catch (e) {
    handleHttp(res,'ERROR_POST_ITEM',e)
}
};

const  createItem = async (req: Request, res: Response) => {
  try {
    const response = await createEmployee(req,res)
    res.send(response);
  } catch (e) {
    handleHttp(res,'ERROR_POST_ITEM',e)
}
};

const  updateItem = async (req: Request, res: Response) => {
  try {
    const response = await updateEmployee(req,res)
    res.send(response);
  } catch (e) {
    handleHttp(res,'ERROR_POST_ITEM',e)
}
};

const  deleteItem = async (req: Request, res: Response) => {
  try {
    const response = await deleteEmployee(req,res)
  } catch (e) {
    handleHttp(res,'ERROR_POST_ITEM',e)
}
};

export { getItems, getItemById, createItem, updateItem, deleteItem }



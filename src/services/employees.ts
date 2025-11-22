import { Request, Response } from 'express';
import { collections } from '../config/database';
import EmployeeModel from "../models/employees";

import * as mongodb from "mongodb";



const  getEmployees = async () => {
    const  employees = await EmployeeModel.find({});
    return employees;
};

const  getEmployeeById = async (req: Request, res: Response) => {
    const id = req?.params?.id;
    const query = { _id: new mongodb.ObjectId(id) };
    const  employee = await collections.employees?.findOne(query);
    if (!employee) {
      return res.status(404).send('Employee not found');
    }
    res.status(200).send(employee);
};

const  createEmployee = async (req: Request, res: Response) => {
    const employee = req.body;
    const result = await collections.employees?.insertOne (employee);
    if (result?.acknowledged) {
      res.status(201).send(`Se creo una nueva employee: ID ${result.insertedId}.`);
  } else {
      res.status(500).send("Falló crear una nueva employee.");
  }
};
 

  

const  updateEmployee = async (req: Request, res: Response) => {
    const id = req?.params?.id;
    const employee = req.body;
    const query = { _id: new mongodb.ObjectId(id) };
    const  result = await collections.employees?.replaceOne(query, req.body);
    if (result?.modifiedCount === 0) {
      return res.status(404).send('Employee not found');
    }
    res.status(200).send(await collections.employees?.findOne(query));
  };

const  deleteEmployee = async (req: Request, res: Response) => {
    const id = req?.params?.id;
    const query = { _id: new mongodb.ObjectId(id) };
    const result = await collections.employees?.deleteOne(query);
    if (result && result.deletedCount) {
      res.status(202).send(`Clinica eliminada: ID ${id}`);
  } else if (!result) {
      res.status(400).send(`Falló eliminar clinica: ID ${id}`);
  } else if (!result.deletedCount) {
      res.status(404).send(`Fallo eliminar clinica: ID ${id}`);
  }
  };

  export { getEmployees, getEmployeeById, createEmployee, updateEmployee, deleteEmployee };





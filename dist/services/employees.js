"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteEmployee = exports.updateEmployee = exports.createEmployee = exports.getEmployeeById = exports.getEmployees = void 0;
const database_1 = require("../config/database");
const employees_1 = __importDefault(require("../models/employees"));
const mongodb = __importStar(require("mongodb"));
const getEmployees = async () => {
    const employees = await employees_1.default.find({});
    return employees;
};
exports.getEmployees = getEmployees;
const getEmployeeById = async (req, res) => {
    const id = req?.params?.id;
    const query = { _id: new mongodb.ObjectId(id) };
    const employee = await database_1.collections.employees?.findOne(query);
    if (!employee) {
        return res.status(404).send('Employee not found');
    }
    res.status(200).send(employee);
};
exports.getEmployeeById = getEmployeeById;
const createEmployee = async (req, res) => {
    const employee = req.body;
    const result = await database_1.collections.employees?.insertOne(employee);
    if (result?.acknowledged) {
        res.status(201).send(`Se creo una nueva employee: ID ${result.insertedId}.`);
    }
    else {
        res.status(500).send("Falló crear una nueva employee.");
    }
};
exports.createEmployee = createEmployee;
const updateEmployee = async (req, res) => {
    const id = req?.params?.id;
    const employee = req.body;
    const query = { _id: new mongodb.ObjectId(id) };
    const result = await database_1.collections.employees?.replaceOne(query, req.body);
    if (result?.modifiedCount === 0) {
        return res.status(404).send('Employee not found');
    }
    res.status(200).send(await database_1.collections.employees?.findOne(query));
};
exports.updateEmployee = updateEmployee;
const deleteEmployee = async (req, res) => {
    const id = req?.params?.id;
    const query = { _id: new mongodb.ObjectId(id) };
    const result = await database_1.collections.employees?.deleteOne(query);
    if (result && result.deletedCount) {
        res.status(202).send(`Clinica eliminada: ID ${id}`);
    }
    else if (!result) {
        res.status(400).send(`Falló eliminar clinica: ID ${id}`);
    }
    else if (!result.deletedCount) {
        res.status(404).send(`Fallo eliminar clinica: ID ${id}`);
    }
};
exports.deleteEmployee = deleteEmployee;
//# sourceMappingURL=employees.js.map
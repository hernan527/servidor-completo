import mongoose, { Schema, model } from 'mongoose';
import { Employee } from "../interfaces/employee";

const employeeSchema = new Schema<Employee>(
  {
  name: { 
    type: String, 
    required: true 
  },
  position: {
     type: String,
     required: true
  },
  level: {
    type: String,
    enum: ['junior', 'mid', 'senior'],
    required: true },
});

const EmployeeModel = model('employees', employeeSchema);
export default EmployeeModel;

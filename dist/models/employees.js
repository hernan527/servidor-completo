"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const employeeSchema = new mongoose_1.Schema({
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
        required: true
    },
});
const EmployeeModel = (0, mongoose_1.model)('employees', employeeSchema);
exports.default = EmployeeModel;
//# sourceMappingURL=employees.js.map
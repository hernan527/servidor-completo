"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginUser = exports.registerNewUser = void 0;
const users_1 = __importDefault(require("../models/users"));
const bcrypt_handle_1 = require("../utils/bcrypt.handle");
const jwt_handle_1 = require("../utils/jwt.handle");
const registerNewUser = async ({ email, password, name, description }) => {
    const checkIs = await users_1.default.findOne({ email });
    if (checkIs)
        return " ALREADY_USER";
    const passHash = await (0, bcrypt_handle_1.encrypt)(password);
    const registerNewUSer = await users_1.default.create({ email, password: passHash, name, description });
    return registerNewUSer;
};
exports.registerNewUser = registerNewUser;
const loginUser = async ({ email, password }) => {
    const checkIs = await users_1.default.findOne({ email });
    if (!checkIs)
        return "NOT_FOUND_USER";
    const passwordHash = checkIs.password; // TODO el encriptado
    const isCorrect = await (0, bcrypt_handle_1.verified)(password, passwordHash);
    if (!isCorrect)
        return "PASSWORD_INCORRECT";
    const token = await (0, jwt_handle_1.generateToken)(checkIs.email);
    const data = {
        token,
        user: checkIs
    };
    return data;
};
exports.loginUser = loginUser;
//# sourceMappingURL=auth.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginCtrl = exports.regsiterCtrl = void 0;
const auth_1 = require("../services/auth");
const regsiterCtrl = async ({ body }, res) => {
    const responseUser = await (0, auth_1.registerNewUser)(body);
    res.send(responseUser);
};
exports.regsiterCtrl = regsiterCtrl;
const loginCtrl = async ({ body }, res) => {
    const { email, password } = body;
    const responseUser = await (0, auth_1.loginUser)({ email, password });
    res.send(responseUser);
};
exports.loginCtrl = loginCtrl;
//# sourceMappingURL=auth.js.map
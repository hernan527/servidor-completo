"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getFile = void 0;
const error_handle_1 = require("../utils/error.handle");
const storage_1 = require("../services/storage");
const getFile = async (req, res) => {
    try {
        const { user, file } = req;
        // console.log(user)
        // console.log(file)
        const dataToRegister = {
            filename: `${file?.filename}`,
            idUser: `${user?.id}`,
            path: `${file?.path}`
        };
        const response = await (0, storage_1.registerUpload)(dataToRegister);
        res.send(response);
    }
    catch (error) {
        (0, error_handle_1.handleHttp)(res, 'ERROR_GET_FILE');
    }
};
exports.getFile = getFile;
//# sourceMappingURL=upload.js.map
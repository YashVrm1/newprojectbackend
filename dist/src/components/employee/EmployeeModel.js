"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const EmployeeSchema = new mongoose_1.default.Schema({
    employeeName: {
        type: String,
    },
    userName: {
        type: String,
    },
    email: {
        type: String,
    },
    password: {
        type: String,
    },
    phoneNo: {
        type: String,
    },
}, { timestamps: true });
exports.default = mongoose_1.default.model('employee', EmployeeSchema);
//# sourceMappingURL=EmployeeModel.js.map
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const userSchema = new mongoose_1.default.Schema({
    userName: {
        type: String
    },
    email: {
        type: String
    },
    phoneNo: {
        type: String
    },
    address: {
        type: String
    },
    age: {
        type: String
    },
    sex: {
        type: String
    }
}, { timestamps: true });
exports.default = mongoose_1.default.model('user', userSchema);
//# sourceMappingURL=userModel.js.map
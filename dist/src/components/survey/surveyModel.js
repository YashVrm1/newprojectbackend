"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const surveySchema = new mongoose_1.default.Schema({
    slNo: {
        type: String
    },
    date: {
        type: String
    },
    time: {
        type: String
    },
    EnumeratorName: {
        type: String
    },
    personalInformation: {}
}, { timestamps: true });
exports.default = mongoose_1.default.model('survey', surveySchema);
//# sourceMappingURL=surveyModel.js.map
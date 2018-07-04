"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const surveyModel_1 = __importDefault(require("./surveyModel"));
exports.jwt_secret = "ADIOS AMIGOS";
const app = express_1.default();
exports.addEmployee = (req, res) => __awaiter(this, void 0, void 0, function* () {
    console.log("You are in survey app");
    try {
        const surveyData = new surveyModel_1.default({
            slNo: req.body.slNo,
            date: req.body.date,
            time: req.body.time,
            EnumeratorName: req.body.EnumeratorName,
        });
        yield surveyData.save();
        res.status(201).json(surveyData);
    }
    catch (error) {
        res.status(500).json(error);
    }
});
//# sourceMappingURL=surveyController.js.map
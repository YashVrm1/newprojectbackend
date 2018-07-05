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
const userModel_1 = __importDefault(require("../user/userModel"));
exports.jwt_secret = "ADIOS AMIGOS";
const app = express_1.default();
exports.addEmployee = (req, res) => __awaiter(this, void 0, void 0, function* () {
    console.log("You are in survey app");
    try {
        userModel_1.default.findOne({ email: req.body.email }, { userName: 1, email: 1, phoneNo: 1 }, (err, result) => __awaiter(this, void 0, void 0, function* () {
            console.log("result ---->", result);
            if (err) {
                res.status(500).json(err);
            }
            else if (result) {
                const surveyData = new surveyModel_1.default({
                    email: result.email,
                    user: result.userName,
                    phoneNo: result.phoneNo,
                    personalInformation1: {
                        name: req.body.name,
                        age: req.body.age,
                        mobile: req.body.mobile,
                        gender: req.body.gender
                    },
                    reasonNoMetro2: {
                        notRoute: req.body.notRoute,
                        lackOfService: req.body.lackOfService,
                        travelTimeHigh: req.body.travelTimeHigh,
                        unaffordableFare: req.body.unaffordableFare,
                        highReachingCost: req.body.highReachingCost,
                        modeChanges: req.body.modeChanges,
                        crowded: req.body.crowded,
                        seatAvailable: req.body.seatAvailable,
                        security: req.body.security,
                        other: req.body.other,
                    },
                    regularTrip3: {
                        origin: req.body.origin,
                        destination: req.body.destination,
                        distance: req.body.distance,
                        startTime: req.body.startTime,
                        timeTaken: req.body.timeTaken,
                    },
                    modeOfTravel: {
                        travelType: req.body.travelType,
                        travelTrasport: req.body.travelTrasport
                    },
                    purposeTrip4: req.body.purposeTrip4,
                    useMetro6: req.body.useMetro6,
                    vehicleOwnerShip7: {
                        cars: req.body.cars,
                        twoWheeler: req.body.twoWheeler,
                        bicycle: req.body.bicycle
                    },
                    costOfTravel8: req.body.costOfTravel8,
                    paidByOffice9: req.body.paidByOffice9,
                    willingness10: req.body.willingness10
                });
                yield surveyData.save();
                res.status(201).json(surveyData);
            }
        }));
    }
    catch (error) {
        res.status(500).json(error);
    }
});
//# sourceMappingURL=surveyController.js.map
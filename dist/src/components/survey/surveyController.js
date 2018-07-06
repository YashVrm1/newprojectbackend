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
exports.survey = (req, res) => __awaiter(this, void 0, void 0, function* () {
    console.log("You are in survey app", req.body);
    try {
        const count = 0;
        userModel_1.default.findOne({ _id: req.body._id }, { userName: 1, email: 1, phoneNo: 1 }, (err, result) => __awaiter(this, void 0, void 0, function* () {
            // console.log("result ---->", req.body.decoded.employeeName);
            if (err) {
                res.status(500).json(err);
            }
            else if (result) {
                // let obj = {
                //     email: result.email,
                //     userName: result.userName,
                //     phoneNo: result.phoneNo,
                //     // EnumeratorName: req.body.decoded.employeeName,
                //     personalInformation1: {
                //         name: req.body.personalInformation1.name,
                //         age: req.body.personalInformation1.age,
                //         mobile: req.body.personalInformation1.mobile,
                //         gender: req.body.personalInformation1.gender
                //     },
                //     reasonNoMetro2: {
                //         notRoute: req.body.reasonNoMetro2.notRoute,
                //         lackOfService: req.body.reasonNoMetro2.lackOfService,
                //         travelTimeHigh: req.body.reasonNoMetro2.travelTimeHigh,
                //         unaffordableFare: req.body.reasonNoMetro2.unaffordableFare,
                //         highReachingCost: req.body.reasonNoMetro2.highReachingCost,
                //         modeChanges: req.body.reasonNoMetro2.modeChanges,
                //         crowded: req.body.reasonNoMetro2.crowded,
                //         seatAvailable: req.body.reasonNoMetro2.seatAvailable,
                //         security: req.body.reasonNoMetro2.security,
                //         other: req.body.reasonNoMetro2.other,
                //     },
                //     regularTrip3: {
                //         origin: req.body.regularTrip3.origin,
                //         destination: req.body.regularTrip3.destination,
                //         distance: req.body.regularTrip3.distance,
                //         startTime: req.body.regularTrip3.startTime,
                //         timeTaken: req.body.regularTrip3.timeTaken,
                //     },
                //     modeOfTravel: {
                //         travelType: req.body.modeOfTravel.travelType,
                //         travelTrasport: req.body.modeOfTravel.travelTrasport
                //     },
                //     commuteTrip: {
                //         travelTime: req.body.commuteTrip.travelTime,
                //         opinionTrasport: req.body.commuteTrip.opinionTrasport
                //     },
                //     commuteTrip1: {
                //         cost: req.body.commuteTrip1.cost,
                //         opinionCost: req.body.commuteTrip1.opinionCost
                //     },
                //     commuteTrip2: {
                //         comfort: req.body.comfort,
                //         opinionComfort: req.body.opinionComfort
                //     },
                //     commuteTrip3: {
                //         travelSafety: req.body.commuteTrip3.travelSafety,
                //         opinionSafety: req.body.commuteTrip3.opinionSafety
                //     },
                //     purposeTrip4: req.body.purposeTrip4,
                //     useMetro6: req.body.useMetro6,
                //     vehicleOwnerShip7: {
                //         cars: req.body.vehicleOwnerShip7.cars,
                //         twoWheeler: req.body.vehicleOwnerShip7.twoWheeler,
                //         bicycle: req.body.vehicleOwnerShip7.bicycle
                //     },
                //     costOfTravel8: req.body.costOfTravel8,
                //     paidByOffice9: req.body.paidByOffice9,
                //     willingness10: req.body.willingness10,
                //     parameter: {
                //         modeUsed: req.body.parameter.modeUsed,
                //         distance: req.body.parameter.distance,
                //         cost: req.body.parameter.cost,
                //         access: req.body.parameter.access,
                //         mainTrip: req.body.parameter.mainTrip,
                //         egressTrip: req.body.parameter.egressTrip
                //     },
                //     parameter1: {
                //         modeUsed1: req.body.parameter1.modeUsed,
                //         access1: req.body.parameter1.access,
                //         distance: req.body.parameter1.distance,
                //         cost: req.body.parameter1.cost,
                //         mainTrip1: req.body.parameter1.mainTrip,
                //         egressTrip1: req.body.parameter1.egressTrip
                //     },
                //     parameter2: {
                //         modeUsed1: req.body.parameter2.modeUsed,
                //         access1: req.body.parameter2.access,
                //         distance: req.body.parameter2.distance,
                //         cost: req.body.parameter2.cost,
                //         mainTrip1: req.body.parameter2.mainTrip,
                //         egressTrip1: req.body.parameter2.egressTrip
                //     },
                // };
                // console.log("Obj---->", obj);
                console.log("result---->", result);
                const surveyData = new surveyModel_1.default(req.body);
                const data = yield surveyData.save();
                res.status(201).json(data);
            }
        }));
    }
    catch (error) {
        res.status(500).json(error);
    }
});
exports.count = (req, res) => __awaiter(this, void 0, void 0, function* () {
    try {
        // const data: any = surveymongo.find({}, { reasonNoMetro2: 1, email: 1 });
        const notRoute = yield surveyModel_1.default.find({ "reasonNoMetro2.notRoute": true });
        const lackOfService = yield surveyModel_1.default.find({ "reasonNoMetro2.lackOfService": true });
        const travelTimeHigh = yield surveyModel_1.default.find({ "reasonNoMetro2.travelTimeHigh": true });
        const unaffordableFare = yield surveyModel_1.default.find({ "reasonNoMetro2.unaffordableFare": true });
        const highReachingCost = yield surveyModel_1.default.find({ "reasonNoMetro2.highReachingCost": true });
        const modeChanges = yield surveyModel_1.default.find({ "reasonNoMetro2.modeChanges": true });
        const crowded = yield surveyModel_1.default.find({ "reasonNoMetro2.crowded": true });
        const seatAvailable = yield surveyModel_1.default.find({ "reasonNoMetro2.seatAvailable": true });
        const security = yield surveyModel_1.default.find({ "reasonNoMetro2.security": true });
        // Promise.all([notRoute, lackOfService, travelTimeHigh, unaffordableFare, highReachingCost,
        //     modeChanges, crowded, seatAvailable, security]);
        let obj = {
            notRoute: notRoute.length,
            lackOfService: lackOfService.length,
            travelTimeHigh: travelTimeHigh.length,
            unaffordableFare: unaffordableFare.length,
            highReachingCost: highReachingCost.length,
            modeChanges: modeChanges.length,
            crowded: crowded.length,
            seatAvailable: seatAvailable.length,
            security: security.length,
        };
        res.status(200).send({ data: obj });
    }
    catch (error) {
        res.status(500).json(error);
    }
});
//# sourceMappingURL=surveyController.js.map
import express from "express";
import surveymongo from "./surveyModel";
import userModel from "../user/userModel";
import employee from "../employee/EmployeeModel";
import bcrypt from "bcryptjs";
import mongoose from 'mongoose';
import multer from "multer";
import moment from "moment-timezone";
import jwt, { TokenExpiredError } from "jsonwebtoken";
import async, { log } from "async";
export const jwt_secret = "ADIOS AMIGOS";
import { Response, Request, NextFunction } from "express";
import { json, raw } from "body-parser";
import constant from "../config/constant";
const app = express();
export let survey = async (req: Request, res: Response) => {
    console.log("You are in survey app", req.body);
    try {
        const count = 0;
        const employeeData: any = await employee.findById(mongoose.Types.ObjectId(req.body.decoded._id));
        userModel.findOne({ _id: req.body._id }, { userName: 1, email: 1, phoneNo: 1, age: 1, sex: 1 }, async (err, result: any) => {
            console.log("result ---->", employeeData);
            if (err) {
                res.status(500).json(err);
            } else if (result) {
                let obj = {
                    email: result.email,
                    userName: result.userName,
                    phoneNo: result.phoneNo,
                    age: result.age,
                    sex: result.sex,
                    loggedIn: result.loggedIn,
                    enumeratorName: employeeData.employeeName,
                    surveyStation: employeeData.surveyStation,
                    personalInformation1: {
                        name: req.body.personalInformation1.name,
                        age: req.body.personalInformation1.age,
                        mobile: req.body.personalInformation1.mobile,
                        gender: req.body.personalInformation1.gender
                    },
                    reasonNoMetro2: {
                        notRoute: req.body.reasonNoMetro2.notRoute,
                        lackOfService: req.body.reasonNoMetro2.lackOfService,
                        travelTimeHigh: req.body.reasonNoMetro2.travelTimeHigh,
                        unaffordableFare: req.body.reasonNoMetro2.unaffordableFare,
                        highReachingCost: req.body.reasonNoMetro2.highReachingCost,
                        modeChanges: req.body.reasonNoMetro2.modeChanges,
                        crowded: req.body.reasonNoMetro2.crowded,
                        seatAvailable: req.body.reasonNoMetro2.seatAvailable,
                        security: req.body.reasonNoMetro2.security,
                        other: req.body.reasonNoMetro2.other,

                    },
                    regularTrip3: {
                        origin: req.body.regularTrip3.origin,
                        destination: req.body.regularTrip3.destination,
                        distance: req.body.regularTrip3.distance,
                        startTime: req.body.regularTrip3.startTime,
                        timeTaken: req.body.regularTrip3.timeTaken,
                    },
                    modeOfTravel: {
                        travelType: req.body.modeOfTravel.travelType,
                        travelTrasport: req.body.modeOfTravel.travelTrasport
                    },
                    commuteTrip: {
                        travelTime: req.body.commuteTrip.travelTime,
                        opinionTrasport: req.body.commuteTrip.opinionTrasport
                    },
                    commuteTrip1: {
                        cost: req.body.commuteTrip1.cost,
                        opinionCost: req.body.commuteTrip1.opinionCost
                    },
                    commuteTrip2: {
                        comfort: req.body.comfort,
                        opinionComfort: req.body.opinionComfort
                    },
                    commuteTrip3: {
                        travelSafety: req.body.commuteTrip3.travelSafety,
                        opinionSafety: req.body.commuteTrip3.opinionSafety
                    },
                    purposeTrip4: req.body.purposeTrip4,
                    useMetro6: req.body.useMetro6,
                    vehicleOwnerShip7: {
                        cars: req.body.vehicleOwnerShip7.cars,
                        twoWheeler: req.body.vehicleOwnerShip7.twoWheeler,
                        bicycle: req.body.vehicleOwnerShip7.bicycle
                    },
                    costOfTravel8: req.body.costOfTravel8,
                    paidByOffice9: req.body.paidByOffice9,
                    willingness10: req.body.willingness10,
                    para: {
                        modeUsed: req.body.para.modeUsed,
                        access: req.body.para.access,
                        mainTrip: req.body.para.mainTrip,
                        egressTrip: req.body.para.egressTrip
                    },
                    parameter1: {
                        distance: req.body.parameter1.distance,
                        access1: req.body.parameter1.access1,
                        mainTrip1: req.body.parameter1.mainTrip1,
                        egressTrip1: req.body.parameter1.egressTrip1
                    },
                    parameter2: {
                        cost: req.body.parameter2.cost,
                        access1: req.body.parameter2.access2,
                        mainTrip2: req.body.parameter2.mainTrip2,
                        egressTrip1: req.body.parameter2.egressTrip2
                    },
                    createdBy: {
                        name: employeeData.employeeName
                    },
                    // loggedOut: moment().format("HH:mm")

                };
                console.log("Obj---->", obj);
                console.log("result---->", result);
                const surveyData = new surveymongo(obj);
                const data = await surveyData.save();
                res.status(201).json(data);

            }

        });
    }
    catch (error) {
        res.status(500).json(error);
    }
};


export const count: any = async (req: Request, res: Response) => {
    try {
        // const data: any = surveymongo.find({}, { reasonNoMetro2: 1, email: 1 });
        const notRoute = await surveymongo.find({ "reasonNoMetro2.notRoute": true });
        const lackOfService = await surveymongo.find({ "reasonNoMetro2.lackOfService": true });
        const travelTimeHigh = await surveymongo.find({ "reasonNoMetro2.travelTimeHigh": true });
        const unaffordableFare = await surveymongo.find({ "reasonNoMetro2.unaffordableFare": true });
        const highReachingCost = await surveymongo.find({ "reasonNoMetro2.highReachingCost": true });
        const modeChanges = await surveymongo.find({ "reasonNoMetro2.modeChanges": true });
        const crowded = await surveymongo.find({ "reasonNoMetro2.crowded": true });
        const seatAvailable = await surveymongo.find({ "reasonNoMetro2.seatAvailable": true });
        const security = await surveymongo.find({ "reasonNoMetro2.security": true });
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
};
export const countfalse: any = async (req: Request, res: Response) => {
    try {
        // const data: any = surveymongo.find({}, { reasonNoMetro2: 1, email: 1 });
        const notRoute = await surveymongo.find({ "reasonNoMetro2.notRoute": false });
        const lackOfService = await surveymongo.find({ "reasonNoMetro2.lackOfService": false });
        const travelTimeHigh = await surveymongo.find({ "reasonNoMetro2.travelTimeHigh": false });
        const unaffordableFare = await surveymongo.find({ "reasonNoMetro2.unaffordableFare": false });
        const highReachingCost = await surveymongo.find({ "reasonNoMetro2.highReachingCost": false });
        const modeChanges = await surveymongo.find({ "reasonNoMetro2.modeChanges": false });
        const crowded = await surveymongo.find({ "reasonNoMetro2.crowded": false });
        const seatAvailable = await surveymongo.find({ "reasonNoMetro2.seatAvailable": false });
        const security = await surveymongo.find({ "reasonNoMetro2.security": false });
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
};
export const getSurveyData = async (req: Request, res: Response) => {
    try {
        const condition: any = {};
        if (req.body.age) {
            condition.age = new RegExp('^' + req.body.age, 'i');
        }
        if (req.body.email) {
            condition.email = new RegExp('^' + req.body.email, 'i');
        }
        if (req.body.userName) {
            condition.userName = new RegExp('^' + req.body.userName, 'i');
        }
        if (req.body.phoneNo) {
            condition.phoneNo = new RegExp('^' + req.body.phoneNo, 'i');
        }
        if (req.body.sex) {
            condition.sex = new RegExp('^' + req.body.sex, 'i');
        }
        if (req.body.surveyStation) {
            condition.surveyStation = new RegExp('^' + req.body.surveyStation, 'i');
        }
        if (req.body.enumeratorName) {
            condition.enumeratorName = new RegExp('^' + req.body.enumeratorName, 'i');
        }
        if (req.body.createdBy) {
            condition["createdBy.name"] = {
                $regex: `${req.body.createdBy}`, $options: 'i'
            };
        }
        if (req.body.createdAt) {
            const searchDate = moment(req.body.createdAt).format('YYYY-MM-DD') + "T00:00:00.000";
            const searchGtDate = moment(req.body.createdAt).add(1, 'd').format('YYYY-MM-DD') + "T00:00:00.000";
            let value: any = {};
            value = {
                '$lt': searchGtDate,
                '$gte': searchDate
            };
            condition.createdAt = value;
        }
        console.log(" ---- ", condition);
        await surveymongo.find(condition, { __v: 0 },
            async (err, data: any) => {
                console.log(`user:----`, err, data);
                if (data) {
                    res.status(200).json({ data });
                } else {
                    res.status(400).json("Cannot find data");
                }
            });
    } catch (error) {
        console.log("Error Found");
        res.status(500).json(error);
    }
};

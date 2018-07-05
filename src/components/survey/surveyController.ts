import express from "express";
import surveymongo from "./surveyModel";
import userModel from "../user/userModel";
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
export let addEmployee = async (req: Request, res: Response) => {
    console.log("You are in survey app");
    try {
        userModel.findOne({ email: req.body.email }, { userName: 1, email: 1, phoneNo: 1 }, async (err, result: any) => {
            console.log("result ---->", result);
            if (err) {
                res.status(500).json(err);
            } else if (result) {
                const surveyData = new surveymongo({
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

                await surveyData.save();
                res.status(201).json(surveyData);

            }

        });
    }
    catch (error) {
        res.status(500).json(error);
    }
};
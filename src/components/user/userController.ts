import express from "express";
import usermongo from "./userModel";
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

export const getuser = async (req: Request, res: Response) => {
    try {
        let skip_Value;
        let limitValue = req.query.limit ? parseInt(req.query.limit) : 10;
        if (req.query.page != undefined && req.query.page > 1) {
            skip_Value = limitValue * (req.query.page - 1);
        } else { skip_Value = 0; }
        if (req.query.limit != undefined) {
            limitValue = parseInt(req.query.limit);
        }
        const condition: any = {};
        if (req.body.userName) {
            condition.userName = { $regex: `${req.body.userName}`, $options: 'i' };

        }
        if (req.body.email) {
            condition.email = { $regex: `${req.body.email}`, $options: 'i' };

        }
        if (req.body.phoneNo) {
            condition.phoneNo = { $regex: `${req.body.phoneNo}`, $options: 'i' };

        }
        if (req.body.address) {
            condition.address = { $regex: `${req.body.address}`, $options: 'i' };

        }
        if (req.body.age) {
            condition.age = { $regex: `${req.body.age}`, $options: 'i' };

        }
        if (req.body.sex) {
            condition.sex = { $regex: `${req.body.sex}`, $options: 'i' };

        }
        if (req.body.createdAt) {
            const searchDate = moment(req.body.createdAt).format('YYYY-MM-DD') + "T00:00:00.000";
            const searchGtDate = moment(req.body.createdAt).add(1, 'd').format('YYYY-MM-DD') + "T00:00:00.000";
            // '$lt': '2017-05-06T00:00:00Z'
            //  "2018-04-24T20:15:35.142Z"
            let value: any = {};
            value = {
                '$lt': searchGtDate,
                '$gte': searchDate
            };
            condition.createdAt = value;
        }
        console.log(" ---- ", condition);
        await usermongo.find(condition, { __v: 0 },
            async (err, data: any) => {
                console.log(`user:----`, err, data);
                if (data) {
                    const count: any = await usermongo.count(condition);
                    console.log('count----->', count, limitValue);
                    const totalPages = Math.ceil(count / limitValue);
                    console.log('totalpage', totalPages);
                    res.status(200).json({ data, totalPages });
                } else {
                    res.status(400).json("Cannot find data");
                }
            }).sort({ createdAt: -1 }).skip(skip_Value).limit(limitValue);
    } catch (error) {
        console.log("Error Found");
        res.status(500).json(error);
    }
};
export const adduser: any = (req: Request, res: Response) => {
    if (req.body.age && req.body.address && req.body.sex) {
        usermongo.findOne({ email: req.body.email },
            async (err: any, result: any) => {
                console.log("result ---->", result);
                if (err) {
                    res.status(500).json(err);
                }
                else if (result) {
                    console.log('in else result');
                    res.status(400).json({
                        msg: "User Already exist"
                    });
                }
                else {
                    const user = new usermongo({
                        userName: req.body.userName,
                        phoneNo: req.body.phoneNo,
                        email: req.body.email,
                        address: req.body.address,
                        age: req.body.age,
                        sex: req.body.sex

                    });
                    // req.body.loggedIn = moment().format("HH:mm"),
                        user.save(async (err: any, data: any) => {
                            if (err) {
                                console.log("err=", err);
                                res.json({

                                    err: err
                                });
                            }
                            else if (data) {

                                const obj = {
                                    _id: data._id,
                                    userName: data.userName,
                                    phoneNo: data.phoneNo,
                                    email: data.email,
                                    address: data.address,
                                    // loggedIn: moment().format("HH:mm"),
                                    age: data.age,
                                    sex: data.sex,
                                    msg: "User added successfully",
                                };
                                res.status(200).json(obj);
                            }
                        });
                }
            });
    }
    else {
        res.status(406).json({
            statusCode: 406,
            msg: "fill all details correctly",
        });
    }
};

import express from 'express';
import { Request, Response, NextFunction } from 'express';
import employeeModel from '../employee/EmployeeModel';
import moment from 'moment-timezone';
import bcrypt from "bcryptjs";
import fs from "fs";
import decoded from "jwt-decode";
import multer from "multer";
import base64 from "base-64";
import utf8 from "utf8";
import { createToken } from "../util";
import path from "path";
import jwt, { TokenExpiredError } from "jsonwebtoken";
import async, { log } from "async";
export const jwt_secret = "ADIOS AMIGOS";
import { json, raw } from "body-parser";
import constant from "../config/constant";
const app = express();
export const register: any = (req: Request, res: Response) => {
    console.log("Signup ", req.body);
    if (req.body.userName && req.body.email && req.body.password && req.body.phoneNo && req.body.employeeName && req.body.surveyStation) {
        req.body.password = bcrypt.hashSync(req.body.password, 10);
        if (req.body.email.match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)) {
            employeeModel.findOne({ email: req.body.email }, (err, result: any) => {
                console.log("result ---->", result);
                if (err) {
                    res.status(500).json(err);
                } else if (result) {
                    res.status(400).json({
                        msg: "User Already exist"
                    });
                } else {
                    console.log("req.-------->", req.body);
                    req.body.lastLogin = moment().format();
                    const user = new employeeModel(req.body);
                    user.save(async (err, result) => {
                        if (err) {
                            console.log("err=", err);
                            res.json({
                                err: err
                            });
                        } else if (result) {

                            const payload = {
                                email: result.toJSON().email,
                                _id: result.toJSON()._id
                            };
                            const token = jwt.sign(payload, jwt_secret, {
                                algorithm: "HS384",
                                expiresIn: constant.expiresIn,
                                issuer: "Yash"
                            });
                            const _result = result.toJSON();

                            const obj = {
                                userName: req.body.userName,
                                email: req.body.email,
                                phoneNo: req.body.phoneNo,
                                employeeName: req.body.employeeName,
                                surveyStation: req.body.surveyStation,
                                token: token,
                                expiresIn: constant.expiresIn - 86400
                            };
                            res.status(200).json({ msg: "Successfully Added" });

                        }
                    });
                }
            });
        } else {
            res.status(406).json({
                statusCode: 406,
                msg: "fill email details correctley"
            });
        }
    } else {
        res.status(400).json({
            msg: "please fill all details first"
        });
    }
};
export const login = (req: Request, res: Response) => {
    console.log("Login hited");
    if (req.body.email && req.body.password) {
        employeeModel.findOne(
            { email: req.body.email }, (err: any, result: any) => {
                if (err) {
                    res.status(500).json(err);
                } else if (result) {
                    console.log("ids", result._id);
                    bcrypt.compare(
                        req.body.password,
                        result.password,
                        (err, data) => {
                            console.log("result" + result + err);
                            if (err) {
                                res.status(500).json(err);
                            }
                            else if (data) {
                                const payload = {
                                    email: result.toJSON().email,
                                    _id: result.toJSON()._id
                                };
                                const token = jwt.sign(payload, jwt_secret, {
                                    algorithm: "HS384",
                                    expiresIn: constant.expiresIn,
                                    issuer: "Yash"
                                });
                                const _result = result.toJSON();
                                const obj = {
                                    userName: _result.userName,
                                    email: _result.email,
                                    employeeName: _result.employeeName,
                                    token: token,
                                    phoneNo: _result.phoneNo,
                                    expiresIn: constant.expiresIn - 86400,
                                    msg: "Successfull Login"
                                };
                                res.status(200).json(obj);
                            } else {
                                res.status(400).json({
                                    msg: "wrong password"
                                });
                            }
                        }
                    );
                } else {
                    res.status(400).json({
                        msg: "User Not Found!"
                    });
                }
            });
    } else {
        console.log("m out username");
        res.status(400).json({
            // msg: "userName not registered"
            msg: "Invalid parameters!"
        });
    }
};
export const getEmployee = async (req: Request, res: Response) => {
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
        if (req.body.employeeName) {
            condition.employeeName = new RegExp('^' + req.body.employeeName, 'i');
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
        await employeeModel.find(condition, { __v: 0 },
            async (err, data: any) => {
                console.log(`user:----`, err, data);
                if (data) {
                    const count: any = await employeeModel.count(condition);
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

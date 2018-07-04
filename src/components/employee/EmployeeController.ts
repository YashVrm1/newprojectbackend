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
    if (req.body.userName && req.body.email && req.body.password && req.body.phone && req.body.employeeName) {
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
                                password: req.body.password,
                                phone: req.body.phone,
                                employeeName: req.body.employeeName,
                                picture: constant.url + _result.picture,
                                token: token,
                                expiresIn: constant.expiresIn - 86400
                            };
                            res.status(200).json(obj);

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
    if (req.body.userName && req.body.password) {
        const auth: any = req.headers.authorization;
        employeeModel.findOne(
            { userName: req.body.userName }, (err: any, result: any) => {
                if (err) {
                    res.status(500).json(err);
                } else if (result) {
                    console.log("ids", result._id);
                    bcrypt.compare(
                        req.body.password,
                        result.toJSON().password,
                        (err, data) => {
                            console.log("result" + data + err);
                            if (err) {
                                res.status(500).json(err);
                            }
                            if (data) {
                                // if (result.status == false) {
                                // post= db.post++;
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
                                    expiresIn: constant.expiresIn - 86400,
                                    msg: "Successfull Login"
                                };
                                res.json(obj);
                                // // }
                                // else {
                                // }
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
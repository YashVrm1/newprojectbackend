import Admin from "./adminModel";
import { Request, Response, NextFunction } from "express";
import bcrypt from "bcryptjs";
import jwt, { TokenExpiredError } from "jsonwebtoken";
import * as async from "async";
import { ObjectID } from "bson";
export let jwt_secret = "ADIOS AMIGOS";
import base64 from "base-64";
import utf8 from "utf8";
import mongoose from "mongoose";
import moment from "moment-timezone";
import constant from "../config/constant";

export const createAdmin: any = (req: Request, res: Response) => {
    console.log("Signup ", req.body);
    if (req.body.email && req.body.password) {
        req.body.password = bcrypt.hashSync(req.body.password, 10);
        if (req.body.email.match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)) {
            Admin.findOne({ email: req.body.email }, (err, result: any) => {
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
                    const user = new Admin(req.body);
                    user.save(async (err, result) => {
                        if (err) {
                            console.log("err=", err);
                            res.json({
                                err: err
                            });
                        } else if (result) {
                            const _result = result.toJSON();
                            const obj = {
                                userName: req.body.userName,
                                email: req.body.email,
                                password: req.body.password,
                                picture: constant.url + _result.picture,
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
export const adminLogin = (req: Request, res: Response) => {
    console.log("Login hited");
    if (req.body.userName && req.body.password) {
        const auth: any = req.headers.authorization;
        Admin.findOne(
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
                                const _result = result.toJSON();
                                const obj = {
                                    userName: _result.userName,
                                    email: _result.email,
                                    picture: constant.url + _result.picture,

                                };
                                res.json(obj);
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
export const imgUpload = async (req: Request, res: Response) => {
    console.log("imgupload api called");
    try {
        console.log("File name===>", req.file.filename);
        Admin.findOne({ email: req.body.email }, (err, data: any) => {
            console.log("userData====> ", data);
            if (data) {
                console.log("status---->" + data.status + data.suspend);
                Admin.updateOne(
                    { email: req.body.email },
                    { $set: { picture: req.file.filename } },
                    err => {
                        res.status(200).json({
                            picture: constant.url + req.file.filename
                        });
                    }
                );

            } else {
                throw err;
            }
        });
    } catch (error) {
        console.log("error = ", error);
        res.status(400).json(error);
    }
};
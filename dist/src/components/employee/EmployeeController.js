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
const EmployeeModel_1 = __importDefault(require("../employee/EmployeeModel"));
const moment_timezone_1 = __importDefault(require("moment-timezone"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
exports.jwt_secret = "ADIOS AMIGOS";
const constant_1 = __importDefault(require("../config/constant"));
const app = express_1.default();
exports.register = (req, res) => {
    console.log("Signup ", req.body);
    if (req.body.userName && req.body.email && req.body.password && req.body.phone && req.body.employeeName) {
        req.body.password = bcryptjs_1.default.hashSync(req.body.password, 10);
        if (req.body.email.match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)) {
            EmployeeModel_1.default.findOne({ email: req.body.email }, (err, result) => {
                console.log("result ---->", result);
                if (err) {
                    res.status(500).json(err);
                }
                else if (result) {
                    res.status(400).json({
                        msg: "User Already exist"
                    });
                }
                else {
                    console.log("req.-------->", req.body);
                    req.body.lastLogin = moment_timezone_1.default().format();
                    const user = new EmployeeModel_1.default(req.body);
                    user.save((err, result) => __awaiter(this, void 0, void 0, function* () {
                        if (err) {
                            console.log("err=", err);
                            res.json({
                                err: err
                            });
                        }
                        else if (result) {
                            const payload = {
                                email: result.toJSON().email,
                                _id: result.toJSON()._id
                            };
                            const token = jsonwebtoken_1.default.sign(payload, exports.jwt_secret, {
                                algorithm: "HS384",
                                expiresIn: constant_1.default.expiresIn,
                                issuer: "Yash"
                            });
                            const _result = result.toJSON();
                            const obj = {
                                userName: req.body.userName,
                                email: req.body.email,
                                password: req.body.password,
                                phone: req.body.phone,
                                employeeName: req.body.employeeName,
                                picture: constant_1.default.url + _result.picture,
                                token: token,
                                expiresIn: constant_1.default.expiresIn - 86400
                            };
                            res.status(200).json(obj);
                        }
                    }));
                }
            });
        }
        else {
            res.status(406).json({
                statusCode: 406,
                msg: "fill email details correctley"
            });
        }
    }
    else {
        res.status(400).json({
            msg: "please fill all details first"
        });
    }
};
exports.login = (req, res) => {
    console.log("Login hited");
    if (req.body.userName && req.body.password) {
        const auth = req.headers.authorization;
        EmployeeModel_1.default.findOne({ userName: req.body.userName }, (err, result) => {
            if (err) {
                res.status(500).json(err);
            }
            else if (result) {
                console.log("ids", result._id);
                bcryptjs_1.default.compare(req.body.password, result.toJSON().password, (err, data) => {
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
                        const token = jsonwebtoken_1.default.sign(payload, exports.jwt_secret, {
                            algorithm: "HS384",
                            expiresIn: constant_1.default.expiresIn,
                            issuer: "Yash"
                        });
                        const _result = result.toJSON();
                        const obj = {
                            userName: _result.userName,
                            email: _result.email,
                            employeeName: _result.employeeName,
                            token: token,
                            expiresIn: constant_1.default.expiresIn - 86400,
                            msg: "Successfull Login"
                        };
                        res.json(obj);
                        // // }
                        // else {
                        // }
                    }
                    else {
                        res.status(400).json({
                            msg: "wrong password"
                        });
                    }
                });
            }
            else {
                res.status(400).json({
                    msg: "User Not Found!"
                });
            }
        });
    }
    else {
        console.log("m out username");
        res.status(400).json({
            // msg: "userName not registered"
            msg: "Invalid parameters!"
        });
    }
};
//# sourceMappingURL=EmployeeController.js.map
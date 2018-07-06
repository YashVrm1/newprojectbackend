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
const adminModel_1 = __importDefault(require("./adminModel"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
exports.jwt_secret = "ADIOS AMIGOS";
const moment_timezone_1 = __importDefault(require("moment-timezone"));
const constant_1 = __importDefault(require("../config/constant"));
exports.createAdmin = (req, res) => {
    console.log("Signup ", req.body);
    if (req.body.email && req.body.password) {
        req.body.password = bcryptjs_1.default.hashSync(req.body.password, 10);
        if (req.body.email.match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)) {
            adminModel_1.default.findOne({ email: req.body.email }, (err, result) => {
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
                    const user = new adminModel_1.default(req.body);
                    user.save((err, result) => __awaiter(this, void 0, void 0, function* () {
                        if (err) {
                            console.log("err=", err);
                            res.json({
                                err: err
                            });
                        }
                        else if (result) {
                            const _result = result.toJSON();
                            const obj = {
                                userName: req.body.userName,
                                email: req.body.email,
                                picture: constant_1.default.url + _result.picture,
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
exports.adminLogin = (req, res) => {
    console.log("Login hited");
    if (req.body.email && req.body.password) {
        const auth = req.headers.authorization;
        adminModel_1.default.findOne({ email: req.body.email }, (err, result) => {
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
                        const _result = result.toJSON();
                        const obj = {
                            userName: _result.userName,
                            email: _result.email,
                            picture: constant_1.default.url + _result.picture,
                        };
                        res.json(obj);
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
exports.imgUpload = (req, res) => __awaiter(this, void 0, void 0, function* () {
    console.log("imgupload api called");
    try {
        console.log("File name===>", req.file.filename);
        adminModel_1.default.findOne({ email: req.body.email }, (err, data) => {
            console.log("userData====> ", data);
            if (data) {
                console.log("status---->" + data.status + data.suspend);
                adminModel_1.default.updateOne({ email: req.body.email }, { $set: { picture: req.file.filename } }, err => {
                    res.status(200).json({
                        picture: constant_1.default.url + req.file.filename
                    });
                });
            }
            else {
                throw err;
            }
        });
    }
    catch (error) {
        console.log("error = ", error);
        res.status(400).json(error);
    }
});
//# sourceMappingURL=adminController.js.map
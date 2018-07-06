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
const userModel_1 = __importDefault(require("./userModel"));
const moment_timezone_1 = __importDefault(require("moment-timezone"));
exports.jwt_secret = "ADIOS AMIGOS";
const app = express_1.default();
exports.getuser = (req, res) => __awaiter(this, void 0, void 0, function* () {
    try {
        let skip_Value;
        let limitValue = req.query.limit ? parseInt(req.query.limit) : 10;
        if (req.query.page != undefined && req.query.page > 1) {
            skip_Value = limitValue * (req.query.page - 1);
        }
        else {
            skip_Value = 0;
        }
        if (req.query.limit != undefined) {
            limitValue = parseInt(req.query.limit);
        }
        const condition = {};
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
            const searchDate = moment_timezone_1.default(req.body.createdAt).format('YYYY-MM-DD') + "T00:00:00.000";
            const searchGtDate = moment_timezone_1.default(req.body.createdAt).add(1, 'd').format('YYYY-MM-DD') + "T00:00:00.000";
            // '$lt': '2017-05-06T00:00:00Z'
            //  "2018-04-24T20:15:35.142Z"
            let value = {};
            value = {
                '$lt': searchGtDate,
                '$gte': searchDate
            };
            condition.createdAt = value;
        }
        console.log(" ---- ", condition);
        yield userModel_1.default.find(condition, { __v: 0 }, (err, data) => __awaiter(this, void 0, void 0, function* () {
            console.log(`user:----`, err, data);
            if (data) {
                const count = yield userModel_1.default.count(condition);
                console.log('count----->', count, limitValue);
                const totalPages = Math.ceil(count / limitValue);
                console.log('totalpage', totalPages);
                res.status(200).json({ data, totalPages });
            }
            else {
                res.status(400).json("Cannot find data");
            }
        })).sort({ createdAt: -1 }).skip(skip_Value).limit(limitValue);
    }
    catch (error) {
        console.log("Error Found");
        res.status(500).json(error);
    }
});
exports.adduser = (req, res) => {
    if (req.body.email && req.body.address) {
        userModel_1.default.findOne({ email: req.body.email }, (err, result) => __awaiter(this, void 0, void 0, function* () {
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
                const user = new userModel_1.default({
                    userName: req.body.userName,
                    phoneNo: req.body.phoneNo,
                    email: req.body.email,
                    address: req.body.address,
                    age: req.body.age,
                    sex: req.body.sex
                });
                user.save((err, data) => __awaiter(this, void 0, void 0, function* () {
                    if (err) {
                        console.log("err=", err);
                        res.json({
                            err: err
                        });
                    }
                    else if (data) {
                        const obj = {
                            userName: data.userName,
                            phoneNo: data.phoneNo,
                            email: data.email,
                            address: data.address,
                            age: data.age,
                            sex: data.sex,
                            msg: "User added successfully",
                        };
                        res.status(200).json(obj);
                    }
                }));
            }
        }));
    }
    else {
        res.status(406).json({
            statusCode: 406,
            msg: "fill all details correctly",
        });
    }
};
//# sourceMappingURL=userController.js.map
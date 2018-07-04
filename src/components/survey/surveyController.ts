import express from "express";
import surveymongo from "./surveyModel";
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
        const surveyData = new surveymongo({
            slNo: req.body.slNo,
            date: req.body.date,
            time: req.body.time,
            EnumeratorName: req.body.EnumeratorName,


        });
        await surveyData.save();
        res.status(201).json(surveyData);


    }
    catch (error) {
        res.status(500).json(error);
    }
};
import { createAdmin, adminLogin, imgUpload } from './adminController';
import * as express from "express";
import { Request, Response } from "express";
import { verifyToken, checkExpiry } from '../util/permission';
import { NextFunction } from 'express-serve-static-core';
import multer from "multer";
import path from 'path';
import decoded from 'jwt-decode';
const router = express.Router();
const storage: any = multer.diskStorage({
    destination: function (req, file, cb: any) {
        cb(undefined, 'src/public/images');
    },
    filename: function (req, file, cb: any) {

        cb(undefined, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});
const upload = multer({
    storage: storage
});
router.post("/register", upload.single('picture'), (req: Request, res: Response) => {
    // console.log("post AdminRoutes.......?",req.query,req.body)
    createAdmin(req, res);
});
router.post('/login', (req: Request, res: Response) => {
    adminLogin(req, res);
});
router.post('/imageupload', upload.single('picture'), (req: Request, res: Response) => {
    // console.log('res in routes', req.body);
    imgUpload(req, res);
});
export default router;

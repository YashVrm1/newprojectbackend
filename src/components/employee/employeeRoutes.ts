import * as express from 'express';
import multer from "multer";
import path from "path";
import { verifyToken } from '../util/permission';
import { Request, Response, NextFunction } from 'express';
import { register, login, getEmployee, imgUpload } from './EmployeeController';
const router = express.Router();
const storage: any = multer.diskStorage({
    destination: function (req, file, cb: any) {
        console.log("hii");
        cb(undefined, 'src/public/images');
    },
    filename: function (req, file, cb: any) {
        cb(undefined, file.fieldname + Date.now() + path.extname(file.originalname));
        console.log("///" + file.fieldname + Date.now() + path.extname(file.originalname));
    }
});
const upload = multer({
    storage: storage
});
router.post('/addEmployee', upload.single('img'), (req: Request, res: Response) => {
    register(req, res);
});
router.post('/loginEmployee', (req: Request, res: Response) => {
    login(req, res);
});
router.post('/getEmployee', (req: Request, res: Response) => {
    getEmployee(req, res);
});
router.post('/imageupload', upload.single('picture'), (req: Request, res: Response) => {
    // console.log('res in routes', req.body);
    imgUpload(req, res);
});
export default router;

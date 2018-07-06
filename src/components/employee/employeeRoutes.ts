import * as express from 'express';
import multer from "multer";
import path from "path";
// import { verifyToken } from '../util/permission';
import { Request, Response, NextFunction } from 'express';
import { register, login, getEmployee } from './EmployeeController';
const router = express.Router();
router.post('/addEmployee', (req: Request, res: Response) => {
    register(req, res);
});
router.post('/loginEmployee', (req: Request, res: Response) => {
    login(req, res);
});
router.post('/getEmployee', (req: Request, res: Response) => {
    getEmployee(req, res);
});
export default router;

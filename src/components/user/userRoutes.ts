import * as express from 'express';
import multer from "multer";
import path from "path";
// import { verifyToken } from '../util/permission';
import { Request, Response, NextFunction } from 'express';
import { getuser, adduser, updatedestination, updateorigin } from './userController';
const router = express.Router();
router.post('/getuser', (req: Request, res: Response) => {
    getuser(req, res);
});
router.post('/adduser', (req: Request, res: Response) => {
    adduser(req, res);
});
router.put('/updateDes', (req: Request, res: Response) => {
    updatedestination(req, res);
});
router.put('/updateOrigin', (req: Request, res: Response) => {
    updateorigin(req, res);
});
export default router;

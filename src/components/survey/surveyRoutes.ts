import * as express from 'express';
import multer from "multer";
import path from "path";
import { verifyToken } from '../util/permission';
import { Request, Response, NextFunction } from 'express';
import { survey, count } from './surveyController';
const router = express.Router();
router.post('/addEmployee', verifyToken, (req: Request, res: Response) => {
    survey(req, res);
});
router.post('/count', (req: Request, res: Response) => {
    count(req, res);
});
export default router;

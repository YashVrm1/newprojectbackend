import * as express from 'express';
import multer from "multer";
import path from "path";
import { verifyToken } from '../util/auth';
import { Request, Response, NextFunction } from 'express';
import { survey, count } from './surveyController';
const router = express.Router();
router.post('/addSurvey', (req: Request, res: Response) => {
    survey(req, res);
});
router.post('/count', (req: Request, res: Response) => {
    count(req, res);
});
export default router;

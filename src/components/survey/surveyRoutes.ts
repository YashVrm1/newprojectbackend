import * as express from 'express';
import multer from "multer";
import path from "path";
import { verifyToken } from '../util/auth';
import { Request, Response, NextFunction } from 'express';
import { survey, count, countfalse, getSurveyData } from './surveyController';
const router = express.Router();
router.post('/addSurvey', (req: Request, res: Response) => {
    survey(req, res);
});
router.post('/counttrue', (req: Request, res: Response) => {
    count(req, res);
});
router.post('/countfalse', (req: Request, res: Response) => {
    countfalse(req, res);
});
router.post('/getSurvey', (req: Request, res: Response) => {
    getSurveyData(req, res);
});
export default router;

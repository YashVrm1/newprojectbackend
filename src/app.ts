import express from 'express';
import bodyParser from 'body-parser';
import jsonwebtokens from 'jsonwebtoken';
import lodash from 'lodash';
import cors from "cors";
import csrf from "csurf";
import path from "path";
import ejs from 'ejs';
import appRoutes from './routes';
import { Response, Request, NextFunction } from "express";
const mongoose = require('./database/mongoose');
// const webSocket = require('./socket/websocket');
// const crone = require('./crone/crone');
const app: any = express();


process.env.SECRET_KEY = 'ADIOS AMIGOS';

app.use(express.static("src"));
app.use(express.static("src/components/public/images"));
app.use(bodyParser.json());
app.use(cors());
app.use(csrf());
app.set('port', (process.env.PORT || 5000));
const routes = appRoutes(app);

app.get("/index", (req: Request, res: Response) => {
  res.sendFile(__dirname + '/home.html');
});

app.get("/", (req: Request, res: Response) => {
  res.json('HELLO MYPROJECT');
});
app.use((req: Request, res: Response, next: NextFunction) => {
  console.log(`${req.method} ${req.url}`);
  console.log(req.body);
  next();
});

export default app;

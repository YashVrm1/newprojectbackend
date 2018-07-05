import express from 'express';
import bodyParser from 'body-parser';
import jsonwebtokens from 'jsonwebtoken';
import lodash from 'lodash';
import session from "express-session";
import cors from "cors";
import csrf from "csurf";
import cookieParser from "cookie-parser";
import path from "path";
import ejs from 'ejs';
import appRoutes from './routes';
import { Response, Request, NextFunction } from "express";
import { log } from 'async';
const mongoose = require('./database/mongoose');
// const webSocket = require('./socket/websocket');
// const crone = require('./crone/crone');
const app: any = express();


process.env.SECRET_KEY = 'ADIOS AMIGOS';

app.use(express.static("src"));
app.use(express.static("src/components/public/images"));
app.use(bodyParser.json());
app.use(cors());
app.use(cookieParser());
app.use(session({
  secret: 'My super session secret',
  cookie: {
    httpOnly: true,
    secure: true
  }
}));
app.use(csrf({cookie:true}));
app.use((req: Request, res: Response, next: NextFunction) => {
  // res.locals._csrf = req.csrfToken();
  console.log(`${req.method} ${req.url}`);
  // console.log(req.body);
  // next();

  let token = req.csrfToken();
  res.cookie('XSRF-TOKEN', token);
  res.locals.csrfToken = token;
  next();
});
app.set('port', (process.env.PORT || 5000));
const routes = appRoutes(app);

app.get("/index", (req: Request, res: Response) => {
  res.sendFile(__dirname + '/home.html');
});

app.get("/", (req: Request, res: Response) => {
  res.json('HELLO MYPROJECT');
});
export default app;

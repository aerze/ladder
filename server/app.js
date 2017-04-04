import path from 'path';
import Express from 'express';
import session from 'express-session';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import logger from 'morgan';

import initDatastore from './datastore';
import { ensureLoggedIn } from 'connect-ensure-login';
import passport, { routes as authRoutes } from './passport';

import enableCors from './enableCors';
import playerRoutes from './player';
import matchRoutes from './match';

const { COOKIE_SECRET } = process.env;

const app = new Express();
const db = initDatastore();

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(session({ secret: COOKIE_SECRET, resave: true, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());
app.use('/', Express.static(path.join(__dirname, 'build')));
app.use('/api', enableCors);

authRoutes(app);
playerRoutes(app, db);
matchRoutes(app, db);

export default app;

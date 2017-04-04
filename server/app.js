import path from 'path';
import Express from 'express';
import session from 'express-session';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import logger from 'morgan';
import { ensureLoggedIn } from 'connect-ensure-login';
import passport, { routes as authRoutes } from './passport';

import enableCors from './enableCors';
import player from './player';

const { COOKIE_SECRET } = process.env;

const app = new Express();

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(session({ secret: COOKIE_SECRET, resave: true, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());

authRoutes(app);

app.use('/', Express.static(path.join(__dirname, 'build')));
app.use('/api', enableCors);
app.use('/api/player', player);


export default app;

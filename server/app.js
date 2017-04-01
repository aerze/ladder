import path from 'path';
import Express from 'express';
import session from 'express-session';
import logger from 'morgan';
import passport from 'passport';
import { OAuth2Strategy as GoogleStrategy }  from 'passport-google-oauth';
import { ensureLoggedIn } from 'connect-ensure-login';

import enableCors from './enableCors';
import players from './players';

const {
  GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET,
  GOOGLE_CALLBACK_URL,
  COOKIE_SECRET } = process.env;

const USERS = [];

passport.serializeUser(function({ accessToken, profile }, done) {
  USERS.push({ accessToken, profile });
  done(null, accessToken);
});

passport.deserializeUser(function(accessToken, done) {
  const user = USERS.find(user => user.accessToken === accessToken);
  if (user) return done(null, user);
  return done(new Error('User not stored'), null);
});

passport.use(new GoogleStrategy({
    clientID: GOOGLE_CLIENT_ID,
    clientSecret: GOOGLE_CLIENT_SECRET,
    callbackURL: GOOGLE_CALLBACK_URL
  }, (accessToken, refreshToken, profile, done) => done(null, { accessToken, profile })
));

const app = new Express();


app.use(logger('dev'));
app.use(session({ secret: COOKIE_SECRET, resave: true, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());

app.get('/auth/google',
  passport.authenticate('google', { scope: ['profile', 'email'] }));

app.get('/auth/google/callback',
  passport.authenticate('google', { failureRedirect: '/login' }),
  (req, res) => {
    const profile = req.user.profile;
    const emails = profile.emails || [];
    console.log('emails', emails);
    const isZeetoEmail = !!emails.find(email => email.value.includes('@zeeto'));
    console.log('isZeetoEmail', isZeetoEmail);

    const defaultUrl = '/profile';
    const returnTo = req.session.returnTo || defaultUrl;
    const redirectUrl = returnTo === '/login' ? defaultUrl : returnTo;

    if (!isZeetoEmail) {
      req.logout();
      return res.redirect('/get-out');
    }
    return res.redirect(redirectUrl);
  });

app.get('/profile', (req, res) => {
  return res.json({ profile: 'profile', user: req.user });
});

app.get('/login', (req, res) => res.redirect('/auth/google'));
app.get('/logout', (req, res) => {
  req.logout();
  return res.redirect('/login');
});

app.get('/get-out', (req, res) => res.send('And stay out'));

// app.use('/', ensureLoggedIn('/auth/google'), Express.static(path.join(__dirname, 'build')));
app.use('/', Express.static(path.join(__dirname, 'build')));
app.use('/api', enableCors);
app.use('/api/players', players);


export default app;
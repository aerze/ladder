
import passport from 'passport';
import { OAuth2Strategy as GoogleStrategy }  from 'passport-google-oauth';

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

function routes(app) {

  app.get('/auth/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

  app.get('/auth/google/callback', passport.authenticate('google', { failureRedirect: '/login' }),
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
    }
  );

  
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
};

export { routes };

export default passport;
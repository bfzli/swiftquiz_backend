const User = require("../models/User");
const {
  SECRET,
  GOOGLE_ID,
  GOOGLE_SECRET,
  FACEBOOK_ID,
  FACEBOOK_SECRET,
  LINKEDIN_ID,
  LINKEDIN_SECRET,
  GITHUB_ID,
  GITHUB_SECRET,
} = require("../config");
const { Strategy, ExtractJwt } = require("passport-jwt");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const GithubStrategy = require("passport-github2").Strategy;
const LinkedInStrategy = require("passport-linkedin-oauth2").Strategy;
const FacebookStrategy = require("passport-facebook").Strategy;

const opts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: SECRET,
};

module.exports = (passport) => {
  passport.use(
    new Strategy(opts, async (payload, done) => {
      await User.findById(payload.user_id)
        .then(async (user) => {
          if (user) {
            return done(null, user);
          }
          return done(null, false);
        })
        .catch((err) => {
          return done(null, false);
        });
    })
  );
  //Google Auth
  passport.use(
    new GoogleStrategy(
      {
        clientID: GOOGLE_ID,
        clientSecret: GOOGLE_SECRET,
        callbackURL: "/auth/google/callback",
      },
      async (accessToken, refreshToken, profile, done) => {
        const newUser = {
          id: profile.id,
          name: profile.displayName,
          avatar: profile.photos[0].value,
        };
        try {
          let user = await User.findOne({ id: profile.id });
          if (user) {
            done(null, user);
          } else {
            user = await User.create(newUser);
            done(null, user);
          }
        } catch (err) {
          console.log(err);
        }
      }
    )
  );
  //GitHub Auth
  passport.use(
    new GithubStrategy(
      {
        clientID: GITHUB_ID,
        clientSecret: GITHUB_SECRET,
        callbackURL: "/auth/github/callback",
      },
      async (accessToken, refreshToken, profile, done) => {
        const newUser = {
          id: profile.id,
          name: profile.displayName,
          avatar: profile.photos[0].value,
        };
        try {
          let user = await User.findOne({ id: profile.id });
          if (user) {
            done(null, user);
          } else {
            user = await User.create(newUser);
            done(null, user);
          }
        } catch (err) {
          console.log(err);
        }
      }
    )
  );
  //Facebook Auth
  passport.use(
    new FacebookStrategy(
      {
        clientID: FACEBOOK_ID,
        clientSecret: FACEBOOK_SECRET,
        callbackURL: "/auth/facebook/callback",
      },
      // function (accessToken, refreshToken, profile, cb) {
      //   User.findOrCreate({ id: profile.id }, function (err, user) {
      //     return cb(err, user);
      //   });
      // }
      async (accessToken, refreshToken, profile, done) => {
        const newUser = {
          id: profile.id,
          name: profile.displayName,
          avatar: profile.photos[0].value,
          username: profile.username[0].value,
        };
        try {
          let user = await User.findOne({ id: profile.id });
          if (user) {
            done(null, user);
          } else {
            user = await User.create(newUser);
            done(null, user);
          }
        } catch (err) {
          console.log(err);
        }
      }
    )
  );

  //LinkedIn Auth
  passport.use(
    new LinkedInStrategy(
      {
        clientID: LINKEDIN_ID,
        clientSecret: LINKEDIN_SECRET,
        callbackURL: "/auth/linkedin/callback",
        scope: ["r_emailaddress", "r_liteprofile"],
      },
      function (accessToken, refreshToken, profile, done) {
        process.nextTick(() => {
          const newUser = {
            id: profile.id,
            name: profile.displayName,
            avatar: profile.photos[0].value,
          };
          try {
            let user = User.findOne({ id: profile.id });
            if (user) {
              done(null, user);
            } else {
              user = User.create(newUser);
              done(null, user);
            }
          } catch (err) {
            console.log(err);
          }
        });
      }
    )
  );
  passport.serializeUser((user, done) => {
    done(null, user.id);
  });
  passport.deserializeUser((user, done) => {
    User.findById(user.id, (err, user) => done(null, user));
  });
};

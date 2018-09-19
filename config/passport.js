const passport = require('passport');
const JwtStrategy = require('passport-jwt').Strategy;
const { ExtractJwt } = require('passport-jwt');
const LocalStrategy = require('passport-local').Strategy;

const keys = require('./keys');
const User = require('../models/user-model')

//console.log(keys);
//JSON WEB TOKEN Strategy
passport.use(new JwtStrategy({
    jwtFromRequest: ExtractJwt.fromHeader('authorization'),
    secretOrKey: keys.JWT.secret
  },
  async (payload, done) => {
    try {
      //find specify signToken
      const user = await User.findById(payload.sub);

      //if user doesn't exist handle it
      if (!user) {
        return done(null, false)
      }

      //otherwise return the user
      done(null, user)

    } catch (error) {
      done(error, false);
    }

  }));

//local Strategy
// username and email
passport.use(new LocalStrategy({
    usernameField: 'email'
  },
  async (email, password, done) => {
    try {
      //find the user with given mail //
      const user = await User.findOne({
        email
      });

      //if not handle This
      if (!user) {
        return done(null, false);
      }
      //check if pasword is correct

      const isMatch = await user.isValidPassword(password)

      // if not handle This
      if (!isMatch) {
        return done(null, false);
      }

      //  otherwise return the user
      return done(null, user);

    } catch (error) {
      done(error, false);
    }



  }));

const JWT = require('jsonwebtoken');
const User = require('../models/user-model');
const keys = require('../config/keys');

signToken = user => {
  return JWT.sign({
    iss: keys.JWT.iss,
    sub: user.id,
    iat: new Date().getTime(),
    exp: new Date().setDate(new Date().getDate() + 1)
  }, keys.JWT.secret);
}

module.exports = {
  signup: async (req, res, next) => {

      //******ES 5*******
      // const email = req.value.body.email
      // const password = req.value.body.password
      //******ES 6*******
      const {
        email,
        password
      } = req.value.body;

      // Check is user already exist
      const foundUser = await User.findOne({
        email
      })
      if (foundUser) {
        return res.status(403).json({
          error: 'User with email id already exist, Please log in'
        })
      } else {
        // if not create user

        //******ES 5*******
        // const newEmp = new Emp({
        //   email : email,
        //   password :password
        // });
        //******ES 6*******
        const newUser = new User({
          email,
          password
        });
        await newUser.save();
        console.log(newUser)
        const token = signToken(newUser);
        //respond with token
        //res.json({msg : "New user created"});


        res.status(200).json({
          token
        })

      }


    },
    signin: async (req, res, next) => {
        //generate the token
        //req.user get the use credentials

        const token = signToken(req.user);
        //console.log(req);
        res.status(200).json({token});


    },
    secret: async (req, res, next) => {
      console.log("pointer was here");
      res.status(200).json({secret : "resources"});

    }
}

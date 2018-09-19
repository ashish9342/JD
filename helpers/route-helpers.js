const Joi = require('joi');
// helps in validating the input sent by the user
module.exports = {
  validateBody: (schema) => {
    return (req, res, next) => {
      const result = Joi.validate(req.body, schema);

      if(result.error){
        return res.status(400).json(result.error);
      }

      if(!req.value){ req.value = {};}

      req.value['body'] = result.value;
      next();// if no error move to next function(user controller)
    };
  },
  schemas: {
    authSchema: Joi.object().keys({
      email : Joi.string().email().required(),
      password: Joi.string().required()
    })
  }
}

const joi = require('joi')


exports.validate = (user) =>{
    const schema = joi.object({
      name: joi.string().required(),
      email: joi.string().email().required(),
      password: joi.string().required()
    })
    return schema.validate(user)
  }
  

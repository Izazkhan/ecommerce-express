// requests/getUserRequest.js
import Joi from 'joi';
import Request from '../request.js';

class RegisterUserRequest extends Request {
  constructor(req) {
    super(req);
    this.schema = {
      name: Joi.string().required().min(3).max(20).messages({
        'string.empty': 'The name field is required',
        'required': 'The name field is required'
      }),
      email: Joi.string().trim().email().required().messages({
        'string.empty': 'The email field is required'
      }),
      password: Joi.string().min(6).max(20),
      password_confirmation: Joi.ref('password')
    };
  }
}

export default RegisterUserRequest;

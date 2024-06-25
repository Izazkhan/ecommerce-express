// requests/getUserRequest.js
import Joi from 'joi';
import Request from '../request.js';

class LoginRequest extends Request {
  constructor(req) {
    super(req);
    this.schema = {
      email: Joi.string().trim().email().required().messages({
        'string.empty': 'The email field is required'
      }),
      password: Joi.string().required().messages({'any.required': 'Please provide your password'})
    };
  }
}

export default LoginRequest;

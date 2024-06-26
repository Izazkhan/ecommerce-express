// requests/getUserRequest.js
import Joi from 'joi';
import Request from './request.js';

class LoginUserRequest extends Request {
  constructor(req) {
    super(req);
    this.schema = {
      email: Joi.string().trim().email().required().messages({
        'string.empty': 'The email field is required',
        'any.required': 'The email field is required'
      }),
      password: Joi.required()
    };
  }
}

export default LoginUserRequest;

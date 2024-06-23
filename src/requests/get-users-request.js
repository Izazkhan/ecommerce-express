// requests/getUserRequest.js
import Joi from 'joi';
import Request from './request.js';

class GetUserRequest extends Request {
  constructor(req) {
    super(req);
    this.schema = Joi.object({
      id: Joi.string().required(),
    });
  }
}

export default GetUserRequest;

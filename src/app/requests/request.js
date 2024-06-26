import {ValidationError} from "#exceptions/custom-exception.js";
import { generateErrorSummary, mapErrorDetails } from "#utils/errorUtils.js";
import Joi from 'joi';

class Request {
  constructor(req) {
    this.request = req.body;
  }

  validate() {
    const options = {
      abortEarly: false
    }
    const { error } = Joi.object(this.schema).validate(this.request, options)
    if (error) {
      console.log(error);
      throw new ValidationError(generateErrorSummary(error.details) ?? 'Bad Request', mapErrorDetails(error.details));
    }
  }
}

export default Request;

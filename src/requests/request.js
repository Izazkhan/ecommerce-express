class Request {
  constructor(req) {
    this.request = {...req.body,  ...req.query};
  }

  validate() {
    const { error } = this.schema.validate(this.request);
    if (error) {
      throw new Error(`Validation error: ${error.details.map(x => x.message).join(', ')}`);
    }
  }
}

export default Request;

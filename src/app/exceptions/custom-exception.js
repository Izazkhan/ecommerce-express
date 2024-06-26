class ValidationError extends Error {
    constructor(message, errors) {
        super(message);
        this.name = 'VALIDATION_ERROR';
        this.code = 422;
        this.errors = errors;
    }
}

export {
    ValidationError
}
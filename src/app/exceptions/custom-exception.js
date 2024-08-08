class ValidationError extends Error {
    constructor(message = 'Validation error', errors) {
        super(message);
        this.name = 'VALIDATION_ERROR';
        this.code = 422;
        this.errors = errors;
    }
}

class NotFoundError extends Error {
    constructor(message = 'Resource not found') {
        super(message);
        this.name = 'NOT_FOUND';
        this.code = 404;
    }
}

class AuthenticationError extends Error {
    constructor(message = 'Authentication failed') {
        super(message);
        this.name = 'AUTHENTICATION_ERROR';
        this.code = 401;
    }
}

export {
    ValidationError,
    NotFoundError,
    AuthenticationError
}
import UserRepository from "#repositories/userRepository.js";
import AuthService from "#services/passport-service.js"

class UserService {
    constructor() {
        this.authService = new AuthService;
        this.userRepository = new UserRepository;
    }

    async findByEmail(email) {
        return await this.userRepository.findByEmail(email);
    }

    async saveResetPasswordToken(email, token) {
        return await this.userRepository.saveResetPasswordToken(email, token);
    }

    async getUserByToken(token) {
        return await this.userRepository.findByToken(token);
    }
}

export default UserService;
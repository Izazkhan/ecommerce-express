import User from "../models/user.js";
import UserRepository from "../repositories/userRepository.js";
import AuthService from "./auth-service.js"

class UserService {
    constructor() {
        this.authService = new AuthService;
        this.userRepository = new UserRepository;
    }

    async loginUser(email, password) {
        let user = await this.userRepository.findByEmail(email);
        if (!user) {
            throw new Error('Invalid credentials');
        }

        const isMatch = await user.comparePassword(password);
        if (!isMatch) {
            throw new Error('Invalid credentials');
        }

        const token = this.authService.generateToken(user);
        return { msg: 'Login Successful', token: token };
    }
}

export default UserService;
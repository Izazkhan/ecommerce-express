import User from "../models/user";
import AuthService from "./auth-service";

class UserService {
    constructor() {
        this.authService = new AuthService;
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
import Passport from "#services/passport-service.js"
import UserRepository from "#repositories/userRepository.js";

class AuthService {
    constructor() {
        this.passportService = new Passport;
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

        const token = this.passportService.generateToken(user);
        return { msg: 'Login Successful', token: token };
    }
}

export default AuthService;
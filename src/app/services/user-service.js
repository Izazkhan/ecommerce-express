import UserRepository from "#repositories/userRepository.js";
import AuthService from "#services/passport-service.js"

class UserService {
    constructor() {
        this.authService = new AuthService;
        this.userRepository = new UserRepository;
    }

    
}

export default UserService;
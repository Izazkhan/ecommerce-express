import UserModel from '../models/user.js';

class UserRepository {
  async findByEmail(email) {
    return UserModel.findOne({email});
  }
}

export default UserRepository;
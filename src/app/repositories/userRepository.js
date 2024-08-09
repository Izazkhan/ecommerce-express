import UserModel from '#models/user.js';

class UserRepository {
  async findByEmail(email) {
    return await UserModel.findOne({email});
  }
  
  async findByToken(token) {
    return await UserModel.findOne({token});
  }
}

export default UserRepository;
import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const UserSchema = mongoose.Schema({
    name: {
        type: String
    }
})

UserSchema.statics.getUserById = function(id, callback) {
    User.findById(id, callback);
}

UserSchema.statics.getUserByName = function(username, callback) {
    let query = {"name": username};
    return User.findOne(query);
}
const User = mongoose.model('User', UserSchema);

export default User;


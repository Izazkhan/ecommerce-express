import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const UserSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    }
}, {
    methods: {
        async comparePassword (candidatePassword) {
            return await bcrypt.compare(candidatePassword, this.password);
        }
    },

    statics: {
        getUserById: function (id, callback) {
            User.findById(id, callback);
        },

        getUserByName: function (username, callback) {
            let query = { "name": username };
            return User.findOne(query);
        }
    }
})

UserSchema.pre('save', async function (next) {
    if (this.isModified('password') || this.isNew) {
        try {
            const salt = await bcrypt.genSalt(10);
            this.password = await bcrypt.hash(this.password, salt);
            next();
        } catch (error) {
            next(error);
        }
    } else {
        return next();
    }
});

const User = mongoose.model('User', UserSchema);

export default User;


import passport from 'passport';
import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import User from '../models/user.js'; // Adjust the path as needed

dotenv.config();

class AuthService {
  constructor() {
    this.jwtSecret = process.env.JWT_SECRET;
    this.init();
  }

  init() {
    const opts = {
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: this.jwtSecret,
    };

    passport.use(new JwtStrategy(opts, function(jwt_payload, done) {
        User.findOne({id: jwt_payload.sub}, function(err, user) {
            if (err) {
                return done(err, false);
            }
            if (user) {
                return done(null, user);
            } else {
                return done(null, false);
                // or you could create a new account
            }
        });
    }));
  }

  generateToken(user) {
    return jwt.sign({ id: user._id }, this.jwtSecret, {
      expiresIn: '1h', // Token expiration time
    });
  }

  authenticate() {
    return passport.authenticate('jwt', { session: false });
  }
}

export default new AuthService();

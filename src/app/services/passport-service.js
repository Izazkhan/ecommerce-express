import passport from 'passport';
import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import User from '#models/user.js'; // Adjust the path as needed

dotenv.config();

class PassportService {
  constructor() {
    this.jwtSecret = process.env.JWT_SECRET;
    this.init();
  }

  init() {
    const opts = {
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: this.jwtSecret,
    };

    passport.use(new JwtStrategy(opts, async function(jwt_payload, done) {
      try {
        const user = await User.findById(jwt_payload.id);
        if (user) {
          return done(null, user);
        } else {
          return done(null, false);
        }
      } catch (err) {
        console.error(err);
        return done(err, false);
      }
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

export default PassportService;

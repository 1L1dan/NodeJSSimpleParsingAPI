import { Sequelize } from 'sequelize';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { UserRepo } from './data/Repos/UserRepository';

export const jwtSecret = "SECRET_TEST_KEY";
export const sequelize = new Sequelize('mysql://root:password@localhost:3306/NodeJS');
export const jwtStrategy = new Strategy({ jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme("jwt"), secretOrKey: jwtSecret }, function (payload, done) {
  var repo = new UserRepo();
  var user = repo.readOne(payload.userID);
  if (user) {
    console.log(user);
    return done(null, user);
  }
  else {
    console.log("auth failed!")
    return done(null, false)
  }
});

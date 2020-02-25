import * as jwt from 'jsonwebtoken';
import { jwtSecret } from '../../config';
import { UserRepo } from '../../data/Repos/UserRepository';
import * as bcrypt from 'bcrypt'
import { User } from '../../../app/data/Models/User';

interface tokenPair {
  accessToken: string,
  refreshToken: string,
}

export const getNewPair = async (userEmail: string, userID: string): Promise<tokenPair | string> => {
  var accessToken = jwt.sign({ userID: userID }, jwtSecret, { expiresIn: "30m" });
  var refreshToken = jwt.sign({ userEmail: userEmail }, jwtSecret, { expiresIn: "30d" });
  var repo = new UserRepo();
  var updatedUser = await repo.readByEmail(userEmail);
  if (updatedUser) {
    updatedUser.refreshToken = refreshToken;
    repo.update(updatedUser);
    return { accessToken: accessToken, refreshToken: refreshToken };
  }
  else {
    return "Error during writing token!";
  }

}
export const validateUser = async (userID: string): Promise<User | null> => {
  var repo = new UserRepo();
  var user = await repo.readOne(userID);
  return user;


}
export const validatePassword = async (userEmail: string, userPassword: string): Promise<User | string> => {
  var repo = new UserRepo();
  var user = await repo.readByEmail(userEmail);
  if (user === null) {
    return "User doesn't exist";
  }
  else {
    var isValidPassword = await bcrypt.compare(userPassword, user.password);
    if (isValidPassword) {
      return user;
    }
    else {
      return "Wrong password!";
    }

  }
}

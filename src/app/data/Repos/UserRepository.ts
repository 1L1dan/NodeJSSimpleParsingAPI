
import { IRepositoryBase } from './interfaces/IRepositoryBase';
import { User } from '../Models/User';

interface IUserlRepo extends IRepositoryBase<User> {
  readByRefresh(refreshToken: string): Promise<User | null>
  readByEmail(userEmail: string): Promise<User | null>
};
export class UserRepo implements IUserlRepo {
  public async exists(userEmail: string): Promise<boolean> {
    const result = await User.findOne({ where: { email: userEmail } });
    return result === null ? false : true;
  }
  public async create(newUser: User): Promise<User> {
    return await newUser.save();

  }
  public async readAll(): Promise<User[]> {
    return await User.findAll();
  }
  public async readOne(userID: string): Promise<User | null> {
    return User.findOne({ where: { id: userID } });

  }
  public async readByEmail(userEmail: string): Promise<User | null> {
    return User.findOne({ where: { email: userEmail } });

  }
  public async readByRefresh(refreshToken: string): Promise<User | null> {
    return User.findOne({ where: { refreshToken: refreshToken } });

  }
  public async update(updatedUser: User): Promise<number> {
    const result = await User.update({ refreshToken: updatedUser.refreshToken }, { where: { email: updatedUser.email } }).error((err) => err);
    return result[0];
  }

  public async delete(deleteUser: User): Promise<number> {
    return await User.destroy({ where: { email: deleteUser.email } });
  }

}

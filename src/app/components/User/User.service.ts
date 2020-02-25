import { UserRepo } from '../../data/Repos/UserRepository';
import { User } from '../../data/Models/User';
import * as bcrypt from 'bcrypt'

export const  createUser= async (userEmail:string, password:string):Promise<User | string>=>{
    var repo=new UserRepo();
    var checkUser= await repo.readByEmail(userEmail);
    if(checkUser===null){
        var newUser=new User();
        newUser.email=userEmail;
        newUser.password=await bcrypt.hash(password, 10);
        return await repo.create(newUser);
    }
    else{
        return "User with that username already exists!"
    }
}


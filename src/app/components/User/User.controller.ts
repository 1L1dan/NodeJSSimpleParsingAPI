import * as debug from 'debug';
import { Request, Response, NextFunction } from 'express-serve-static-core';
import { createUser } from './User.service';

const logger = debug('app:src/app/components/User/User.controller.ts');


export class UserController {


  /**
   * POST create user
   */
  public createUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
      var userEmail = req.body.userEmail;
      var password = req.body.password;
      var createdUser = await createUser(userEmail, password)
      if (typeof createdUser !== "string") {
        res.status(200).json({ user: createdUser, message: "User successfully created!" })
      }
      else {
        res.status(404).json({ errorMessage: createdUser });
      }

    } catch (err) {
      logger('endpointPostDisplayName:: error: ', err);
      next(err);
    }
  };
}

import * as debug from 'debug';
import { Request, Response, NextFunction } from 'express-serve-static-core';
import { validateUser, getNewPair, validatePassword } from './Auth.service';
import * as jwt from 'jsonwebtoken';
import { jwtSecret } from '../../config';

const logger = debug('app:src/app/components/Auth/Auth.controller.ts');


export class AuthController {


  /**
   * GET get new pair of tokens
   */
  public endpointGetNewPair = async (req: Request, res: Response, next: NextFunction) => {
    try {
      let userID = req.body.userid;
      let refreshToken = req.body.refreshToken;
      let verifyResult = jwt.verify(refreshToken, jwtSecret);
      if (typeof verifyResult !== 'object') {
        res.status(403).json({ errorMessage: "Token is not valid!" });
      }
      else {
        const user = await validateUser(userID);
        if (user !== null) {
          let tokens = await getNewPair(user.email, userID);
          typeof tokens === 'string' ? res.status(404).json({ errorMessage: tokens }) : res.status(200).json({ accessToken: tokens.accessToken, refreshToken: tokens.refreshToken });
        }
        else {
          res.status(403).json({ errorMessage: "Token is not valid!" });
        }
      }

    } catch (err) {
      logger('endpointPostDisplayName:: error: ', err);
      next(err);
    }
  };
  /**
   * GET user status
   */
  public authentificateUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userName = req.body.userEmail;
      const password = req.body.password;
      var user = await validatePassword(userName, password);
      if (typeof user !== "string") {
        var tokens = await getNewPair(user.email, user.id.toString());
        typeof tokens === 'string' ? res.status(404).json({ errorMessage: tokens }) : res.status(200).json({ accessToken: tokens.accessToken, refreshToken: tokens.refreshToken });
      }
      else {
        res.status(401).json({ errorMessage: user });
      }

    } catch (err) {
      logger('endpointPostDisplayName:: error: ', err);
      next(err);
    }
  };
}

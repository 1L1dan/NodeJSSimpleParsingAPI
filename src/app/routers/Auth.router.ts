import { Router } from 'express';
import * as validation from 'express-joi-validation';
import { AuthController } from '../components/Auth';

export class AuthRouter {
  public router: Router;
  protected authController: AuthController;
  protected validator: any;

  constructor() {
    this.authController = new AuthController();
    this.validator = validation({ passError: true });
    this.router = this.initRouter();
  }

  /**
   * Auth router
   */
  private initRouter(): Router {
    const router: Router = Router();

    router
      .get('/get-tokens', this.authController.endpointGetNewPair)
      .get('/auth-user', this.authController.authentificateUser);
    return router;
  }
}

export const authRouter = new AuthRouter();

import { Router } from 'express';
import * as validation from 'express-joi-validation';
import { UserController } from '../components/User';

export class UserRouter {
  public router: Router;
  protected userController: UserController;
  protected validator: any;

  constructor() {
    this.userController = new UserController();
    this.validator = validation({ passError: true });
    this.router = this.initRouter();
  }
  /**
   * User router
   */
  private initRouter(): Router {
    const router: Router = Router();

    router
      .post(
        '/create-user', this.userController.createUser);
    return router;
  }
}

export const userRouter = new UserRouter();

import { Router } from 'express';
import * as routers from './routers';

export class AppRouter {
  protected router: Router;

  constructor() {
    this.router = Router();
  }

  /**
   * Main app router
   */
  public getAppRouter(): Router {
    this.router.use('/common', routers.commonRouter.router);
    this.router.use('/auth', routers.authRouter.router);
    this.router.use('/user', routers.userRouter.router);
    this.router.use('/parsing', routers.parsingRouter.router);
    return this.router;
  }
}

import { Router } from 'express';
import * as validation from 'express-joi-validation';
import { ParsingController } from '../components/Parsing';
import * as passport from 'passport'

export class ParsingRouter {
  public router: Router;
  protected parsingController: ParsingController;
  protected validator: any;

  constructor() {
    this.parsingController = new ParsingController();
    this.validator = validation({ passError: true });
    this.router = this.initRouter();
  }

  /**
   * Parsing router
   */
  private initRouter(): Router {
    const router: Router = Router();
    router
      .get('/get-coupons', passport.authenticate('jwt'), this.parsingController.getCouponsEndpoint)
      .get('/get-by-category', passport.authenticate('jwt'), this.parsingController.getCouponsByCategoryEndpoint)
    return router;
  }
}

export const parsingRouter = new ParsingRouter();

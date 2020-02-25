import * as debug from 'debug';
import { Request, Response, NextFunction } from 'express-serve-static-core';
import { getCoupons, getCouponsByCategory } from './Parsing.service';

const logger = debug('app:src/app/components/Parsing/Parsing.controller.ts');


export class ParsingController {


  /**
   * POST create user
   */
  public getCouponsEndpoint = async (req: Request, res: Response, next: NextFunction) => {
    try {
      var pageNumber = req.body.numberOfPages;
      var result = await getCoupons(pageNumber);
      res.status(200).json({ "parsingResult": result });
    }
    catch (err) {
      res.status(404).json({ 'errorCode': err });
      logger('endpointPostDisplayName:: error: ', err);
      next(err);
    }
  }
  public getCouponsByCategoryEndpoint = async (req: Request, res: Response, next: NextFunction) => {
    try {
      var category = req.body.couponCategory;
      var result = await getCouponsByCategory(category);
      res.status(200).json({ "parsingResult": result });
    }
    catch (err) {
      res.status(404).json({ 'errorCode': err });
      logger('endpointPostDisplayName:: error: ', err);
      next(err);
    }
  }
}

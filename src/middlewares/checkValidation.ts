import { Request, Response, NextFunction } from "express";
import { validationResult } from "express-validator";

export const checkValidation = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const errArray = validationResult(req).array();
  if (errArray.length > 0)
    throw new Error(`${errArray[0].param}:${errArray[0].msg}`);
  return next();
};

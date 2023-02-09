import express from "express";

import { body, validationResult } from "express-validator";

const router = express.Router();

router.all("/", async (req, res, next) => {
  return res.end("webhook server");
});

// sample router
router.post(
  "/login",
  body("name").isAscii().isLength({
    max: 30,
    min: 6,
  }),
  body("pass").isAscii().isLength({
    max: 30,
    min: 6,
  }),
  async (req, res, next) => {
    const errArray = validationResult(req).array();
    if (errArray.length > 0)
      throw new Error(`${errArray[0].param}:${errArray[0].msg}`);
    res.end("success");
  }
);

export default router;

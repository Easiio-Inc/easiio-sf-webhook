import express from "express";

const router = express.Router();

import { retJSON } from "@/untils/retJSON";
import { checkAuth, checkValidation } from "@/middlewares";
import { header, query } from "express-validator";

router.all(
  "/webhook/:uuid",
  header("Authorization").isString(),
  query("uuid").isUUID(),
  checkValidation,
  checkAuth,
  async (req, res, next) => {
    return retJSON(res, 200, "success", req.webhook.webhookName);
  }
);

router.all(
  "/webhook-test/:uuid",
  header("Authorization").isString(),
  query("uuid").isUUID(),
  checkValidation,
  checkAuth,
  async (req, res, next) => {
    return retJSON(res, 200, "success", req.webhook.webhookName);
  }
);

export default router;

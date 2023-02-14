import { Request, Response, NextFunction } from "express";
import { AsyncMysql } from "@/sql";
import { retJSON } from "@/untils/retJSON";
export const checkAuth = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const sql = "select * from webhook where url = ?;";

  const connection = await AsyncMysql.getConnection();
  const dbdata = await AsyncMysql.query(connection, sql, req.params.uuid, true);

  if (dbdata.length !== 1) return retJSON(res, 500, "error url");
  const webhook = dbdata[0];

  if (req.method !== webhook.httpMethod)
    return retJSON(res, 500, "error httpMethod");
  if (req.get("Authorization") !== webhook.auth)
    return retJSON(res, 500, "error auth");
  req.webhook = webhook;
  return next();
};

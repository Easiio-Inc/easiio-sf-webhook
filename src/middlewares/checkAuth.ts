import { Request, Response, NextFunction } from "express";
import { AsyncMysql } from "@/sql";
import { retJSON } from "@/untils/retJSON";
import { inspect } from "util";
import { RPCScriptClient } from "@/service/rpcClient";

const thirdPartyErrorHandler = (error: any) => {
  console.log("third party issue action error: ", inspect(error));
};
export const checkAuth = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let issueId = 0;
  let userId = "";
  if (req.method === "POST") {
    issueId = parseInt(req.body.issueId);
    userId = req.body.userId;
  } else {
    if (req.query.userId && req.query.issueId) {
      issueId = parseInt(req.query.issueId.toString());
      userId = req.query.userId.toString();
    }
  }
  if (issueId === 0 || userId === "") {
    return retJSON(res, 500, "error parames issueId or userId");
  }
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
  if (webhook.scriptId && webhook.scriptId !== 0) {
    RPCScriptClient.call("runScriptById", {
      scriptId: webhook.scriptId,
      issueId: issueId,
      userId: userId,
    }).catch(thirdPartyErrorHandler);
  }

  return next();
};

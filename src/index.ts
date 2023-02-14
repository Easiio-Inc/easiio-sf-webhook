///////////////////////////////////////
import "express-async-errors";
import * as dotenv from "dotenv";
import moduleAlias from "module-alias";

dotenv.config();
moduleAlias.addAlias("@", __dirname);

////////////////////////////////////////

import morgan from "morgan";

import { retJSON } from "@/untils/retJSON";
import express, { Request, Response, NextFunction } from "express";
import indexRouter from "@/router/index";
import { AsyncMysql } from "@/sql";
import { RPCClientManager } from "@/service/rpcManager";
import { RPCScriptClient } from "@/service/rpcClient";

AsyncMysql.getConnection();
//连接webRPC服务
global.scriptRPCClient = new RPCClientManager(process.env.RPC_SCRIPT_URL);
global.scriptRPCClient.instance.on("open", async function () {
  console.log("RPCWebClient connected");
  RPCScriptClient.setClient(global.scriptRPCClient);
});

const app = express();

app.use(morgan("dev"));

app.use(express.json());

app.use(
  express.urlencoded({
    extended: true,
  })
);

app.use("/", indexRouter);

app.use((req, res, next) => {
  return retJSON(res, 404, "Not Found Page");
});

app.use(function (err: Error, req: Request, res: Response, next: NextFunction) {
  let msg = err.message || "null";
  if (msg == "null") console.log(err);
  return retJSON(res, 500, `Error:${msg}`);
});
app.listen(parseInt(process.env.PORT), "0.0.0.0", function () {
  console.log("server listening on port " + process.env.PORT);
});

///////////////////////////////////////
import "express-async-errors";
import * as dotenv from "dotenv";
import moduleAlias from "module-alias";

dotenv.config();
moduleAlias.addAlias("@", __dirname);

////////////////////////////////////////

import morgan from "morgan";

import express, { Request, Response, NextFunction } from "express";
import indexRouter from "@/router/index";

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
  res.end("Not Found Page");
});

app.use(function (err: Error, req: Request, res: Response, next: NextFunction) {
  let msg = err.message || "null";
  if (msg == "null") console.log(err);

  res.status(500);
  res.end(`Error:${msg}`);
});
app.listen(parseInt(process.env.PORT), "0.0.0.0", function () {
  console.log("server listening on port " + process.env.PORT);
});

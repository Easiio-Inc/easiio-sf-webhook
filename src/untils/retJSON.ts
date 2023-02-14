import express from "express";

export const retJSON = (
  res: express.Response,
  status: number,
  msg: string,
  data?: object
) => {
  res.status(status);

  return res.json({
    status,
    msg,
    data,
  });
};

import mysql, { MysqlError, PoolConnection, QueryOptions } from "mysql";

export class AsyncMysql {
  private static instance: mysql.Pool;
  public static getInstance() {
    if (!this.instance) {
      this.instance = mysql.createPool({
        host: process.env.DB_HOST,
        port: parseInt(process.env.DB_PORT),
        user: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_DATABASE,
        connectionLimit: 20,
      });
    }
    return this.instance;
  }

  public static async getConnection() {
    if (!this.instance) this.getInstance();
    return await new Promise<mysql.PoolConnection>((resolve, reject) => {
      this.instance.getConnection((err, connect) => {
        if (err) return reject(err);
        return resolve(connect);
      });
    });
  }
  public static async query(
    connection: PoolConnection,
    options: string | QueryOptions,
    values: any,
    autoEnd?: boolean
  ) {
    return await new Promise<any>((resolve, reject) => {
      connection.query(
        options,
        values,
        (err: MysqlError | null, results?: any) => {
          if (err) return reject(err);
          return resolve(results);
        }
      );
    }).finally(() => {
      if (autoEnd) connection.release();
    });
  }
}

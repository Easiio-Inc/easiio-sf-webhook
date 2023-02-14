const RPC_TIMEOUT = 15000;
import { Client as RPCClient } from "rpc-websockets";

export class RPCClientManager {
  public ready: boolean = false;
  public instance: RPCClient;
  constructor(url: string) {
    this.instance = new RPCClient(url, {
      autoconnect: true,
      reconnect: true,
      max_reconnects: 10000,
    });
    this.instance.on("open", async () => {
      await this.instance.login({ key: process.env.RPC_KEY });
      this.ready = true;
    });
    this.instance.on("error", (err) => {
      console.log(`rpcClient error`, err.message || err);
    });
    this.instance.on("close", () => {
      this.ready = false;
    });
  }

  public async call<R>(
    method: string,
    params: { [x: string]: any; [x: number]: any }
  ): Promise<R> {
    if (!this.instance) throw new Error("rpc client is not set");
    return (await this.instance.call(method, params, RPC_TIMEOUT)) as R;
  }
}

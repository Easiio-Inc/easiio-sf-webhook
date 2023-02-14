import { RPCClientManager } from "./rpcManager";
import { RPCScriptAPI } from "./types";

export class RPCScriptClient {
  private static rpc: RPCClientManager;
  public static setClient(rpc: RPCClientManager) {
    this.rpc = rpc;
  }

  public static async call<
    T extends keyof RPCScriptAPI,
    O extends RPCScriptAPI[T],
    P extends O["params"],
    R extends O["return"]
  >(name: T, params: P): Promise<R> {
    if (!this.rpc) throw new Error("No RPC client available");
    return this.rpc.call(name, params);
  }
}

import { RPCClientManager } from "@/service/rpcManager";
declare global {
  namespace NodeJS {
    interface Global {
      scriptRPCClient: RPCClientManager;
    }
    interface ProcessEnv {
      PORT: string;
      DB_HOST: string;
      DB_PORT: string;
      DB_USERNAME: string;
      DB_PASSWORD: string;
      DB_DATABASE: string;
      RPC_PORT: string;
      RPC_KEY: string;
      RPC_SCRIPT_URL: string;
    }
  }
}
export {};

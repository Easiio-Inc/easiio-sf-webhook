interface RPCMethod<P, R> {
  params: P;
  return: R;
}

export type RunScriptResult = {
  success: boolean;
  log: string;
};

export interface RPCScriptAPI {
  runScriptById: RPCMethod<
    { scriptId: number; issueId: number; userId: string },
    RunScriptResult
  >;
}

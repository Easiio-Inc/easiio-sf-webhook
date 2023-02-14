interface RPCMethod<P, R> {
  params: P;
  return: R;
}

export interface RPCScriptAPI {
  test: RPCMethod<{ projectId: number }, number[]>;
}

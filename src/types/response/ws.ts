export interface WsServerInfo {
  endpoint: string;
  encrypt: boolean;
  protocol: string;
  pingInterval: number;
  pingTimeout: number;
}

export interface WsConnectionInfo {
  token: string;
  instanceServers: WsServerInfo[];
}

export const natsSettings = {
  // servers: "ws://localhost:9222",
  servers: "ws://70.34.222.146:9222",
  user: "jackonelli",
  pass: "penna1glas",
};

export enum NatsClientStatus {
  Connecting = "CONNECTING",
  Ready = "READY",
  Error = "ERROR",
}

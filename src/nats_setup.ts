export const natsSettings = {
  servers: "ws://localhost:9222",
  // servers: "ws://192.168.1.2:9222",
  user: "jackonelli",
  pass: "penna1glas",
};

export enum NatsClientStatus {
  Connecting = "CONNECTING",
  Ready = "READY",
  Error = "ERROR",
}

export const natsSettings = {
  // servers: "ws://192.168.1.2:9222", // Rbpi in the brewing room enclosure.
  servers: "ws://localhost:9222", // For local testing/dev
  // servers: "ws://192.168.51.56:9222", // Eneryield network.
  user: "jackonelli",
  pass: "penna1glas",
};

export enum NatsClientStatus {
  Connecting = "CONNECTING",
  Ready = "READY",
  Error = "ERROR",
}

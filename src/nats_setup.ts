export const natsSettings = {
  servers: "ws://localhost:9222",
  user: "jackonelli",
  pass: "penna1glas",
};

export enum NatsClientStatus {
  Connecting = 1,
  Ready = 2,
  Error = 3,
}

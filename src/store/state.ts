import { MeasResult } from "@/models/sensor";
import { ActorResult } from "@/models/actor";
import { ContrResult } from "@/models/controller";
import { NatsClientStatus } from "@/nats_setup";

export type State = {
  loading: boolean;
  sensors: Map<string, MeasResult>;
  actors: Map<string, ActorResult>;
  controllers: Map<string, ContrResult>;
  natsClientStatus: NatsClientStatus;
};

export const state: State = {
  loading: true,
  sensors: new Map(),
  actors: new Map(),
  controllers: new Map(),
  natsClientStatus: NatsClientStatus.Connecting,
};

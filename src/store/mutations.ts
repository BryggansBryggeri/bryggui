import { MutationTree } from "vuex";
import { State } from "@/store/state";
import { MeasResult } from "@/models/sensor";
import { NatsClientStatus } from "@/nats_setup";

export enum MutationType {
  SetLoading = "SET_LOADING",
  SetNatsClientStatus = "SET_NATS_CLIENT_STATUS",
  UpdateSensor = "UPDATE_SENSOR",
}

export type Mutations = {
  [MutationType.SetLoading](state: State, value: boolean): void;
  [MutationType.SetNatsClientStatus](state: State, status: NatsClientStatus): void;
  [MutationType.UpdateSensor](state: State, meas: [string, MeasResult]): void;
};

export const mutations: MutationTree<State> & Mutations = {
  [MutationType.SetLoading](state, value) {
    state.loading = value;
  },
  [MutationType.SetNatsClientStatus](state, status) {
    state.natsClientStatus = status;
  },
  [MutationType.UpdateSensor](state, meas) {
    const [id, data] = meas;
    state.sensors.set(id, data);
  },
};

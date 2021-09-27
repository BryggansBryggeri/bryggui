import { MutationTree } from "vuex";
import { State } from "@/store/state";
import { MeasResult } from "@/models/sensor";

export enum MutationType {
  SetLoading = "SET_LOADING",
  UpdateSensor = "UPDATE_SENSOR",
}

export type Mutations = {
  [MutationType.SetLoading](state: State, value: boolean): void;
  [MutationType.UpdateSensor](state: State, meas: [string, MeasResult]): void;
};

export const mutations: MutationTree<State> & Mutations = {
  [MutationType.SetLoading](state, value) {
    state.loading = value;
  },
  [MutationType.UpdateSensor](state, meas) {
    const [id, data] = meas;
    state.sensors.set(id, data);
  },
};

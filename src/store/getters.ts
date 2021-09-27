import { GetterTree } from "vuex";
import { State } from "@/store/state";
import { MeasResult } from "@/models/sensor";

export type Getters = {
  getSensorValue(state: State): (id: string) => MeasResult | undefined;
};

export const getters: GetterTree<State, State> & Getters = {
  getSensorValue: (state) => (id: string) => {
    return state.sensors.get(id);
  },
};

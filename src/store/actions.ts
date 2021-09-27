import { ActionContext, ActionTree } from "vuex";
import { Mutations, MutationType } from "./mutations";
import { State } from "./state";

export enum ActionTypes {
  FauxLoading = "FAUX_LOADING",
}

type ActionAugments = Omit<ActionContext<State, State>, "commit"> & {
  commit<K extends keyof Mutations>(
    key: K,
    payload: Parameters<Mutations[K]>[1]
  ): ReturnType<Mutations[K]>;
};

export type Actions = {
  [ActionTypes.FauxLoading](context: ActionAugments): void;
};

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));
export const actions: ActionTree<State, State> & Actions = {
  async [ActionTypes.FauxLoading]({ commit }) {
    commit(MutationType.SetLoading, true);
    await sleep(500);
    commit(MutationType.SetLoading, false);
  },
};

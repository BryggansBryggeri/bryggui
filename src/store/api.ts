import { MeasResult } from "@/models/sensor";
import { useStore, Store } from "@/store";
import { MutationType } from "@/store/mutations";
import { ActionTypes } from "@/store/actions";

export class StoreApi {
  private store: Store = useStore();

  public updateSensor(id: string, meas: MeasResult): void {
    this.store.commit(MutationType.UpdateSensor, [id, meas]);
  }

  public fauxLoading(): void {
    this.store.dispatch(ActionTypes.FauxLoading);
  }

  public getSensorValue(id: string): MeasResult | undefined {
    return this.store.getters.getSensorValue(id);
  }
}

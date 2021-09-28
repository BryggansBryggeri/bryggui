import { MeasResult } from "@/models/sensor";
import { ActorResult } from "@/models/actor";
import { ContrResult } from "@/models/controller";
import { useStore, Store } from "@/store";
import { MutationType } from "@/store/mutations";
import { ActionTypes } from "@/store/actions";
import { NatsClientStatus } from "@/nats_setup";

export class StoreApi {
  private store: Store = useStore();

  public updateSensor(id: string, meas: MeasResult): void {
    this.store.commit(MutationType.UpdateSensor, [id, meas]);
  }

  public updateActor(id: string, val: ActorResult): void {
    this.store.commit(MutationType.UpdateActor, [id, val]);
  }

  public updateController(id: string, val: ContrResult): void {
    this.store.commit(MutationType.UpdateController, [id, val]);
  }

  public setNatsClientStatus(status: NatsClientStatus): void {
    this.store.commit(MutationType.SetNatsClientStatus, status);
  }

  public fauxLoading(): void {
    this.store.dispatch(ActionTypes.FauxLoading);
  }

  public getSensorValue(id: string): MeasResult | undefined {
    return this.store.state.sensors.get(id);
  }

  public getNatsClientStatus(): NatsClientStatus {
    return this.store.state.natsClientStatus;
  }

  public sensorClients(): IterableIterator<string> {
    return this.store.state.sensors.keys();
  }
}

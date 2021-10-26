import { MeasResult } from "@/models/sensor";
import { ActorResult } from "@/models/actor";
import { ControllerProps, ContrResult } from "@/models/controller";
import { useStore, Store } from "@/store";
import { MutationType } from "@/store/mutations";
import { ActionTypes } from "@/store/actions";
import { NatsClientStatus } from "@/nats_setup";
import { eventbus } from "@/eventbus";

export class StoreApi {
  private store: Store = useStore();

  public updateSensor(id: string, meas: MeasResult): void {
    this.store.commit(MutationType.UpdateSensor, [id, meas]);
  }

  public getSensorValue(id: string): MeasResult | undefined {
    return this.store.state.sensors.get(id);
  }

  public updateActor(id: string, val: ActorResult): void {
    this.store.commit(MutationType.UpdateActor, [id, val]);
  }

  public updateController(id: string, val: ContrResult): void {
    this.store.commit(MutationType.UpdateController, [id, val]);
  }

  public startController(props: ControllerProps, target: number) {
    eventbus.startController(props, target);
  }

  public getContrValue(id: string): ContrResult | undefined {
    return this.store.state.controllers.get(id);
  }

  public updateNatsClientStatus(status: NatsClientStatus): void {
    this.store.commit(MutationType.SetNatsClientStatus, status);
  }

  public getNatsClientStatus(): NatsClientStatus {
    return this.store.state.natsClientStatus;
  }

  public fauxLoading(): void {
    this.store.dispatch(ActionTypes.FauxLoading);
  }

  public isLoading(): boolean {
    return this.store.state.loading;
  }

  public getActiveClients(): ActiveClients {
    const controllers = this.store.state.controllers.keys();
    const sensors = this.store.state.sensors.keys();
    const clients: ActiveClients = {
      controllers,
      sensors,
    };
    return clients;
  }
}

interface ActiveClients {
  controllers: IterableIterator<string>;
  sensors: IterableIterator<string>;
}

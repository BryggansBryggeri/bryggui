import { ControllerProps, Target } from "@/models/controller";
import { eventbus } from "@/eventbus";
import { useContrStore } from "@/stores/controller";
import { useActorsStore } from "@/stores/actor";
import { useSensorsStore } from "@/stores/sensor";

export class StoreApi {
  public async startController(
    props: ControllerProps,
    target: number
  ): Promise<void> {
    await eventbus.startController(props, target);
  }

  public async stopController(props: ControllerProps): Promise<void> {
    await eventbus.stopController(props);

    const storeP = useContrStore();
    storeP.removeClient(props.controllerId);
  }

  public async switchController(
    props: ControllerProps,
    newTarget: Target
  ): Promise<void> {
    await eventbus.switchController(props, newTarget);
  }

  public setContrTarget(id: string, newTarget: Target): void {
    eventbus.setTarget(id, newTarget);
  }

  public getActiveClients(): ActiveClients {
    const contrStore = useContrStore();
    const sensorStore = useSensorsStore();
    const actorStore = useActorsStore();
    const controllers = contrStore.clients;
    const sensors = sensorStore.clients;
    const actors = actorStore.clients;
    const clients: ActiveClients = {
      controllers,
      sensors,
      actors,
    };
    return clients;
  }
}

interface ActiveClients {
  controllers: IterableIterator<string>;
  sensors: IterableIterator<string>;
  actors: IterableIterator<string>;
}

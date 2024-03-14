import { eventbus } from "@/eventbus";
import { useContrStore } from "@/stores/controller";
import { ControllerProps, Target } from "@/models/controller";

export class StoreApi {
  public async startController(
    props: ControllerProps,
    target: number
  ): Promise<void> {
    await eventbus.startController(props, target);
  }

  public async stopController(props: ControllerProps): Promise<void> {
    await eventbus.stopController(props);
    const store = useContrStore();
    store.removeClient(props.controllerId);
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
}

import { Msg, connect, StringCodec, JSONCodec, NatsConnection } from "nats.ws";
import { SensorMsg, measResultFromMsg } from "@/models/sensor";
import { ActiveClients } from "@/models/activeClients";
import { ActorMsg, actorResultFromMsg } from "@/models/actor";
import { NatsClientStatus } from "@/nats_setup";
import {
  propsAndTargetToJson,
  ControllerProps,
  ContrStatusMsg,
  Target,
} from "@/models/controller";
import { natsSettings } from "@/nats_setup";
import { StoreApi } from "@/store/api";

const sc = StringCodec();
const jc = JSONCodec();
const sensMsgDec = JSONCodec<SensorMsg>();
const actorMsgDec = JSONCodec<ActorMsg>();
const contrMsgDec = JSONCodec<ContrStatusMsg>();
const activeClientsMsgDec = JSONCodec<ActiveClients>();
const TIMEOUT_MAX = 5000;

export class Eventbus {
  private client: NatsConnection | null = null;
  private storeApi = new StoreApi();

  public async start(): Promise<void> {
    try {
      const nc = await connect({
        servers: natsSettings.servers,
        user: natsSettings.user,
        pass: natsSettings.pass,
      });
      this.client = nc;
      this.storeApi.setNatsClientStatus(NatsClientStatus.Ready);

      const sensorSub = this.client.subscribe("sensor.*.measurement");
      (async () => {
        for await (const msg of sensorSub) {
          const sensorMsg: SensorMsg = sensMsgDec.decode(msg.data);
          this.storeApi.updateSensor(
            sensorMsg.id,
            measResultFromMsg(sensorMsg)
          );
        }
      })().then();

      const actorSub = this.client.subscribe("actor_pub.*.current_signal");
      (async () => {
        for await (const msg of actorSub) {
          const actorMsg: ActorMsg = actorMsgDec.decode(msg.data);
          this.storeApi.updateActor(
            actorMsg.signal.id,
            actorResultFromMsg(actorMsg)
          );
        }
      })().then();

      const contrSub = this.client.subscribe("controller.*.status");
      (async () => {
        for await (const msg of contrSub) {
          const contrMsg: ContrStatusMsg = contrMsgDec.decode(msg.data);
          this.storeApi.updateController(contrMsg);
        }
      })().then();
    } catch (err) {
      this.storeApi.setNatsClientStatus(NatsClientStatus.Error);
      console.log("Error connecting to NATS client", err);
    }
  }

  public async listActiveClients(): Promise<ActiveClients | undefined> {
    const activeClients: ActiveClients = { controllers: new Map() };
    const req = this.request("command.list_active_clients", null, TIMEOUT_MAX)
      .then((msg) => {
        let ret = activeClients;
        if (msg !== undefined) {
          const clients: ActiveClients = activeClientsMsgDec.decode(msg.data);
          ret = clients;
        }
        return ret;
      })
      .catch((err) => {
        console.log(`problem with request: ${err.message}`);
        return new Promise<ActiveClients>(() => {
          activeClients;
        });
      });
    return req;
  }

  public async startController(
    props: ControllerProps,
    target: number
  ): Promise<void> {
    const contrData = propsAndTargetToJson(props, target);
    try {
      const reply = await this.request(
        "command.start_controller",
        contrData,
        TIMEOUT_MAX
      );
      if (reply) {
        console.log(sc.decode(reply.data));
      }
    } catch (err) {
      console.log("Error starting controller: ", err);
    }
  }

  public async stopController(props: ControllerProps): Promise<void> {
    const id = JSON.parse(`"${props.controllerId}"`);
    try {
      const reply = await this.request(
        "command.stop_controller",
        id,
        TIMEOUT_MAX
      );
      if (reply) {
        console.log(sc.decode(reply.data));
      }
    } catch (err) {
      console.log("Error stopping controller: ", err);
    }
  }

  public async setTarget(contrId: string, newTarget: Target): Promise<void> {
    // TODO: stupid serialization.
    const parsedTarget = JSON.parse(`${newTarget}`);
    try {
      const reply = await this.request(
        `controller.${contrId}.set_target`,
        parsedTarget,
        TIMEOUT_MAX
      );
      if (reply) {
        console.log(sc.decode(reply.data));
      }
    } catch (err) {
      console.log("Failed setting target", err);
    }
  }

  public async switchController(
    props: ControllerProps,
    newTarget: number
  ): Promise<void> {
    const contrData = propsAndTargetToJson(props, newTarget);
    try {
      const reply = await this.request(
        "command.switch_controller",
        contrData,
        TIMEOUT_MAX
      );
      if (reply) {
        console.log(sc.decode(reply.data));
      }
    } catch (err) {
      console.log("Error switching controllers: ", err);
    }
  }

  public async request(
    subject: string,
    data: JSON | null,
    timeout: number
  ): Promise<Msg | undefined> {
    if (data !== null) {
      return this.client?.request(subject, jc.encode(data), { timeout });
    }
    return this.client?.request(subject, undefined, { timeout });
  }

  public async publish(subject: string, data: JSON): Promise<void> {
    this.client?.publish(subject, jc.encode(data));
  }
}

export const eventbus = new Eventbus();

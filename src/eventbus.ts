import { Msg, connect, StringCodec, JSONCodec, NatsConnection } from "nats.ws";
import { SensorMsg, measResultFromMsg } from "@/models/sensor";
import { ActiveClients } from "@/models/activeClients";
import { ActorMsg, actorResultFromMsg } from "@/models/actor";
import {
  propsAndTargetToJson,
  ControllerProps,
  ContrStatusMsg,
  Target,
  contrResultFromMsg,
} from "@/models/controller";
import { natsSettings } from "@/nats_setup";
import { useSensorsStore } from "@/stores/sensor";
import { useActorsStore } from "@/stores/actor";
import { useContrStore } from "@/stores/controller";
import { useNatsClientStore } from "@/stores/nats_client";
import { useLogsStore, LogEntry, LogLevel, parseLogLevel } from "@/stores/log";

const sc = StringCodec();
const jc = JSONCodec();
const sensMsgDec = JSONCodec<SensorMsg>();
const actorMsgDec = JSONCodec<ActorMsg>();
const contrMsgDec = JSONCodec<ContrStatusMsg>();
const activeClientsMsgDec = JSONCodec<ActiveClients>();
const TIMEOUT_MAX = 5000;

export class Eventbus {
  private client: NatsConnection | null = null;

  public async start(): Promise<void> {
    // TODO add initialising logic that has to be awaited, e.g. list_active_clients.
    try {
      const nc = await connect({
        servers: natsSettings.servers,
        user: natsSettings.user,
        pass: natsSettings.pass,
      });
      this.client = nc;
      const natsStore = useNatsClientStore();
      natsStore.setStatusReady();

      const sensorSub = this.client.subscribe("sensor.*.measurement");
      (async () => {
        for await (const msg of sensorSub) {
          const sensorMsg: SensorMsg = sensMsgDec.decode(msg.data);
          const sensStore = useSensorsStore();
          sensStore.updateSensor(sensorMsg.id, measResultFromMsg(sensorMsg));
        }
      })().then();

      const actorSub = this.client.subscribe("actor.*.current_signal");
      (async () => {
        for await (const msg of actorSub) {
          const actorMsg: ActorMsg = actorMsgDec.decode(msg.data);
          const actorStore = useActorsStore();
          actorStore.updateActor(
            actorMsg.signal.id,
            actorResultFromMsg(actorMsg),
          );
        }
      })().then();

      const contrSub = this.client.subscribe("controller.*.status");
      (async () => {
        for await (const msg of contrSub) {
          const contrMsg: ContrStatusMsg = contrMsgDec.decode(msg.data);
          const contrStatus = contrResultFromMsg(contrMsg);
          const contrStore = useContrStore();
          contrStore.updateContr(contrMsg.status.id, contrStatus);
        }
      })().then();

      const logSub = this.client.subscribe("log.>");
      (async () => {
        for await (const msg of logSub) {
          const entry = this.entryFromMsg(msg);
          const logStore = useLogsStore();
          logStore.addLogEntry(entry);
        }
      })().then();
    } catch (err) {
      const natsStore = useNatsClientStore();
      natsStore.setStatusError();
      console.log("Error connecting to NATS client", err);
    }
  }

  private entryFromMsg(msg: Msg): LogEntry {
    const subj = msg.subject.split(".", 3);
    let level = parseLogLevel(subj[1]);
    if (level === undefined) {
      console.log(`Failed parsing ${subj[1]} as LogLevel`);
      level = LogLevel.Error;
    } else {
      level = level as LogLevel;
    }
    const clientId = subj[2];
    return { level: level, clientId: clientId, msg: `${sc.decode(msg.data)}` };
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
    target: number,
  ): Promise<void> {
    const contrData = propsAndTargetToJson(props, target);
    try {
      await this.request("command.start_controller", contrData, TIMEOUT_MAX);
    } catch (err) {
      console.log("Error starting controller: ", err);
    }
  }

  public async stopController(props: ControllerProps): Promise<void> {
    const id = JSON.parse(`"${props.controllerId}"`);
    try {
      await this.request("command.stop_controller", id, TIMEOUT_MAX);
    } catch (err) {
      console.log("Error stopping controller: ", err);
    }
  }

  public async switchController(
    props: ControllerProps,
    newTarget: number,
  ): Promise<void> {
    const contrData = propsAndTargetToJson(props, newTarget);
    try {
      await this.request("command.switch_controller", contrData, TIMEOUT_MAX);
    } catch (err) {
      console.log("Error switching controllers: ", err);
    }
  }

  public async setTarget(contrId: string, newTarget: Target): Promise<void> {
    // TODO: stupid serialization.
    const parsedTarget = JSON.parse(`${newTarget}`);
    try {
      await this.request(
        `controller.${contrId}.set_target`,
        parsedTarget,
        TIMEOUT_MAX,
      );
    } catch (err) {
      console.log("Failed setting target", err);
    }
  }

  public async request(
    subject: string,
    data: JSON | null,
    timeout: number,
  ): Promise<Msg | undefined> {
    if (data !== null) {
      return this.client?.request(subject, jc.encode(data), { timeout });
    }
    console.log("Calling request with null data");
    return this.client?.request(subject, undefined, { timeout });
  }

  public async publish(subject: string, data: JSON): Promise<void> {
    this.client?.publish(subject, jc.encode(data));
  }
}

export const eventbus = new Eventbus();

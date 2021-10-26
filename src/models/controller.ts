import { Result, newErr, newOk } from "@/models/result";
import { TimeStamp } from "@/utils";

export type ContrType =
  | "manual"
  | { hysteresis: { offset_on: number; offset_off: number } }
  | { pid: { kp: number; ki: number; kd: number } };

export type ControllerProps = {
  controllerId: string;
  actorId: string;
  sensorId: string;
  type: ContrType;
};

// Manual serialization, stupid but don't know how to do it otherwise
export function propsAndTargetToJson(
  props: ControllerProps,
  newTarget: Target
): JSON {
  const config = {
    controller_id: props.controllerId,
    actor_id: props.actorId,
    sensor_id: props.sensorId,
    type: props.type,
  };
  const contrData = {
    config,
    new_target: newTarget,
  };
  return JSON.parse(JSON.stringify(contrData));
}

export interface NewContrData {
  config: ControllerProps;
  new_target: Target;
}

export type ContrErr = string;
export type Target = number;

export interface ContrStatusMsg {
  status: {
    id: string;
    timestamp: TimeStamp;
    target: Target;
    type: string;
  };
}

export interface ContrStatus {
  target: Target;
  mode: Mode;
  timestamp: TimeStamp;
}

export type ContrResult = Result<ContrStatus, [ContrErr, TimeStamp]>;

export function newContrResultOk(contr: ContrStatus): ContrResult {
  return newOk(contr);
}

export function newContrResultErr(err: ContrErr, ts: TimeStamp): ContrResult {
  return newErr([err, ts]);
}

export function contrResultFromMsg(msg: ContrStatusMsg): ContrResult {
  const { status } = msg;
  const data: ContrStatus = {
    target: status.target,
    mode: modeFromType(status.type),
    timestamp: status.timestamp,
  };
  return newContrResultOk(data);
}

export enum Mode {
  Man = "Manual",
  Auto = "Auto",
}

function modeFromType(type: string): Mode {
  if (type === "manual") {
    return Mode.Man;
  }
  return Mode.Auto;
}

export function typeFromMode(mode: Mode): ContrType {
  switch (mode) {
    case Mode.Man:
      return "manual";
    case Mode.Auto:
      return { hysteresis: { offset_on: 10.0, offset_off: 5.0 } };
    // return { pid: { kp: 0.7, ki: 0.0, kd: 0.0 } };
    default:
      throw new Error("Unreachable typeFromMode");
  }
}

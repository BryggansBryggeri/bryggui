import { Result, newErr, newOk } from "@/models/result";
import { hasKey } from "@/utils";

export interface SensorMsg {
  id: string;
  timestamp: number;
  meas: { Ok: number } | { Err: MsgErr };
}

// Internal type to parse the NATS msg.
interface MsgErr {
  [key: string]: string;
}

export type Meas = number;
export type MeasErr = string;
export type TimeStamp = number;

export type MeasResult = Result<[Meas, TimeStamp], [MeasErr, TimeStamp]>;

export function newMeasOk(meas: Meas, ts: TimeStamp): MeasResult {
  return newOk([meas, ts]);
}

export function newMeasErr(err: MeasErr, ts: TimeStamp): MeasResult {
  return newErr([err, ts]);
}

export function measResultFromMsg(msg: SensorMsg): MeasResult {
  if (hasKey(msg.meas, "Ok")) {
    const meas = msg.meas as { Ok: number };
    return newMeasOk(meas.Ok, msg.timestamp);
  }
  if (hasKey(msg.meas, "Err")) {
    const meas = msg.meas as { Err: MsgErr };
    return newMeasErr(JSON.stringify(meas.Err), msg.timestamp);
  }
  return newErr(["Incorrect msg", msg.timestamp]);
}

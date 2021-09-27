import { TimeStamp } from "@/utils";
export interface Data<X, Y> {
  data: DataPoint<X, Y>[];
}

export interface DataPoint<X, Y> {
  x: X;
  y: Y;
}

export interface TimeSeries<Y> {
  label: string;
  data: DataPoint<TimeStamp, Y>[];
}

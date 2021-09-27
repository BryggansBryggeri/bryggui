export interface Data<X, Y> {
  label: string;
  data: DataPoint<X, Y>[];
}

export interface DataPoint<X, Y> {
  x: X;
  y: Y;
}

export interface TimeSeries<X, Y> {
  label: string;
  data: DataPoint<X, Y>[];
}
